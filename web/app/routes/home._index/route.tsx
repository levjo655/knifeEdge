import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { Delete, Minus, Plus } from "lucide-react";
import { Db, ObjectId } from "mongodb";
import { useState } from "react";
import { parseFormData } from "remix-hook-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { mongodb } from "~/lib/mongoDb.server";
import { Ingredient, Inventory, Recipe } from "./types";
import logo from "~/Images/knifeEdgeLogo.png";
import Recipes from "~/routes/home._index/Recipes";
import Header from "~/components/Header";
import { requireUser } from "~/session/guards.server";

const userId = new ObjectId("671f92670d0146d6880f74b4");

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request);

  const ingredientsPromise = mongodb
    .db("knifeEdgeRemix")
    .collection<Ingredient>("ingredient")
    .find()
    .toArray();
  const recipiesPromise = mongodb
    .db("knifeEdgeRemix")
    .collection<Recipe>("recipe")
    .find()
    .toArray();

  const inventoryPromise = mongodb
    .db("knifeEdgeRemix")
    .collection<Inventory>("inventory")
    .findOne({ userId: userId });

  const [ingredients, inventory, recipies] = await Promise.all([
    ingredientsPromise,
    inventoryPromise,
    recipiesPromise,
  ]);

  const inventoryIngredientNames =
    inventory?.ingredients.map((ing) => ing.name) || [];
  const suggestedRecipes = recipies
    .map((recipe) => ({
      ...recipe,
      matchCount: recipe.ingredients.filter((ing) =>
        inventoryIngredientNames.includes(ing.name)
      ).length,
    }))
    .filter((recipe) => recipe.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

  return json({
    ingredients: ingredients,
    inventory: inventory,
    recipies: recipies,
    suggestedRecipes: suggestedRecipes,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await parseFormData<{
    intent: "addToInventory" | "removeFromInventory";
    ingredientId: string;
  }>(request);

  switch (formData.intent) {
    case "addToInventory": {
      const ingredient = await mongodb
        .db("knifeEdgeRemix")
        .collection("ingredient")
        .findOne({ _id: new ObjectId(formData.ingredientId) });

      if (!ingredient) {
        throw new Error("Ingredient not found");
      }

      const userInventory = await mongodb
        .db("knifeEdgeRemix")
        .collection("inventory")
        .findOne({ userId: userId });

      if (userInventory) {
        await mongodb
          .db("knifeEdgeRemix")
          .collection("inventory")
          .updateOne(
            { userId: userId },
            { $addToSet: { ingredients: ingredient } }
          );
      } else {
        await mongodb
          .db("knifeEdgeRemix")
          .collection("inventory")
          .insertOne({
            userId: userId,
            ingredients: [ingredient],
          });
      }

      return json({
        success: true,
      });
    }
    case "removeFromInventory": {
      await mongodb
        .db("knifeEdgeRemix")
        .collection<Inventory>("inventory")
        .updateOne(
          { userId: userId },
          {
            $pull: {
              ingredients: { _id: new ObjectId(formData.ingredientId) },
            },
          }
        );

      return json({
        success: true,
      });
    }
  }
}

export default function Page() {
  const data = useLoaderData<typeof loader>();

  const fetcher = useFetcher();

  const [ingredientSearchTerm, setIngredientSearchTerm] = useState("");

  const addIngredientToInventory = (ingredientId: string) => {
    const formData = new FormData();
    formData.append("intent", "addToInventory");
    formData.append("ingredientId", ingredientId);
    fetcher.submit(formData, {
      method: "POST",
    });
  };

  const [inventorySearchTerm, setInventorySearchTerm] = useState("");

  const removeIngredientFromInventory = (ingredientId: string) => {
    const formData = new FormData();
    formData.append("intent", "removeFromInventory");
    formData.append("ingredientId", ingredientId);
    fetcher.submit(formData, {
      method: "POST",
    });
  };

  return (
    <div className="min-h-dvh w-full flex flex-col justify-center items-center">
      <img src={logo} className="h-48" alt="" />
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <div className="col-span-1 row-span-2 grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>
                Here you can filter ingredients and add to your inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="Search ingredients..."
                value={ingredientSearchTerm}
                onChange={(e) => setIngredientSearchTerm(e.target.value)}
              />
              <div className="h-80 overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-primary-foreground">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.ingredients
                      .filter((x) =>
                        ingredientSearchTerm.length > 0
                          ? x.name
                              .toLowerCase()
                              .startsWith(ingredientSearchTerm.toLowerCase())
                          : true
                      )
                      .map((ingredient) => (
                        <TableRow key={ingredient._id}>
                          <TableCell>{ingredient.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() =>
                                addIngredientToInventory(ingredient._id)
                              }
                              variant="ghost"
                              size="icon"
                            >
                              <Plus />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>Selected Ingredients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="Search ingredients..."
                value={inventorySearchTerm}
                onChange={(e) => setInventorySearchTerm(e.target.value)}
              />
              <div className="h-80 overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-primary-foreground">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.inventory?.ingredients
                      .filter((x) =>
                        inventorySearchTerm.length > 0
                          ? x.name
                              .toLowerCase()
                              .startsWith(inventorySearchTerm.toLowerCase())
                          : true
                      )
                      .map((ingredient) => (
                        <TableRow key={ingredient._id}>
                          <TableCell>{ingredient.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() =>
                                removeIngredientFromInventory(ingredient._id)
                              }
                              variant="ghost"
                              size="icon"
                            >
                              <Delete />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-2 row-span-2">
          <CardHeader>
            <CardTitle>Suggested Recipes</CardTitle>
            <CardDescription>
              Recipes based on your selected ingredients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.suggestedRecipes.length > 0 ? (
              <div className="space-y-4">
                {data.suggestedRecipes.map((recipe) => (
                  <div
                    key={recipe._id.toString()}
                    className="p-4 border rounded-md shadow"
                  >
                    <h2 className="font-semibold text-lg">{recipe.name}</h2>
                    <p>{recipe.instructions}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {recipe.matchCount} / {recipe.ingredients.length}{" "}
                      ingredients matched
                    </p>
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recipes match your selected ingredients.</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-2 row-span-2">
          <CardHeader>
            <CardTitle>Recipes</CardTitle>
            <CardDescription>
              Here you can see all the available recipies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Recipes recipies={data.recipies as unknown as Recipe[]}></Recipes>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
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
import { Ingredient, Inventory } from "./types";
import logo from "~/Images/knifeEdgeLogo.png";
import Recipes from "~/routes/home._index/Recipes";

const userId = new ObjectId("671f92670d0146d6880f74b4");

export async function loader({ request }: LoaderFunctionArgs) {
  const ingredientsPromise = mongodb
    .db("knifeEdgeRemix")
    .collection<Ingredient>("ingredient")
    .find()
    .toArray();
    const recipies = await mongodb
    .db("knifeEdgeRemix")
    .collection("recipe")
    .find()
    .toArray();

  const inventoryPromise = mongodb
    .db("knifeEdgeRemix")
    .collection<Inventory>("inventory")
    .findOne({ userId: userId });

  const [ingredients, inventory] = await Promise.all([
    ingredientsPromise,
    inventoryPromise,
  ]);

  return json({
    ingredients: ingredients,
    inventory: inventory,
    recipies: recipies
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
            <CardTitle>Recipes</CardTitle>
            <CardDescription>Here you can recipies</CardDescription>
          </CardHeader>
          <CardContent>
            <Recipes recipies={data.recipies}></Recipes>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

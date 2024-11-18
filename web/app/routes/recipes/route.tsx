import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { RecipeCard } from "~/components/Recipe";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { mongodb } from "~/lib/mongoDb.server";
import { Recipe } from "../home._index/types";
import Recipes from "../home._index/Recipes";

import logo from "~/Images/knifeEdgeLogo.png";
import { useState } from "react";
import { Input } from "~/components/ui/input";
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const FetchRecipesFromDb = mongodb
    .db("knifeEdgeRemix")
    .collection<Recipe>("recipe")
    .find(q ? { name: { $regex: q, $options: "i" } } : {})
    .toArray();

  const FetchKnivesFromDb = mongodb
    .db("knifeEdgeRemix")
    .collection<Recipe>("knives")
    .find()
    .toArray();

  const recipes = await FetchRecipesFromDb;
  const knives = await FetchKnivesFromDb;

  return json({ recipes });
};

const Page = () => {
  const { recipe, q } = useLoaderData<typeof loader>();
  const { recipes } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const [searchParams, setSearchParams] = useSearchParams();
  const [recipesSearchTerm, setRecipesSearchTerm] = useState("");
  console.log(fetcher);

  const filteredRecipes = recipes.filter((recipe: Recipe) =>
    recipe.name.toLowerCase().includes(recipesSearchTerm.toLowerCase())
  );
  return (
<div className="flex flex-col min-h-screen">
      {/* Header or Logo */}
      <div className="flex flex-col items-center p-6">
        <div className="mb-4">
          <img src={logo} className="h-48 object-contain" alt="Logo" />
        </div>

        {/* Search Input */}
        <div className="w-full max-w-md mb-6">
          <Input
            placeholder="Search..."
            value={searchParams.get("q") ?? ""}
            onChange={(e) => {
              setSearchParams((prev) => {
                prev.set("q", e.target.value);
                return prev;
              });
            }}
          />
        </div>
      </div>

      {/* Recipes Grid */}
      <main className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.name}
                name={recipe.name}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
                recommendedKnife={recipe.recommendedKnife}
                imgUrl={recipe.imgUrl}
              />
            ))
          ) : (
            <p className="text-center w-full col-span-full">No recipes found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;

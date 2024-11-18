import { LoaderFunction } from "@remix-run/node";
import { RecipeCard } from "~/components/Recipe";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { mongodb } from "~/lib/mongoDb.server";
import { Recipe } from "../home._index/types";
import Recipes from "../home._index/Recipes";

import logo from "~/Images/knifeEdgeLogo.png";
import { useState } from "react";
export const loader: LoaderFunction = async ({ request }) => {
  const FetchRecipesFromDb = mongodb
    .db("knifeEdgeRemix")
    .collection<Recipe>("recipe")
    .find()
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
  const { recipes } = useLoaderData<typeof loader>();

  const [recipesSearchTerm, setRecipesSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe: Recipe) =>
    recipe.name.toLowerCase().includes(recipesSearchTerm.toLowerCase())
  );
  return (
    <div className="flex flex-col items-center p-6 h-screen w-full">
      <div className="mb-4">
        <img src={logo} className="h-48 object-contain" alt="Logo" />
      </div>

      <div className="w-full max-w-md mb-6">
        <input
          className="w-full p-3 border rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          type="text"
          placeholder="Search Recipes..."
          value={recipesSearchTerm}
          onChange={(e) => setRecipesSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full auto-rows-fr">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.name}
            name={recipe.name}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            recommendedKnife={recipe.recommendedKnife}
            imgUrl={recipe.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;

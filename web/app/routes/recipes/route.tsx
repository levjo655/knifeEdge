import { LoaderFunction } from "@remix-run/node";
import { RecipeCard } from "~/components/Recipe";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mongodb } from "~/lib/mongoDb.server";
import { Recipe } from "../home._index/types";
import Recipes from "../home._index/Recipes";

export const loader: LoaderFunction = async ({ request }) => {
  const FetchRecipesFromDb = mongodb
    .db("knifeEdgeRemix")
    .collection<Recipe>("recipe")
    .find()
    .toArray();

  const recipes = await FetchRecipesFromDb;

  return json({ recipes });
};

const Page = () => {
  const { recipes } = useLoaderData<typeof loader>();
  return (
    <div>
      {recipes.map((recipe: any) => (
        <RecipeCard name={recipe.name} ingredients={recipe.ingredients} instructions={recipe.instructions}/>
      ))}
    </div>
  );
};

export default Page;

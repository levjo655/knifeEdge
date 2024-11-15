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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 h-screen auto-rows-fr">
      {recipes.map((recipe: Recipe) => (
        <RecipeCard
          name={recipe.name}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          recommendedKnife={recipe.recommendedKnife}
          imgUrl={recipe.imgUrl}
        />
      ))}
    </div>
  );
};

export default Page;

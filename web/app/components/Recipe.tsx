import React from "react";
import { mongodb } from "~/lib/mongoDb.server";
import { Recipe } from "~/routes/home._index/types";

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{recipe.name}</h2>
    </div>
  );
};

import React from "react";
import { mongodb } from "~/lib/mongoDb.server";
import { Ingredient, Recipe } from "~/routes/home._index/types";

type RecipeCardProps = {
  name: string;
  ingredients: Ingredient[];
  instructions: string;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  ingredients,
  instructions
}) => {
  return (
    <div className="p-4 border rounded-lg border-black border-solid shadow-md">
      <h2 className="text-lg font-bold">{name}</h2>
       <p className="mt-2">{instructions}</p> 
       <p className="mt-2 text-sm text-gray-500">
        {ingredients.length} ingredients required
      </p> 
      <ul className="list-disc list-inside">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

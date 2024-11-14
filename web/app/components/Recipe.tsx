import React from "react";
import { mongodb } from "~/lib/mongoDb.server";
import { Ingredient, Knife, Recipe } from "~/routes/home._index/types";

type RecipeCardProps = {
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  recommendedKnife: Knife;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  ingredients,
  instructions,
  recommendedKnife,
}) => {
  return (
    <div className="p-4 border rounded-lg border-solid shadow-md hover:bg-gray-100 border-gray-300 round-lg">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="mt-2">{instructions}</p>
      <p className="mt-2 text-sm text-gray-500">
        {ingredients.length} ingredients required
      </p>
      <ul className="list-disc list-inside">
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.quantity}
          </li>
        ))}
        <li>
          {" "}
          Recommended Knife : {recommendedKnife.name}, {recommendedKnife.type},{" "}
          {recommendedKnife.length}
        </li>
      </ul>
    </div>
  );
};

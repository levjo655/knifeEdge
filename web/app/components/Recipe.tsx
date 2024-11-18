import React, { useState } from "react";
import { Ingredient, Knife } from "~/routes/home._index/types";

type RecipeCardProps = {
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  recommendedKnife: Knife;
  imgUrl: string;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  ingredients,
  instructions,
  recommendedKnife,
  imgUrl,
}) => {
  const [isIngredientsExpanded, setIngredientsExpanded] = useState(false);

  const toggleIngredients = () => {
    setIngredientsExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col border rounded-lg shadow-md hover:bg-gray-100 border-gray-300 font-sans text-base m-4">
      <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-64">
        <img className="w-full h-full object-cover" src={imgUrl} alt={name} />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {instructions}
        </p>

        <button
          onClick={toggleIngredients}
          className="mt-4 text-blue-500 hover:text-blue-700 text-sm"
        >
          {isIngredientsExpanded ? "Hide Ingredients" : "View Ingredients"}
        </button>

        {isIngredientsExpanded && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {ingredients.length} ingredients required:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - {ingredient.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-500">
              Recommended Knife: {recommendedKnife.name} (
              {recommendedKnife.type}, {recommendedKnife.length})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

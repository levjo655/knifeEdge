import React from "react";
import { mongodb } from "~/lib/mongoDb.server";
import { Ingredient, Knife, Recipe } from "~/routes/home._index/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardDescription></CardDescription>
          <CardHeader>{name}</CardHeader>
          <CardContent>
            <div className="border rounded-lg border-solid shadow-md hover:bg-gray-100 border-gray-300 round-lg">
              <div className="">
                <img
                  className="h-24 w-24 rounded-full object-cover mb-4 flex-shrink"
                  src={imgUrl}
                />
              </div>
              <div>
                {/* <h2 className="text-lg font-bold flex-1">{name}</h2> */}
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
                    Recommended Knife : {recommendedKnife.name},
                    {recommendedKnife.type}, {recommendedKnife.length}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

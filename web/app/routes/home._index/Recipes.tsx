import { ObjectId } from "mongodb";
import React from "react";
import { Recipe } from "./types";

const Recipes: React.FC<{ recipies: Recipe }> = ({ recipies }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
      <div className="space-y-4">
        {recipies.map((x) => (
          <div className="p-2 bg-blue-500 flex flex-col">
            <span>{x._id}</span>
            <span>{x.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;

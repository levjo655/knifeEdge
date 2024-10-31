import { ObjectId } from "mongodb";
import React from "react";
import { Recipe } from "./types";
import { useState } from "react";
import stirfry from "~/Images/spring-vegetable-stir-fry-3.jpg";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

const Recipes: React.FC<{ recipies: Recipe[] }> = ({ recipies }) => {
  return (
    <div className="flex items-start justify-center min-h-screen bg-black-100 b">
      <div className="space-y-4">
        {recipies.map((x) => (
          <div className="p-2  flex flex-col order-radious: 0.125rem;">
            <span className="border-radious: 5rem; bg-stone-300	text-decoration-color: #6b7280;">
              {x.name}
            </span>
            <Dialog>
              <DialogTrigger className="bg-transparent border-radious 2rem">
                {" "}
                Open
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Selected Recipe : {x.name}</DialogTitle>
                </DialogHeader>
                <div>
                  <p>{x.instructions}</p>
                  <ul>
                    {x.ingredients.map((ingredient) => (
                      <li>{ingredient.name}</li>
                    ))}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;

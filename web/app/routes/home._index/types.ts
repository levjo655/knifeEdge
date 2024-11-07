import { ObjectId } from "mongodb";

export type Ingredient = {
  _id: ObjectId;
  name: string;
};

export type Inventory = {
  userId: ObjectId;
  ingredients: Ingredient[];
};
export type Recipe = {
  _id: ObjectId;
  name: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  instructions: string;
};

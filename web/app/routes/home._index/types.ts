import { ObjectId } from "mongodb";

export type Ingredient = {
  _id: ObjectId;
  name: string;
};

export type Inventory = {
  userId: ObjectId;
  ingredients: Ingredient[];
};

import { IntegerType, ObjectId } from "mongodb";

export type Ingredient = {
  _id: ObjectId;
  name: string;
  quantity: string;
};

export type Inventory = {
  userId: ObjectId;
  ingredients: Ingredient[];
};
export type Recipe = {
  _id: ObjectId;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  recommendedKnife: Knife;
};
export type Knife = {
  _id: ObjectId;
  name: string;
   type: string;
   length: number;
};

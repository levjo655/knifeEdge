import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  username: string;
  password: string;
};

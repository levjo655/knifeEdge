import { MongoClient } from "mongodb";

const url = process.env.MONGODB_CONNECTION_URL as string;
export const mongodb = new MongoClient(url);

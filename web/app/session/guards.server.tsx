import { redirect } from "@remix-run/react";
import { GetUserIdFromSession } from "./session.server";
import { mongodb } from "~/lib/mongoDb.server";
import { ObjectId } from "mongodb";
import { User } from "~/types";

export const requireUser = async (request: Request) => {
  const userId = await GetUserIdFromSession(request);

  if (!userId) {
    throw redirect("/");
  }

  const user = await mongodb
    .db("knifeEdgeRemix")
    .collection<User>("user")
    .findOne({
      _id: ObjectId.createFromHexString(userId),
    });

  if (!user) {
    throw redirect("/");
  }

  return user;
};

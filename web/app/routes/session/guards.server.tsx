import { redirect } from "@remix-run/react";
import { GetUserIdFromSession } from "./session.server"
import { getUser } from "~/models/user.server";

export const requireUser = async (request: Request) =>{
    const userId = await GetUserIdFromSession(request);

    if(!userId) {
        throw redirect ("/login");

    }
    const user = await getUser(userId);
    if(!user){
        throw redirect("/login")
    }
}
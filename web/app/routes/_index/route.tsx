import { LoaderFunction, redirect } from "@remix-run/node";
import React from "react";
import { requireUser } from "~/session/guards.server";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await requireUser(request);
    return redirect("/home");
  } catch {
    return redirect("/login");
  }
};

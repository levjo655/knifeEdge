import { json, LoaderFunction } from "@remix-run/node";
import React from "react";
import { mongodb } from "~/lib/mongoDb.server";
import { Knife } from "../home._index/types";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/ui/card";
import logo from "~/Images/knifeEdgeLogo.png"; // Updated import for the logo

export const loader: LoaderFunction = async ({ request }) => {
  const fetchKnivesFromDb = await mongodb
    .db("knifeEdgeRemix")
    .collection<Knife>("knives")
    .find()
    .toArray();
  return json({ fetchKnivesFromDb });
};

export const Page = () => {
  const { fetchKnivesFromDb } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-dvh w-full flex flex-col justify-center items-center p-6">
      <img
        src={logo}
        alt="Knife Edge Logo"
        className="w-32 h-32 mx-auto mb-6"
      />
      <h1 className="text-2xl font-semibold mb-4">All Knives</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {fetchKnivesFromDb.map((knife) => (
          <li key={knife._id}>
            <Card className="p-4 shadow-md border rounded-lg flex flex-col items-center text-center">
              <h2 className="text-xl font-medium mb-2">{knife.name}</h2>
              <h2 className="text-xl font-medium mb-2">{knife.type}</h2>
              <h2 className="text-xl font-medium mb-2">{knife.length}</h2>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

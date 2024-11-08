import { ActionFunctionArgs, json, LoaderFunction } from "@remix-run/node";
import React from "react";
import { mongodb } from "~/lib/mongoDb.server";
import { Knife } from "../home._index/types";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Card } from "~/components/ui/card";
import logo from "~/Images/knifeEdgeLogo.png";
import { parseFormData } from "remix-hook-form";
import { ObjectId } from "mongodb";

// Loader function to fetch all knives from the "knives" collection
export const loader: LoaderFunction = async () => {
  const fetchKnivesFromDb = await mongodb
    .db("knifeEdgeRemix")
    .collection<Knife>("knives")
    .find()
    .toArray();

  return json({ fetchKnivesFromDb });
};

// Action function to handle adding and removing knives from inventory
export async function action({ request }: ActionFunctionArgs) {
  const formData = await parseFormData<{
    intent: "addToInventory" | "removeFromInventory" | "createKnife";
    knifeId: string;
    knifeName: string;
    knifeType: string;
    knifeLength: string
  }>(request);

  switch (formData.intent) {
    case "addToInventory": {
      const knife = await mongodb
        .db("knifeEdgeRemix")
        .collection("knives")
        .findOne({ _id: new ObjectId(formData.knifeId) });

      if (!knife) {
        throw new Error("Knife not found");
      }

      await mongodb
        .db("knifeEdgeRemix")
        .collection("inventory")
        .updateOne(
          { knifeId: knife._id },
          { $addToSet: { knife } },
          { upsert: true }
        );

      return json({ message: "Knife added to inventory" });
    }

    case "removeFromInventory": {
      await mongodb
        .db("knifeEdgeRemix")
        .collection("inventory")
        .deleteOne({ knifeId: new ObjectId(formData.knifeId) });

      return json({ message: "Knife removed from inventory" });
    }
    case "createKnife": {
      await mongodb
        .db("knifeEdgeRemix")
        .collection("knives")
        .insertOne({ name:formData.knifeName, length: formData.knifeLength, type: formData.knifeType });
      return json({ message: "knife was created" });
    }

    default:
      throw new Error("Invalid intent");
  }
}

export const Page = () => {
  const { fetchKnivesFromDb } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

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

           
              <div className="mt-4">
                <Form method="post" className="flex flex-col gap-4">
                  <input type="hidden" name="intent" value="createKnife" />

               
                  <label className="text-left">
                    Knife Name:
                    <input
                      type="text"
                      name="knifeName"
                      placeholder="Enter knife name"
                      required
                      className="input-field mt-1 p-2 border rounded"
                    />
                  </label>

                  <label className="text-left">
                    Knife Type:
                    <select
                      name="knifeType"
                      required
                      className="input-field mt-1 p-2 border rounded"
                    >
                      <option value="" disabled selected>
                        Select knife type
                      </option>
                      <option value="chef knife">Chef Knife</option>
                      <option value="slicer">Slicer</option>
                      <option value="petty">Petty</option>
                      <option value="serrated">Serrated</option>
                    </select>
                  </label>

                  <label className="text-left">
                    Knife Length (cm):
                    <input
                      type="text"
                      name="knifeLength"
                      placeholder="Enter length in cm"
                      required
                      className="input-field mt-1 p-2 border rounded"
                    />
                  </label>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
                  >
                    Create Knife
                  </button>
                </Form>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

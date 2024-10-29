import { json, useLoaderData } from "@remix-run/react";
import { TypeOf } from "zod";
import { mongodb } from "~/lib/mongoDb.server";
import { Link } from "@remix-run/react";

export const loader = async () => {
  const recipe = await mongodb
    .db("knifeEdgeRemix")
    .collection("recipe")
    .find()
    .toArray();

  return json({
    recipe: recipe,
  });
};

export const Page = () => {
  const { recipe } = useLoaderData<typeof loader>();
  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
      <div className="space-y-4">
        {recipe.map((x) => (
          <div className="p-2 bg-blue-500 flex flex-col">
            <span>{x._id}</span>
            <span>{x.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

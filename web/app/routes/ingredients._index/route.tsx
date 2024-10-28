import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { mongodb } from "~/lib/mongoDb.server";

export const loader = async () => {
  const ingredients = await mongodb
    .db("knifeEdgeRemix")
    .collection("ingredient")
    .find()
    .toArray();

  return json({
    ingredients: ingredients,
  });
};

const Page = () => {
  const { ingredients } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="space-y-4">
        {ingredients.map((x) => (
          <div className="p-2 bg-blue-500 flex flex-col">
            <span>{x._id}</span>
            <span>{x.name}</span>
          </div>
        ))}
      </div>
      <Link
        to="/ingredients/create"
        className="p-2 text-md font-semibold bg-blue-500"
      >
        Skapa ingredient
      </Link>
    </div>
  );
};

export default Page;

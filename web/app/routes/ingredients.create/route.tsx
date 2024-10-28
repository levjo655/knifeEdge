import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, redirect, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { mongodb } from "~/lib/mongoDb.server";

const ingredientSchema = z.object({
  name: z.string().min(1),
});

type IngredientForm = z.infer<typeof ingredientSchema>;
const ingredientFormResolver = zodResolver(ingredientSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const { receivedValues, errors, data } =
    await getValidatedFormData<IngredientForm>(request, ingredientFormResolver);
  if (errors) {
    return json({ errors, receivedValues, data });
  }

  mongodb.db("knifeEdgeRemix").collection("ingredient").insertOne({
    name: data.name,
  });

  return redirect("/ingredients");
};

const Page = () => {
  const form = useRemixForm<IngredientForm>({
    resolver: ingredientFormResolver,
  });

  return (
    <div>
      <Form method="POST">
        <div>
          <label htmlFor="name">Namn</label>
          <input id="name" {...form.register("name")} />
        </div>
        <button type="submit">Skapa</button>
      </Form>
    </div>
  );
};

export default Page;

import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { storeUserInSession } from "~/session/session.server";
import { createFormData, getValidatedFormData } from "remix-hook-form";
import { mongodb } from "~/lib/mongoDb.server";
import { User } from "~/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Result } from "postcss";
import logo from "~/Images/knifeEdgeLogo.png";

// Adding authentication

const schema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(5, "Email must be at least 5 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { receivedValues, errors, data } = await getValidatedFormData<
    z.infer<typeof schema>
  >(request, zodResolver(schema));
  if (errors) {
    return json({ errors, receivedValues, data });
  }

  const { email, password } = data;

  const insertResult = await mongodb
    .db("knifeEdgeRemix")
    .collection<Omit<User, "_id">>("user")
    .insertOne({ username: email, password: password });

  const user = await mongodb
    .db("knifeEdgeRemix")
    .collection<User>("user")
    .findOne({ _id: insertResult.insertedId });
  console.log(user);

  if (!user) {
    throw json({ message: "something went wrong this will not happend" }, 400);
  }

  const session = await storeUserInSession(user);
  return redirect("/home", {
    headers: {
      "Set-Cookie": session,
    },
  });
};

export default function RegisterRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={logo} className="h-48 mb-6" alt="Logo" />
      <Form
        method="post"
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Register
        </h1>

        <Input
          name="email"
          placeholder="Enter your email"
          type="email"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />

        <Input
          placeholder="Enter your password"
          name="password"
          type="password"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />

        <Button
          type="submit"
          size="lg"
          className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg"
        >
          Register
        </Button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </Form>
    </div>
  );
}
function newDate() {
  throw new Error("Function not implemented.");
}

import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { mongodb } from "~/lib/mongoDb.server";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(5, "Email must be at least 5 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const resolver = zodResolver(schema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const { receivedValues, errors, data } = await getValidatedFormData<
    z.infer<typeof schema>
  >(request, resolver);
  if (errors) {
    return json({ errors, receivedValues, data });
    
  }

  const { email, password } = data;

  await mongodb.db("knifeEdgeRemix").collection("user").insertOne({
    username: email,
    password: password,
  });

  return null;
};

export const loader = async () => {
  const users = await mongodb
    .db("knifeEdgeRemix")
    .collection("user")
    .find()
    .toArray();

  return json({
    users: users,
  });
};

export default function Index() {
  const { formState, handleSubmit, watch, setValue, register } = useRemixForm<
    z.infer<typeof schema>
  >({
    resolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col h-full min-h-screen">
      <Header />
      <main className="flex-auto justify-center align-middle">
        {/* Form with handleSubmit */}
        <form
          className="mx-auto max-w-md p-4"
          method="post"
          onSubmit={handleSubmit}
        >
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formState.errors.email && (
              <p className="text-red-500">{formState.errors.email.message}</p>
            )}
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formState.errors.password && (
              <p className="text-red-500">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

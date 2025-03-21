import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { mongodb } from "~/lib/mongoDb.server";
import { User } from "~/types";
import { storeUserInSession } from "~/session/session.server";
import logo from "~/Images/knifeEdgeLogo.png";
import { Link } from "@remix-run/react/dist/components";


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

  const user = await mongodb
    .db("knifeEdgeRemix")
    .collection<User>("user")
    .findOne({ username: email });

  console.log("args", { aEmail: email, aPassword: password });
  console.log("mongo", user);

  if (!user) {
    throw json({ message: "invalid credentials" }, 400);
  }

  if (user.password !== password) {
    throw json({ message: "invalid credentials" }, 400);
  }

  const session = await storeUserInSession(user);

  return redirect("/home", {
    headers: {
      "Set-Cookie": session,
    },
  });
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
    <>
  <Header />
  <div className="flex flex-col h-full min-h-screen">
    <main className="flex-auto flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <img src={logo} className="h-48 object-contain mx-auto" alt="Logo" />
      </div>
      {/* Form with handleSubmit */}
      <form
        className="mx-auto max-w-md p-4 w-full"
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
        >
          Submit
        </button>

        {/* Create account button */}
        <div className="text-center">
  <Link to="/Register" className="text-blue-500 hover:text-blue-700">
    Don't have an account? Create one here
  </Link>
</div>
      </form>
    </main>
    <Footer />
  </div>
</>
  )
}

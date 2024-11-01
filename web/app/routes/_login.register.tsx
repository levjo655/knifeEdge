import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { createUser } from "~/models/user.server";
import { storeUserInSession } from "./session/session.server";

// Adding authentication

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const email= formData.get("email");
    const passoword= formData.get("password");
    const user = await createUser(email as string, passoword as string);
    const sessionHeader = await storeUserInSession( user);
  return redirect ("/dashboard" , {
    headers: {
        "Set-Cookie": sessionHeader
    }
  });
};

export default function RegisterRoute() {
  return (
    <Form
      className="mx-auto flex h-full w-full items-center justify-center"
      method="post"
    >
      <div className="flex flex-col gap-4 mx-auto h-full w-full items-center justify-center lg:w-2/3">
        <h1 className="mb-2 text-center text-6xl text-black lg:mb-4">
          Register
        </h1>
        <p className="text-center">Register below</p>
        <Input
          name="email"
          placeholder="Enter your email"
          type="email"
          required
          className="w-full"
        />

        <Input
          placeholder="Enter your password"
          name="password"
          type="password"
          required
          className="w-full"
        />

        <Button type="submit" size="lg">
          Register
        </Button>
      </div>
    </Form>
  );
}

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import { requireUser } from "~/session/guards.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);

  return json({
    user: user,
  });
};

const Layout = () => {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      {user.username}
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

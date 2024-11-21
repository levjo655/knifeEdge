import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { loader } from "./_app.home._index/route";
import { requireUser } from "../session/guards.server";

export const loadedr = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);
  return null;
};

export default function RouteComponent() {
  const data = useLoaderData<typeof loader>();
  return <div></div>;
}

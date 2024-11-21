import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";

const Route = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Route;

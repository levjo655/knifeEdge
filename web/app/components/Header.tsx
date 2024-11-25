import {
  Form,
  Navigate,
  redirect,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import logo from "../Images/knifeEdgeLogo.png";
import { LoaderFunction } from "@remix-run/node";
import logOut from "~/routes/_auth.logout/route";
import { loader } from "~/routes/_app.home._index/route";

const Header = () => {
  const Navigate = useNavigate();
  // const { user } = useLoaderData<typeof loader>();
  return (
    <div className="flex w-full justify-between bg-slate-300">
      <h1 className="flex align-top mr-1 p-4"></h1>

      <header className="header justify-between items-end py-4 px-8 ">
        <nav className="flex space-x-6 justify-end">
          <ul className="flex space-x-16 justify-end">
            <li
              onClick={() => Navigate("/Home")}
              className="hover:text-gray-700 cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => Navigate("/Recipes")}
              className="hover:text-gray-700 cursor-pointer"
            >
              Recipes
            </li>
            <li
              onClick={() => Navigate("/knives")}
              className="hover:text-gray-700 cursor-pointer"
            >
              My knives
            </li>
            <li
              onClick={() => Navigate("/About")}
              className="hover:text-gray-700 cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => Navigate("/login")}
              className="hover:text-gray-700 cursor-pointer"
            >
              Log in
            </li>
            <li
              onClick={() => Navigate("/register")}
              className="hover:text-gray-700 cursor-pointer"
            >
              Create Account
            </li>
            <li className="hover:text-gray-700 cursor-pointer">
              <Form method="post" action="/logout">
                <button type="submit" className="w-full text-left">
                  Log out
                </button>
              </Form>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;

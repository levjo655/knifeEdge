import {
  Navigate,
  redirect,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import logo from "../Images/knifeEdgeLogo.png";
import { LoaderFunction } from "@remix-run/node";

const Header = () => {
  const Navigate = useNavigate();
  return (
    <div className="flex w-full justify-between bg-slate-300">
      <img
        className="w-10 h-auto justify-start"
        src={logo}
        alt="knifeEdge logo"
      />
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
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;

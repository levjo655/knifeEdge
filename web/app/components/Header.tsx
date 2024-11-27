import { Form, useNavigate, useRouteLoaderData } from "@remix-run/react";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useRouteLoaderData("root") || {}; // Get user from root loader

  return (
    <div className="flex w-full bg-slate-300 px-8 py-4">
      <nav className="ml-auto">
        <ul className="flex space-x-6">
          <li
            onClick={() => navigate("/Home")}
            className="hover:text-gray-700 cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/Recipes")}
            className="hover:text-gray-700 cursor-pointer"
          >
            Recipes
          </li>
          <li
            onClick={() => navigate("/knives")}
            className="hover:text-gray-700 cursor-pointer"
          >
            My knives
          </li>
          <li
            onClick={() => navigate("/About")}
            className="hover:text-gray-700 cursor-pointer"
          >
            About
          </li>
          {!user && (
            <>
              <li
                onClick={() => navigate("/login")}
                className="hover:text-gray-700 cursor-pointer"
              >
                Log in
              </li>
              <li
                onClick={() => navigate("/register")}
                className="hover:text-gray-700 cursor-pointer"
              >
                Create Account
              </li>
            </>
          )}
          {user && (
            <li className="hover:text-gray-700 cursor-pointer">
              <Form method="post" action="/logout">
                <button type="submit" className="w-full text-left">
                  Log out
                </button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;

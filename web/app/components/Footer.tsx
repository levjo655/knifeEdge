import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-slate-300 mt-auto">
      <div className="flex justify-center py-4 px-8">
        <nav className="flex justify-center space-x-6">
          <ul className="flex space-x-16">
            <li className="hover:text-gray-700 cursor-pointer">About</li>
            <li className="hover:text-gray-700 cursor-pointer">Contact</li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

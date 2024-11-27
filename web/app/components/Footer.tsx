import { useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export const Footer = () => {
  const Navigate = useNavigate();
  return (
    <footer className="bg-slate-300 mt-auto">
      <div className="flex justify-center py-4 px-8">
        <nav className="flex justify-center space-x-6">
          <ul className="flex space-x-16">
            <li
              onClick={() => Navigate("/About")}
              className="hover:text-gray-700 cursor-pointer"
            >
              About{" "}
            </li>
            <li
              onClick={() => Navigate("/Contact")}
              className="hover:text-gray-700 cursor-pointer"
            >
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

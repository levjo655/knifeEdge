import React from "react";
import logo from "../Images/knifeEdgeLogo.png";

import Header from "~/components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { useNavigate } from "@remix-run/react";

export const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <img
        src={logo}
        alt="Knife Edge Logo"
        className="w-32 h-32 mx-auto mb-4"
      />
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>Levjo Cibuku <br />Email: levjo.cibuku@hotmail.com <br />Tel: 070 84 85 534</p>
          </CardContent>
          <CardFooter>
            <p>© 2025 All rights reserved.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Contact;

import React from "react";
import logo from "../Images/knifeEdgeLogo.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import Header from "~/components/Header";

export const About = () => {
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
            <CardTitle>Knife Edge</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              "Welcome to Knife Edge – where culinary creativity meets
              precision! Built entirely by me using the powerful Remix framework
              and TypeScript, Knife Edge is your ultimate kitchen companion. The
              idea is simple yet sharp: enter the ingredients you have in your
              fridge, and Knife Edge will suggest recipes tailored to your
              pantry. But that's not all – as a proud knife enthusiast, I've
              paired every recipe suggestion with the perfect knife for the job,
              celebrating the art and utility of blades. Whether you're a home
              cook, a foodie, or just curious, Knife Edge is here to make your
              cooking experience effortless, exciting, and a cut above the rest.
              Bon appétit!"{" "}
            </p>
          </CardContent>
          <CardFooter>
            <p>© 2024 All rights reserved.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default About;

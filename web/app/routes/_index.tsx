import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import IngredientsInput from "~/components/IngredientsInput";
import UserInputForm from "~/components/userInputForm";

export default function Index() {
  return (
    <div>
      <Header />
      <UserInputForm />
      
    </div>

  );
}

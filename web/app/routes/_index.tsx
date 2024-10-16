import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import IngredientsInput from "~/components/IngredientsInput";
import UserInputForm from "~/components/userInputForm";
import Footer from "~/components/Footer";

export default function Index() {
  return (
    <div className="flex flex-col h-full min-h-screen flex-auto">
      <Header />
      <main className="flex-auto">
        <UserInputForm />
      </main>

      <Footer />
    </div>
  );
}

import IngredientsInput from "~/components/IngredientsInput";
import { useState } from "react";



export default function Page() {
    const [ingredients, setIngredients] =useState([""]);



  return <div><IngredientsInput></IngredientsInput></div>;
}
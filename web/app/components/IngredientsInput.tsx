import { useState } from "react";

const IngredientsInput = () => {
  const [ingredient, setIngredient] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async () => {};

  const handleInputChange =(event) =>{
    const { value }= event.target;
    setIngredient(value);

  }

  return (
    <div>
      <input type="text" value={ingredient} 
      onChange={handleInputChange}
      />
     
      <button onClick={handleClick}>Add Ingredient</button>
    </div>
  );
};

export default IngredientsInput;

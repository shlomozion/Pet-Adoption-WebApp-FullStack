import { useState, useEffect } from "react";

const usePetColorValidator = () => {
  const [petColor, setPetColor] = useState("");
  const [petColorArr, setPetColorArr] = useState([]);
  const [newPetColor, setNewPetColor] = useState("");
  const newPetColorMode = petColor === "new";
  const isPetColorValid = !(!petColor || petColor === "new");

  const addPetColorHandler = () => {
    setPetColorArr([...petColorArr, newPetColor]);
    setPetColor(newPetColor);
  };

  return {
    petColor,
    setPetColor,
    isPetColorValid,
    petColorArr,
    setPetColorArr,
    newPetColorMode,
    newPetColor,
    setNewPetColor,
    addPetColorHandler,
  };
};

export { usePetColorValidator };

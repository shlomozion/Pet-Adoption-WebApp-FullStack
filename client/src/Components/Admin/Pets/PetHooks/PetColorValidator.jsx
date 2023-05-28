import { useState, useEffect } from "react";

const usePetColorValidator = () => {
  const [petColor, setPetColor] = useState("");
  const [isPetColorValid, setIsPetColorValid] = useState(false);
  const [petColorArr, setPetColorArr] = useState([]);
  const [newPetColorMode, setNewPetColorMode] = useState(false);
  const [newPetColor, setNewPetColor] = useState("");

  const addPetColorHandler = () => {
    setPetColorArr([...petColorArr, newPetColor]);
    setPetColor(newPetColor);
    setNewPetColorMode(false);
  };

  useEffect(() => {
    petColor === "new" ? setNewPetColorMode(true) : setNewPetColorMode(false);
    !petColor || petColor === "new"
      ? setIsPetColorValid(false)
      : setIsPetColorValid(true);
  }, [petColor]);
  return {
    petColor,
    setPetColor,
    isPetColorValid,
    setIsPetColorValid,
    petColorArr,
    setPetColorArr,
    newPetColorMode,
    setNewPetColorMode,
    newPetColor,
    setNewPetColor,
    addPetColorHandler,
  };
};

export { usePetColorValidator };

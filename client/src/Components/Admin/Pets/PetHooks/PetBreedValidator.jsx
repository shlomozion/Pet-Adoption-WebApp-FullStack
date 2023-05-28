import { useState, useEffect } from "react";

const usePetBreedValidator = () => {
  const [petBreed, setPetBreed] = useState("");
  const [isPetBreedValid, setIsPetBreedValid] = useState(false);
  const [petBreedArr, setPetBreedArr] = useState([]);
  const [newPetBreedMode, setNewPetBreedMode] = useState(false);
  const [newPetBreed, setNewPetBreed] = useState("");

  const addPetBreedHandler = () => {
    setPetBreedArr([...petBreedArr, newPetBreed]);
    setPetBreed(newPetBreed);
    setNewPetBreedMode(false);
  };
  useEffect(() => {
    petBreed === "new" ? setNewPetBreedMode(true) : setNewPetBreedMode(false);
    !petBreed || petBreed === "new"
      ? setIsPetBreedValid(false)
      : setIsPetBreedValid(true);
  }, [petBreed]);
  return {
    petBreed,
    setPetBreed,
    isPetBreedValid,
    setPetBreedArr,
    petBreedArr,
    newPetBreedMode,
    newPetBreed,
    setNewPetBreed,
    addPetBreedHandler,
  };
};

export { usePetBreedValidator };

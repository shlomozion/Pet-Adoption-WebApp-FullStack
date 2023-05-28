import { useState, useEffect } from "react";

const usePetTypeValidator = () => {
  const [petType, setPetType] = useState("");
  const [isPetTypeValid, setIsPetTypeValid] = useState(false);
  const [petTypeArr, setPetTypeArr] = useState([]);
  const [newPetTypeMode, setNewPetTypeMode] = useState(false);
  const [newPetType, setNewPetType] = useState("");

  const addPetTypeHandler = () => {
    setPetTypeArr([...petTypeArr, newPetType]);
    setPetType(newPetType);
    setNewPetTypeMode(false);
  };

  useEffect(() => {
    petType === "new" ? setNewPetTypeMode(true) : setNewPetTypeMode(false);
    !petType || petType === "new"
      ? setIsPetTypeValid(false)
      : setIsPetTypeValid(true);
  }, [petType]);

  return {
    petType,
    setPetType,
    isPetTypeValid,
    petTypeArr,
    setPetTypeArr,
    setNewPetTypeMode,
    newPetTypeMode,
    setNewPetType,
    newPetType,
    addPetTypeHandler,
  };
};

export { usePetTypeValidator };

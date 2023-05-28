import { useState, useEffect } from "react";

function usePetNameValidator() {
  const [petName, setPetName] = useState("");
  const [isPetNameValid, setIsPetNameValid] = useState(false);

  useEffect(() => {
    !petName.length ? setIsPetNameValid(false) : setIsPetNameValid(true);
  }, [petName]);
  return { petName, setPetName, isPetNameValid };
}
export { usePetNameValidator };

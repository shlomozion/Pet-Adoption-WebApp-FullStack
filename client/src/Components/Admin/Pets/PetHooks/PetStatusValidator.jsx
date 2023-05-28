import { useState, useEffect } from "react";

const usePetStatusValidator = () => {
  const [petStatus, setPetStatus] = useState("");
  const [isPetStatusValid, setIsPetStatusValid] = useState(false);

  useEffect(() => {
    !petStatus ? setIsPetStatusValid(false) : setIsPetStatusValid(true);
  }, [petStatus]);

  return { petStatus, setPetStatus, isPetStatusValid };
};
export { usePetStatusValidator };

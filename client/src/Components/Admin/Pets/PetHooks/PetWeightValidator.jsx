import { useState, useEffect } from "react";

const usePetWeightValidator = () => {
  const [weight, setWeight] = useState("");
  const [isWeightValid, setIsWeightValid] = useState(false);

  useEffect(() => {
    !weight.length ? setIsWeightValid(false) : setIsWeightValid(true);
  }, [weight]);

  return { weight, setWeight, isWeightValid };
};

export { usePetWeightValidator };

import { useState, useEffect } from "react";

const usePetHypoallergenicValidator = () => {
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [isHypoallergenicValid, setIsHypoallergenicValid] = useState(false);

  useEffect(() => {
    !hypoallergenic
      ? setIsHypoallergenicValid(false)
      : setIsHypoallergenicValid(true);
  }, [hypoallergenic]);

  return {
    hypoallergenic,
    setHypoallergenic,
    isHypoallergenicValid,
    setIsHypoallergenicValid,
  };
};

export { usePetHypoallergenicValidator };

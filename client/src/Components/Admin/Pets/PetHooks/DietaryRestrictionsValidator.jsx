import { useState, useEffect } from "react";

const useDietaryRestrictionsValidator = () => {
  const [dietaryRestriction, setDietaryRestriction] = useState("");
  const [dietaryRestrictionArr, setDietaryRestrictionArr] = useState([]);
  const [addRestrictionMode, setAddRestrictionMode] = useState(false);
  const addNewRestriction = () => {
    setDietaryRestrictionArr([...dietaryRestrictionArr, dietaryRestriction]);
    setDietaryRestriction("");
    setAddRestrictionMode(false);
  };
  useEffect(() => {
    !dietaryRestriction && console.log("no restriction");
  }, [dietaryRestriction]);

  return {
    dietaryRestriction,
    setDietaryRestriction,
    dietaryRestrictionArr,
    setDietaryRestrictionArr,
    addRestrictionMode,
    setAddRestrictionMode,
    addNewRestriction,
  };
};

export { useDietaryRestrictionsValidator };

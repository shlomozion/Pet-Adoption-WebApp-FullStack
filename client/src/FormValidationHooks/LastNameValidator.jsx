import { useState, useEffect, useRef } from "react";

function useLastNameValidator() {
  const [lastName, setLastName] = useState("");
  const [isLastNameValid, setIsLastNameValid] = useState("");
  // const isInitialMount = useRef(true);
  useEffect(() => {
    if (!lastName) {
      setIsLastNameValid(false);
    } else {
      setIsLastNameValid(true);
    }
  }, [lastName]);
  return { lastName, setLastName, isLastNameValid };
}
export { useLastNameValidator };

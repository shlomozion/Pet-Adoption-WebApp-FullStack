import { useState, useEffect } from "react";

function useFirstNameValidator() {
  const [firstName, setFirstName] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);

  // const isInitialMount = useRef(true);

  useEffect(() => {
    if (!firstName) {
      setIsFirstNameValid(false);
    } else {
      setIsFirstNameValid(true);
    }
  }, [firstName, isFirstNameValid]);
  return { firstName, setFirstName, isFirstNameValid };
}
export { useFirstNameValidator };

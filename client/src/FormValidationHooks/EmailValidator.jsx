import { useState, useEffect, useRef } from "react";

function useEmailValidator() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  // console.log("emailvalidator", isEmailValid);
  // const isInitialMount = useRef(true);
  useEffect(() => {
    if (!email) {
      return;
    } else {
      const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;
      const isValid = emailRegex.test(email);
      if (isValid) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    }
  }, [email]);
  return { email, setEmail, isEmailValid };
}
export { useEmailValidator };

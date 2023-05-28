import { useState, useEffect, useRef } from "react";

function usePasswordValidator() {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isRePasswordValid, setIsRePasswordValid] = useState("");
  const isInitialMount = useRef(true);

  // console.log("password", password);
  // console.log("rePassword", rePassword);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
      const isValid = passwordRegex.test(password);
      if (!isValid) {
        setIsPasswordValid(false);
      } else {
        setIsPasswordValid(true);
      }
    }
  }, [password]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!password) {
        return;
      }
      if (rePassword !== password) {
        setIsRePasswordValid(false);
      } else {
        setIsRePasswordValid(true);
      }
    }
  }, [rePassword]);

  return {
    password,
    rePassword,
    setPassword,
    isPasswordValid,
    setRePassword,
    isRePasswordValid,
  };
}
export { usePasswordValidator };

import { useState, useEffect, useRef } from "react";

function usePhoneNumberValidator() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState("");
  // const isInitialMount = useRef(true);
  useEffect(() => {
    // console.log("here");
    const phoneRegex = /[0-9]{10,11}$/g;
    const isValid = phoneRegex.test(phoneNumber);
    if (!isValid) {
      setIsPhoneNumberValid(false);
    } else {
      setIsPhoneNumberValid(true);
    }
  }, [phoneNumber]);
  return { phoneNumber, setPhoneNumber, isPhoneNumberValid };
}
export { usePhoneNumberValidator };

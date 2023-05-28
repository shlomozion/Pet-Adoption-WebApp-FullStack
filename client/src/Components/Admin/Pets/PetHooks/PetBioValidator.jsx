import { useState, useEffect } from "react";

const usePetBioValidator = () => {
  const [bio, setBio] = useState("");
  const [isBioValid, setIsBioValid] = useState(false);

  useEffect(() => {
    bio.length ? setIsBioValid(true) : setIsBioValid(false);
  }, [bio]);

  return { bio, setBio, isBioValid };
};

export { usePetBioValidator };

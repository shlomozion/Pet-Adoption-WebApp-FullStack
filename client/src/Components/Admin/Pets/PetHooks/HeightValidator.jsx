import { useState, useEffect } from "react";

const useHeightValidator = () => {
  const [height, setHeight] = useState("");
  const [isHeightValid, setIsHeightValid] = useState(false);

  useEffect(() => {
    !height.length ? setIsHeightValid(false) : setIsHeightValid(true);
  }, [height]);

  return { height, setHeight, isHeightValid, setIsHeightValid };
};

export { useHeightValidator };

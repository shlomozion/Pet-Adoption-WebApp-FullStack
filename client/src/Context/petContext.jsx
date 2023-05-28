import axios from "axios";
import { createContext, useState, useEffect } from "react";
export const PetContextInstance = createContext({});

export const PetContext = ({ children }) => {
  const [currentPet, setCurrentPet] = useState({});
  const [petArr, setPetArr] = useState([]);

  const getPets = async () => {
    const res = await axios.get("http://localhost:8000/pets/getPets", {
      withCredentials: true,
    });
    if (res.data) {
      console.log("done");
      setPetArr(res.data);
    }
  };
  // console.log(petArr);
  useEffect(() => {
    getPets();
  }, []);

  return (
    <PetContextInstance.Provider
      value={{
        currentPet,
        setCurrentPet,
        petArr,
      }}
    >
      <div>{children}</div>
    </PetContextInstance.Provider>
  );
};

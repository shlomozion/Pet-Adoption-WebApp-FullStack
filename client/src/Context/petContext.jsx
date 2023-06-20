import axios from "axios";
import { createContext, useState, useEffect } from "react";
export const PetContextInstance = createContext({});

export const PetContext = ({ children }) => {
  const [currentPet, setCurrentPet] = useState({});
  const [petArr, setPetArr] = useState([]);

  const getPets = async () => {
    const res = await axios.get(
      "https://pet-adopt-server.vercel.app/pets/getPets",
      {
        withCredentials: true,
      }
    );
    if (res.data) {
      setPetArr(res.data);
    }
  };
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

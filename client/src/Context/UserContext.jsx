import { createContext, useState } from "react";
export const UserContextInstance = createContext({});

export const UserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userProfileImg, setUserProfileImg] = useState("");
  const [userPetArr, setUserPetArr] = useState([]);

  return (
    <UserContextInstance.Provider
      value={{
        currentUser,
        setCurrentUser,
        userProfileImg,
        setUserProfileImg,
        userPetArr,
      }}
    >
      <div>{children}</div>
    </UserContextInstance.Provider>
  );
};

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { UserContextInstance } from "./UserContext";
export const AuthContextInstance = createContext();

export const AuthContext = ({ children }) => {
  const { setCurrentUser, setUserProfileImg } = useContext(UserContextInstance);

  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const authFetch = async () => {
    try {
      const user = await axios.get(
        "https://server-swart-tau.vercel.app/users/token",
        {
          withCredentials: true,
        }
      );
      // const admin = await axios.get(
      //   "https://server-swart-tau.vercel.app/admin/adminToken",
      //   {
      //     withCredentials: true,
      //   }
      // );
      if (user.data.token) {
        // console.log("user", user);
        setCurrentUser(user.data);
        setToken(user.data.token);
        setUserProfileImg(user.data.key);
        setIsLoggedIn(true);
        setIsAdminMode(false);
        return;
      }
      // if (admin.data.token) {
      //   // console.log("admin", admin);
      //   setCurrentUser(admin.data.admin);
      //   setToken(admin.data.token);
      //   setIsLoggedIn(true);
      //   setIsAdminMode(true);
      // }
      if (!user.data.token) {
        setIsLoggedIn(false);
        setCurrentUser("");
        setUserProfileImg("");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authFetch();
  }, []);

  return (
    <AuthContextInstance.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        isAdminMode,
        setIsAdminMode,
      }}
    >
      {children}
    </AuthContextInstance.Provider>
  );
};

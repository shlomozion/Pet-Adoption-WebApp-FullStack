import axios from "axios";
import { useContext } from "react";
import { UserContextInstance } from "../../../Context/UserContext";
import { AuthContextInstance } from "../../../Context/AuthContext";

const useSignOut = () => {
  const { currentUser } = useContext(UserContextInstance);
  const { token, isLoggedIn, setIsLoggedIn } = useContext(AuthContextInstance);
  // console.log("setIsLoggedIn", isLoggedIn);

  const signOut = async () => {
    try {
      const userId = currentUser?.userFromDB?.userId;
      console.log("file: SignOut.jsx:14", currentUser?.userFromDB?.userId);

      const removeCookie = await axios.post(
        `https://pet-adopt-server.vercel.app/users/signout/${userId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(removeCookie);
    } catch (err) {
      console.log(err);
    }
  };
  return { signOut };
};
export { useSignOut };

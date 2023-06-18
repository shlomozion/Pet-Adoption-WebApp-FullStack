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
      const { userId } = currentUser || {};
      const removeCookie = await axios.post(
        `https://server-swart-tau.vercel.app/users/signout/${userId}`,
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

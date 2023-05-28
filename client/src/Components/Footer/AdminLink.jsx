import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContextInstance } from "../../Context/AuthContext";
export default function AdminLink() {
  const { setIsAdminMode } = useContext(AuthContextInstance);
  return (
    <div className="footer border d-flex justify-content-end ">
      <NavLink
        to="/adminLogin"
        className={"links"}
        onClick={() => {
          setIsAdminMode(true);
        }}
      >
        admin
      </NavLink>
    </div>
  );
}

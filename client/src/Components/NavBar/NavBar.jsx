import { useContext } from "react";
import { UserContextInstance } from "../../Context/UserContext";
import { AuthContextInstance } from "../../Context/AuthContext";
import { useSignOut } from "./NavbarHooks/SignOut";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { currentUser, setCurrentUser, setUserProfileImg } =
    useContext(UserContextInstance);
  const {
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    isAdminMode,
    setIsAdminMode,
  } = useContext(AuthContextInstance);
  // console.log("currentUser", currentUser);
  const { signOut } = useSignOut();
  // console.log("token", token);
  const { userId, firstName } = currentUser.userFromDB || currentUser || {};
  // console.log(currentUser.userFromDB);
  const signOutHandler = () => {
    signOut();
    setIsLoggedIn(false);
    setIsAdminMode(false);
    setCurrentUser("");
    setToken("");
    setUserProfileImg("");
  };

  return (
    <Navbar bg="light" expand="xl">
      <Container>
        <Navbar.Brand>
          <img
            src="https://static.vecteezy.com/system/resources/previews/006/470/722/original/pet-shop-logo-design-template-modern-animal-icon-label-for-store-veterinary-clinic-hospital-shelter-business-services-flat-illustration-background-with-dog-cat-and-horse-free-vector.jpg"
            alt="logo"
            height={"100vh"}
            width={"110vw"}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink to="/adoptAPet" className="links mx-2">
              Adopt-A-Pet!
            </NavLink>
            <NavLink to="/about" className="mx-2 links">
              About
            </NavLink>
            <NavLink to="/contact" className="mx-2 links">
              Contact
            </NavLink>

            <NavLink to="/browsePets" className="mx-2 links">
              Browse Pets
            </NavLink>
          </Nav>
          {!isLoggedIn ? (
            <Nav className={isAdminMode ? "d-none" : ""}>
              <NavLink to="/signup" className="links mx-2">
                Sign-up
              </NavLink>

              <NavLink to="/login" className="links mx-2">
                Login
              </NavLink>
            </Nav>
          ) : (
            <Nav>
              <Nav className="m-0 p-0 align-items-center">Welcome:</Nav>
              <NavDropdown
                title={firstName}
                id="navbarScrollingDropdown"
                className="me-5 pe-3"
              >
                <div className="d-flex flex-column mx-2">
                  <NavLink
                    to={`/userProfile/:${userId}`}
                    className="links my-1"
                  >
                    Profile settings
                  </NavLink>
                  <Dropdown.Item>
                    {isLoggedIn && isAdminMode ? (
                      <NavLink to={"/adminUsersList"} className="links my-1">
                        User list
                      </NavLink>
                    ) : (
                      <NavLink
                        to={`/user/myPets/:${userId}`}
                        className="links my-1"
                      >
                        &#10084; My pets
                      </NavLink>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {isAdminMode && (
                      <NavLink to={"/adminPetsList"} className="links my-1">
                        Pets list
                      </NavLink>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {isAdminMode && (
                      <NavLink to={"/adminAddPet"} className="links my-1">
                        Add pet
                      </NavLink>
                    )}
                  </Dropdown.Item>
                  {/* <Dropdown.Item></Dropdown.Item> */}
                </div>
                <NavDropdown.Divider />
                <NavLink
                  to="/"
                  className="mx-2 links"
                  onClick={() => signOutHandler()}
                >
                  Sign out
                </NavLink>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

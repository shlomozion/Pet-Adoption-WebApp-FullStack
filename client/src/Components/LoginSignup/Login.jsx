import { useContext, useState } from "react";
import { AuthContextInstance } from "../../Context/AuthContext";
import { UserContextInstance } from "../../Context/UserContext";
import { usePasswordValidator } from "../../FormValidationHooks/PasswordValidator";
import { useEmailValidator } from "../../FormValidationHooks/EmailValidator";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { email, setEmail, isEmailValid } = useEmailValidator();
  const { password, setPassword, isPasswordValid } = usePasswordValidator();
  const { setToken, setIsLoggedIn } = useContext(AuthContextInstance);
  const { setCurrentUser, setUserProfileImg } = useContext(UserContextInstance);
  const [errorMessage, setErrorMessage] = useState("");

  // console.log(setIsLoggedIn);

  const handleSignIn = async () => {
    if (isEmailValid && isPasswordValid) {
      try {
        const res = await axios.post(
          `https://pet-adopt-server.vercel.app/users/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        console.log(res);
        if (res.data.user) {
          console.log("res", res.data.user);
          setCurrentUser(res.data.user);
          setToken(res.data.user.token);
          setUserProfileImg(res.data.key);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          console.log("res", res.data);
          setCurrentUser(res.data);
          setToken(res.data.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error.response.data);
        setErrorMessage(error.response.data);
      }
      //   setSignInUser({ email, password });
    }
  };
  return (
    <div>
      <Container>
        <Form>
          <Form.Group md="4" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoComplete="username"
              required
              inputMode="email"
              type="email"
              onInput={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom04">
            <Form.Label>Password</Form.Label>
            <Form.Control
              autoComplete="current-password"
              required
              type={`${!showPassword ? "password" : "text"}`}
              onInput={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {errorMessage && (
            <div className="d-flex">
              {errorMessage}
              <NavLink className="ms-1" to={"/signup"}>
                sign up
              </NavLink>
            </div>
          )}
          <Form.Group controlId="validationCustom06">
            <Form.Check
              size="sm"
              type={"checkbox"}
              label="Show password"
              className="d-flex justify-content-end"
              onClick={() =>
                `${
                  !showPassword ? setShowPassword(true) : setShowPassword(false)
                }`
              }
            />
          </Form.Group>
          <Button
            className="rounded-pill"
            variant="primary"
            onClick={handleSignIn}
          >
            Log in
          </Button>
        </Form>
      </Container>
    </div>
  );
}

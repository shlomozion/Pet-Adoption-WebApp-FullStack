import { useContext, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { usePasswordValidator } from "../../FormValidationHooks/PasswordValidator";
import { useEmailValidator } from "../../FormValidationHooks/EmailValidator";
import { AuthContextInstance } from "../../Context/AuthContext";
import { UserContextInstance } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const navigate = useNavigate();
  const { setToken, setIsLoggedIn, setIsAdminMode } =
    useContext(AuthContextInstance);
  const { setCurrentUser } = useContext(UserContextInstance);
  const [showPassword, setShowPassword] = useState(false);
  const { email, setEmail, isEmailValid } = useEmailValidator();
  const { password, setPassword, isPasswordValid } = usePasswordValidator();

  const handleSignIn = async () => {
    if (isEmailValid && isPasswordValid) {
      try {
        const res = await axios.post(
          `http://localhost:8000/admin/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        console.log(res.data.token);
        if (res.data.token) {
          setCurrentUser(res.data);
          setToken(res.data.token);
          setIsAdminMode(true);
          setIsLoggedIn(true);
          navigate("/adminHomePage");
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group md="4" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              isValid={isEmailValid}
              isInvalid={!isEmailValid}
              required
              inputMode="email"
              type="email"
              onInput={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Invalid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom04">
            <Form.Label>Password</Form.Label>
            <Form.Control
              isValid={isPasswordValid}
              isInvalid={!isPasswordValid}
              required
              type={`${!showPassword ? "password" : "text"}`}
              onInput={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Invalid password
            </Form.Control.Feedback>
          </Form.Group>
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

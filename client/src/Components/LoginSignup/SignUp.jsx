import { useState, useEffect, useContext } from "react";
import { useFirstNameValidator } from "../../FormValidationHooks/FirstNameValidator";
import { useLastNameValidator } from "../../FormValidationHooks/LastNameValidator";
import { useEmailValidator } from "../../FormValidationHooks/EmailValidator";
import { usePasswordValidator } from "../../FormValidationHooks/PasswordValidator";
import { usePhoneNumberValidator } from "../../FormValidationHooks/PhoneNumberValidator";
import { AuthContextInstance } from "../../Context/AuthContext";
import { UserContextInstance } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContextInstance);
  const { setCurrentUser } = useContext(UserContextInstance);

  const { firstName, setFirstName, isFirstNameValid } = useFirstNameValidator();
  const { lastName, setLastName, isLastNameValid } = useLastNameValidator();
  const { email, setEmail, isEmailValid } = useEmailValidator();
  const {
    password,
    setPassword,
    isPasswordValid,
    setRePassword,
    isRePasswordValid,
  } = usePasswordValidator();

  const { phoneNumber, setPhoneNumber, isPhoneNumberValid } =
    usePhoneNumberValidator();

  const [showPassword, setShowPassword] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isWeeklyEmail, setIsWeeklyEmail] = useState(false);
  const [missingFieldsMessage, setMissingFieldsMessage] = useState("");

  const conditions = [
    isFirstNameValid === true,
    isLastNameValid === true,
    isEmailValid === true,
    isPasswordValid === true,
    isRePasswordValid === true,
    isPhoneNumberValid === true,
  ];

  const allConditionsMet = () => {
    const allConditionsMet = conditions.every((condition) => condition);
    if (allConditionsMet === true) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  };
  useEffect(() => {
    allConditionsMet();
    const missingFields = conditions.filter((condition) => condition === false);
    if (missingFields.length === 0) {
      setMissingFieldsMessage("");
    } else {
      setMissingFieldsMessage(`Missing ${missingFields.length} Fields`);
    }
  }, [
    isFirstNameValid,
    isLastNameValid,
    isEmailValid,
    isPasswordValid,
    isRePasswordValid,
    isPhoneNumberValid,
  ]);

  const handleSignUp = async () => {
    if (isValidated === true) {
      try {
        const res = await axios.post(
          "https://pet-adopt-server.vercel.app/users/signup",
          {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            isWeeklyEmail,
          },
          { withCredentials: true }
        );
        if (res.status === 201) {
          navigate("/");
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              style={
                isFirstNameValid
                  ? {
                      border: "1px solid #008000",
                      boxShadow: "0 0 0 0.05rem #008000",
                    }
                  : {}
              }
              required
              type="text"
              onInput={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              style={
                isLastNameValid
                  ? {
                      border: "1px solid #008000",
                      boxShadow: "0 0 0 0.05rem #008000",
                    }
                  : {}
              }
              required
              type="text"
              onInput={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              style={
                isEmailValid
                  ? {
                      border: "1px solid #008000",
                      boxShadow: "0 0 0 0.05rem #008000",
                    }
                  : {}
              }
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
              style={
                isPasswordValid
                  ? {
                      border: "1px solid #008000",
                      boxShadow: "0 0 0 0.05rem #008000",
                    }
                  : {}
              }
              autoComplete="new-password"
              required
              type={`${!showPassword ? "password" : "text"}`}
              onInput={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom05">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              style={
                isRePasswordValid
                  ? {
                      border: "1px solid #008000",
                      boxShadow: "0 0 0 0.05rem #008000",
                    }
                  : {}
              }
              autoComplete="new-password"
              required
              type={`${!showPassword ? "password" : "text"}`}
              onInput={(e) => setRePassword(e.target.value)}
            />

            <Form.Group controlId="validationCustom06">
              <Form.Check
                size="sm"
                type={"checkbox"}
                label="Show password"
                className="d-flex justify-content-end"
                onClick={() =>
                  `${
                    !showPassword
                      ? setShowPassword(true)
                      : setShowPassword(false)
                  }`
                }
              />
            </Form.Group>
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom07">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              style={
                isPhoneNumberValid
                  ? {
                      border: "1px solid #008000",
                      boxShadow: "0 0 0 0.05rem #008000",
                    }
                  : {}
              }
              inputMode="tel"
              required
              type="tel"
              onInput={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            type={"checkbox"}
            label={`Sign me up to the weekly newsletter!`}
            size="sm"
            onClick={() =>
              `${
                !isWeeklyEmail
                  ? setIsWeeklyEmail(true)
                  : setIsWeeklyEmail(false)
              }`
            }
          />
          {
            <div className="text text-danger d-flex justify-content-end">
              {missingFieldsMessage}
            </div>
          }
        </Form>
        <div className="d-flex justify-content-end">
          <Button
            className="rounded-pill"
            variant={isValidated ? "success" : "danger"}
            onClick={() => handleSignUp()}
          >
            Sign up!
          </Button>
        </div>
      </Container>
    </div>
  );
}

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
  // console.log(setIsLoggedIn);

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

  const allConditionsMet = () => {
    const conditions = [
      isFirstNameValid === true,
      isLastNameValid === true,
      isEmailValid === true,
      isPasswordValid === true,
      isRePasswordValid === true,
      isPhoneNumberValid === true,
    ];
    const allConditionsMet = conditions.every((condition) => condition);
    if (allConditionsMet === true) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  };
  useEffect(() => {
    allConditionsMet();
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
          `http://localhost:8000/users/signup`,
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
        <Form noValidate>
          <Form.Group md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              isValid={isFirstNameValid}
              isInvalid={!isFirstNameValid}
              type="text"
              onInput={(e) => setFirstName(e.target.value)}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Missing first name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              isValid={isLastNameValid}
              isInvalid={!isLastNameValid}
              required
              type="text"
              onInput={(e) => setLastName(e.target.value)}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Missing last name
            </Form.Control.Feedback>
          </Form.Group>
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
          <Form.Group md="4" controlId="validationCustom05">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              isValid={isRePasswordValid}
              isInvalid={!isRePasswordValid}
              required
              type={`${!showPassword ? "password" : "text"}`}
              onInput={(e) => setRePassword(e.target.value)}
            />
            <Form.Control.Feedback type="valid">
              Passwords match!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Passwords don't match
            </Form.Control.Feedback>
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
              isValid={isPhoneNumberValid}
              isInvalid={!isPhoneNumberValid}
              inputMode="tel"
              required
              type="tel"
              onInput={(e) => setPhoneNumber(e.target.value)}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Not a valid phone number
            </Form.Control.Feedback>
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
        </Form>
        <Button
          className="rounded-pill"
          variant="primary"
          onClick={() => handleSignUp()}
        >
          Sign up!
        </Button>
      </Container>
    </div>
  );
}

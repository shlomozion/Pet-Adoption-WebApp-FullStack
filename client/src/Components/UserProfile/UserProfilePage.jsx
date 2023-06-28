import { useContext, useState, useEffect } from "react";
import { UserContextInstance } from "../../Context/UserContext";
import { AuthContextInstance } from "../../Context/AuthContext";
import { useFirstNameValidator } from "../../FormValidationHooks/FirstNameValidator";
import { useLastNameValidator } from "../../FormValidationHooks/LastNameValidator";
import { useEmailValidator } from "../../FormValidationHooks/EmailValidator";
import { usePhoneNumberValidator } from "../../FormValidationHooks/PhoneNumberValidator";
import { usePasswordValidator } from "../../FormValidationHooks/PasswordValidator";
import { useImageValidator } from "../../FormValidationHooks/ImageValidator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import CloseButton from "react-bootstrap/CloseButton";

export default function UserProfilePage() {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser, userProfileImg } =
    useContext(UserContextInstance);

  const { token } = useContext(AuthContextInstance);

  const {
    firstName: currentUserFirstName,
    lastName: currentUserLastName,
    email: currentUserEmail,
    phoneNumber: currentUserPhoneNumber,
    userId,
    bio: currentUserBio,
  } = currentUser.userFromDB || currentUser || {};

  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPasswordValidated, setOldPasswordValidated] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [bio, setBio] = useState("");

  const {
    password,
    rePassword,
    setPassword,
    isPasswordValid,
    setRePassword,
    isRePasswordValid,
  } = usePasswordValidator();

  const {
    userImg,
    isUploaded,
    fileDataURL,
    closeButton,
    imageChangeHandler,
    setCloseButton,
    file,
  } = useImageValidator();

  const { firstName, setFirstName, isFirstNameValid } = useFirstNameValidator();
  const { lastName, setLastName, isLastNameValid } = useLastNameValidator();
  const { email, setEmail, isEmailValid } = useEmailValidator();
  const { phoneNumber, setPhoneNumber, isPhoneNumberValid } =
    usePhoneNumberValidator();

  useEffect(() => {
    setFirstName(currentUserFirstName);
    setLastName(currentUserLastName);
    setEmail(currentUserEmail);
    setPhoneNumber(currentUserPhoneNumber);
  }, [currentUser]);

  const oldPasswordValidatorHandler = async () => {
    try {
      const res = await axios.post(
        `https://pet-adopt-server.vercel.app/users/validateOldPassword`,
        {
          password,
        },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setPassword("");
        setOldPasswordValidated(true);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPasswordHandler = async () => {
    if (isRePasswordValid) {
      // console.log("ready to reset password");
      try {
        const res = await axios.post(
          `https://pet-adopt-server.vercel.app/users/resetPassword`,
          {
            password,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.status === 200) {
          setChangePasswordMode(false);
          setOldPasswordValidated(false);
          setPassword("");
          setRePassword("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const passwordModeHandler = () => {
    if (!changePasswordMode) {
      return setChangePasswordMode(true);
    }
    if (changePasswordMode) {
      if (isPasswordValid) {
        return oldPasswordValidatorHandler();
      }
    }
  };
  const isAllInputValid = () => {
    try {
      const conditions = [
        isFirstNameValid === true,
        isLastNameValid === true,
        isEmailValid === true,
        isPhoneNumberValid === true,
      ];
      const allConditionsMet = conditions.every((condition) => condition);
      if (allConditionsMet === true) {
        setIsValidated(true);
      } else {
        setIsValidated(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    isAllInputValid();
  }, [isFirstNameValid, isLastNameValid, isEmailValid, isPhoneNumberValid]);

  const userDataFilter = () => {
    let updatedUserObj = {};
    if (currentUserFirstName !== firstName) {
      updatedUserObj.firstName = firstName;
    }
    if (currentUserLastName !== lastName) {
      updatedUserObj.lastName = lastName;
    }
    if (currentUserEmail !== email) {
      updatedUserObj.email = email;
    }
    if (currentUserPhoneNumber !== phoneNumber) {
      updatedUserObj.phoneNumber = phoneNumber;
    }
    if (currentUserBio !== bio) {
      updatedUserObj.bio = bio;
    }
    return updatedUserObj;
  };

  const putRequestForUpdatedUser = async () => {
    const updatedFieldsObj = userDataFilter();
    if (Object.keys(updatedFieldsObj).length === 0) {
      navigate("/");
      setCurrentUser(currentUser);
      return;
    } else {
      try {
        const res = await axios.put(
          `https://pet-adopt-server.vercel.app/users/updateUserInfo/:${userId}`,
          {
            updatedFieldsObj,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res);
        if (res.status === 201) {
          setCurrentUser(res.data);

          // setIsSaved(true);
          return;
        }
        navigate("/");

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formData = new FormData();
  useEffect(() => {
    formData.append("image", userImg);
  }, [userImg]);
  // console.log("formData", formData);
  const profileImagePostRequest = async () => {
    try {
      const res = await axios.post(
        `https://pet-adopt-server.vercel.app/users/uploadImg/:${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status) {
        console.log(res);
      } else {
        console.log("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const imagePostHandler = async () => {
    if (file.name) {
      console.log("file.name", file.name);
      profileImagePostRequest();
    }
  };

  const handleUpdateUser = async () => {
    if (isValidated) {
      putRequestForUpdatedUser();
    } else {
      console.log("misiing a feild");
    }
  };

  return (
    <div>
      {/* <img src={userImg} alt="userImg" /> */}
      <Container fluid="md" className="my-5 border">
        <Form>
          <div className="d-flex flex-column align-items-center ">
            <CloseButton
              aria-label="Hide"
              className={`${isUploaded === true ? "d-block" : "d-none"}`}
              onClick={() => setCloseButton(false)}
            />
            <Image
              src={
                userImg
                  ? fileDataURL
                  : !userProfileImg
                  ? "https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
                  : userProfileImg
              }
              roundedCircle
              defaultValue={
                "https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg" ||
                userProfileImg
              }
              style={{
                resizeMode: "contain",
                height: 180,
                width: 180,
              }}
              className="mb-3"
            />

            <Button
              className={`btn btn-light rounded-pill ${
                isUploaded ? "d-block" : "d-none"
              }`}
              onClick={imagePostHandler}
            >
              Upload profile picture
            </Button>

            <Form.Group
              controlId="formFileSm"
              className="mb-3 custom-file-button"
            >
              <Form.Label
                className={`input-group-text ${
                  !closeButton ? "d-block" : "d-none"
                }`}
              >
                Add profile picture
              </Form.Label>
              <Form.Control
                type="file"
                size="sm"
                className="custom-file-input d-none"
                encType="multipart/form-data"
                onChange={(e) => imageChangeHandler(e)}
              />
            </Form.Group>
          </div>

          <Row className="my-2 d-flex justify-content-center">
            <Col xs={8}>
              <Form.Group controlId="formGridEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={currentUserFirstName}
                  onInput={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2 d-flex justify-content-center">
            <Col xs={8}>
              <Form.Group controlId="formGridPassword">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={currentUserLastName}
                  onInput={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2 d-flex justify-content-center ">
            <Col xs={8}>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  inputMode="email"
                  defaultValue={currentUserEmail}
                  onInput={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2 d-flex justify-content-center">
            <Col xs={8}>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  inputMode="numeric"
                  defaultValue={currentUserPhoneNumber}
                  onInput={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2 d-flex justify-content-center">
            <Col
              xs={8}
              className={
                !changePasswordMode
                  ? "d-flex justify-content-end"
                  : "d-flex justify-content-between"
              }
            >
              <Form.Group
                className={!changePasswordMode ? "d-none" : "d-block "}
              >
                <Form.Control
                  type={!showPassword ? "password" : "text"}
                  placeholder={
                    !oldPasswordValidated ? "Old Password" : "New Password"
                  }
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                />
                <Form.Group
                  className={!oldPasswordValidated ? "d-none" : "d-block my-1"}
                >
                  <Form.Control
                    type={!showPassword ? "password" : "text"}
                    placeholder="Confirm new password"
                    value={rePassword}
                    onInput={(e) => setRePassword(e.target.value)}
                  />
                </Form.Group>
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

              <div>
                <Button
                  onClick={
                    !oldPasswordValidated
                      ? passwordModeHandler
                      : resetPasswordHandler
                  }
                >
                  {!changePasswordMode ? "Change Password" : "Confirm"}
                </Button>
              </div>
            </Col>
          </Row>

          <Row className="my-2 d-flex justify-content-center">
            <Col xs={8}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ resize: "none" }}
                  defaultValue={currentUserBio}
                  onInput={(e) => setBio(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-center my-4">
            <Button
              type="button"
              className={`rounded-pill ${
                isValidated === true ? "btn btn-success" : "btn btn-danger"
              }`}
              // className={`${isSaved && ''}`}
              onClick={handleUpdateUser}
            >
              Save changes
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

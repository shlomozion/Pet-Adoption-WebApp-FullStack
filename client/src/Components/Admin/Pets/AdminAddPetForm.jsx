import { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { AuthContextInstance } from "../../../Context/AuthContext";

import { useImageValidator } from "../../../FormValidationHooks/ImageValidator";
import { usePetNameValidator } from "./PetHooks/PetNameValidator";
import { usePetStatusValidator } from "./PetHooks/PetStatusValidator";
import { usePetTypeValidator } from "./PetHooks/PetTypeValidator";
import { usePetBreedValidator } from "./PetHooks/PetBreedValidator";
import { usePetHypoallergenicValidator } from "./PetHooks/PetHypoallergenicValidator";
import { usePetColorValidator } from "./PetHooks/PetColorValidator";
import { useHeightValidator } from "./PetHooks/HeightValidator";
import { usePetWeightValidator } from "./PetHooks/PetWeightValidator";
import { useDietaryRestrictionsValidator } from "./PetHooks/DietaryRestrictionsValidator";
import { usePetBioValidator } from "./PetHooks/PetBioValidator";
import { UserContextInstance } from "../../../Context/UserContext";

export default function AdminAddPetForm() {
  const { isAdminMode, token } = useContext(AuthContextInstance);
  const { currentUser } = useContext(UserContextInstance);
  const { email } = currentUser;
  // console.log("🚀 ~currentUser:", token);

  const { bio, setBio, isBioValid } = usePetBioValidator();
  const { petName, setPetName, isPetNameValid } = usePetNameValidator();
  const { petStatus, setPetStatus, isPetStatusValid } = usePetStatusValidator();
  const {
    petType,
    setPetType,
    petTypeArr,
    newPetTypeMode,
    setNewPetType,
    addPetTypeHandler,
    isPetTypeValid,
  } = usePetTypeValidator();
  const {
    petBreed,
    setPetBreed,
    petBreedArr,
    newPetBreedMode,
    setNewPetBreed,
    addPetBreedHandler,
    isPetBreedValid,
  } = usePetBreedValidator();

  const { height, setHeight, isHeightValid } = useHeightValidator();
  const { weight, setWeight, isWeightValid } = usePetWeightValidator();

  const { hypoallergenic, setHypoallergenic, isHypoallergenicValid } =
    usePetHypoallergenicValidator();
  const {
    dietaryRestriction,
    setDietaryRestriction,
    dietaryRestrictionArr,
    addRestrictionMode,
    setAddRestrictionMode,
    addNewRestriction,
  } = useDietaryRestrictionsValidator();

  const {
    petColor,
    setPetColor,
    petColorArr,
    newPetColorMode,
    setNewPetColor,
    addPetColorHandler,
    isPetColorValid,
  } = usePetColorValidator();

  const {
    userImg,
    isUploaded,
    fileDataURL,
    closeButton,
    setCloseButton,
    imageChangeHandler,
  } = useImageValidator();

  const [isValidated, setIsValidated] = useState(false);

  const allConditionsMet = () => {
    const conditions = [
      isUploaded === true,
      isPetNameValid === true,
      isPetStatusValid === true,
      isPetTypeValid === true,
      isPetBreedValid === true,
      isPetColorValid === true,
      isHeightValid === true,
      isWeightValid === true,
      isHypoallergenicValid === true,
      isBioValid === true,
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
    isUploaded,
    isPetNameValid,
    isPetStatusValid,
    isPetTypeValid,
    isPetBreedValid,
    isPetColorValid,
    isHeightValid,
    isWeightValid,
    isHypoallergenicValid,
    isBioValid,
  ]);
  const formData = new FormData();
  useEffect(() => {
    formData.append("image", userImg);
  }, [userImg]);
  console.log("🚀 ~ userImg:", userImg);
  const profileImagePostRequest = async () => {
    try {
      console.log("formData", formData);
      const res = await axios.post(
        `https://pet-adopt-server.vercel.app/admin/uploadPetImg`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data"
          },
        }
      );
      if (res.status === 201) {
        console.log(res);
      } else {
        console.log("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPetHandler = async () => {
    const newPet = {
      petName,
      petTypeArr,
      petBreedArr,
      petColorArr,
      dietaryRestrictionArr,
      height,
      hypoallergenic,
      weight,
      petStatus,
      bio,
    };
    try {
      // const res = await axios.post(
      //   "https://pet-adopt-server.vercel.app/admin/addPet",
      //   { newPet, userEmail: email },
      //   {
      //     withCredentials: true,
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      const isPhotoAdded = await profileImagePostRequest();
      console.log("🚀 ~ isPetAdded:", isPhotoAdded);
      // if (res.status === 201) {
      //   console.log(res);
      // } else {
      //   console.log("something went wrong");
      // }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("isvalidated", isValidated);
  return (
    <div>
      <Container className="border mt-5 d-flex justify-content-center border-0">
        <Form className="d-flex justify-content-center my-5 ">
          <Card style={{ maxWidth: "30rem" }}>
            <Card.Img
              variant="top"
              src={
                userImg
                  ? fileDataURL
                  : "https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
              }
              defaultValue={
                "https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
              }
              className="border"
            />
            <div className="d-flex justify-content-center">
              <CloseButton
                aria-label="Hide"
                className={`${isUploaded === true ? "d-block" : "d-none"}`}
                onClick={() => setCloseButton(false)}
              />
            </div>

            <Form.Group
              controlId="formFileSm"
              className="mb-3 custom-file-button"
            >
              <Form.Label
                className={`input-group-text ${
                  !closeButton ? "d-block" : "d-none"
                }`}
              >
                Add pet picture
              </Form.Label>
              <Form.Control
                type="file"
                size="sm"
                className="custom-file-input d-none"
                encType="multipart/form-data"
                onChange={(e) => imageChangeHandler(e)}
              />
            </Form.Group>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className=" text-nowrap">
                    <div className="d-flex justify-content-between">
                      <b className="me-1">Pet name</b>
                      <div>
                        <Form.Control
                          size="sm"
                          type="text"
                          onInput={(e) => setPetName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex ">
                  <div>
                    <b className="ms-1">Status</b>
                  </div>
                  <div>
                    <Form.Select
                      size="sm"
                      className="mx-1"
                      onChange={(e) => {
                        setPetStatus(e.target.value);
                      }}
                    >
                      <option value=""></option>
                      <option className="" value="available">
                        Available
                      </option>
                      <option className="" value="fostered">
                        Fostered
                      </option>
                      <option className="" value="adopted">
                        Adopted
                      </option>
                    </Form.Select>
                  </div>
                </div>
              </div>
              <Row xs={2}>
                <Col>
                  <ListGroup className="list-group-flush d-flex flex-row my-2">
                    <ListGroup.Item className="px-0 border-0 ">
                      <div className="d-flex ">
                        <div>
                          <b>Type</b>
                        </div>
                        <div className={newPetTypeMode ? "d-flex" : "d-none"}>
                          <div>
                            <Form.Control
                              size="sm"
                              type="text"
                              onInput={(e) => setNewPetType(e.target.value)}
                            />
                          </div>
                          <div>
                            <Badge
                              onClick={addPetTypeHandler}
                              bg="primary text-light rounded-pill mx-2"
                            >
                              <b> &#65291;</b>
                            </Badge>
                          </div>
                        </div>
                        <div className={newPetTypeMode ? "d-none" : "d-block"}>
                          <Form.Select
                            value={petType}
                            size="sm"
                            className="mx-1"
                            onChange={(e) => {
                              setPetType(e.target.value);
                            }}
                          >
                            <option value=""></option>
                            {Array.from({ length: petTypeArr.length }).map(
                              (_, idx) => (
                                <option key={idx} value={petTypeArr[idx]}>
                                  {petTypeArr[idx]}
                                </option>
                              )
                            )}
                            <option className="text-primary" value="new">
                              &#65291; New
                            </option>
                          </Form.Select>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup className="list-group-flush d-flex flex-row justify-content-end my-2 pe-0">
                    <ListGroup.Item className="px-0 border-0 ">
                      <div className="d-flex">
                        <div>
                          <b>Breed</b>
                        </div>
                        <div className={newPetBreedMode ? "d-flex" : "d-none"}>
                          <div className="ms-1">
                            <Form.Control
                              size="sm"
                              type="text"
                              onInput={(e) => setNewPetBreed(e.target.value)}
                            />
                          </div>
                          <div>
                            <Badge
                              onClick={addPetBreedHandler}
                              bg="primary text-light rounded-pill mx-2"
                            >
                              <b> &#65291;</b>
                            </Badge>
                          </div>
                        </div>
                        <div className={newPetBreedMode ? "d-none" : "d-block"}>
                          <Form.Select
                            value={petBreed}
                            size="sm"
                            className="mx-1"
                            onChange={(e) => {
                              setPetBreed(e.target.value);
                            }}
                          >
                            <option value=""></option>
                            {Array.from({ length: petBreedArr.length }).map(
                              (_, idx) => (
                                <option key={idx} value={petBreedArr[idx]}>
                                  {petBreedArr[idx]}
                                </option>
                              )
                            )}
                            <option className="text-primary" value="new">
                              &#65291; New
                            </option>
                          </Form.Select>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row xs={2}>
                <Col>
                  <div className="d-flex justify-content-between">
                    <ListGroup className="list-group-flush d-flex flex-row">
                      <ListGroup.Item className="px-0 border-0 ">
                        <div className="d-flex">
                          <div>
                            <b>Color</b>
                          </div>
                          <div
                            className={newPetColorMode ? "d-flex" : "d-none"}
                          >
                            <div className="ms-1">
                              <Form.Control
                                size="sm"
                                type="text"
                                onInput={(e) => setNewPetColor(e.target.value)}
                              />
                            </div>
                            <div>
                              <Badge
                                onClick={addPetColorHandler}
                                bg="primary text-light rounded-pill mx-2"
                              >
                                <b> &#65291;</b>
                              </Badge>
                            </div>
                          </div>
                          <div
                            className={newPetColorMode ? "d-none" : "d-block"}
                          >
                            <Form.Select
                              value={petColor}
                              size="sm"
                              className="mx-1"
                              onChange={(e) => {
                                setPetColor(e.target.value);
                              }}
                            >
                              <option value=""></option>
                              {Array.from({ length: petColorArr.length }).map(
                                (_, idx) => (
                                  <option key={idx} value={petColorArr[idx]}>
                                    {petColorArr[idx]}
                                  </option>
                                )
                              )}
                              <option className="text-primary" value="new">
                                &#65291; New
                              </option>
                            </Form.Select>
                          </div>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Col>

                <div className="pe-1">
                  <ListGroup className="list-group-flush d-flex flex-row align-items-center ms-5">
                    <ListGroup.Item className="px-0 border-0 ">
                      <b>Height</b>
                    </ListGroup.Item>
                    <div className="mx-1">
                      <Form.Control
                        size="sm"
                        placeholder="cm"
                        type="number"
                        inputMode="numeric"
                        // className="w-50 me-0"
                        value={height}
                        onInput={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </ListGroup>
                </div>
              </Row>
              <Row>
                <Col className="pe-0">
                  <div>
                    <ListGroup className="list-group-flush d-flex flex-row align-items-center ">
                      <ListGroup.Item className="px-0 border-0 ">
                        <b>Weight</b>
                      </ListGroup.Item>
                      <div className="mx-1">
                        <Form.Control
                          value={weight}
                          size="sm"
                          placeholder="kg"
                          type="number"
                          inputMode="numeric"
                          className="w-75"
                          onInput={(e) => setWeight(e.target.value)}
                        />
                      </div>
                    </ListGroup>
                  </div>
                </Col>
                <Col className="ps-0 pe-2 ms-0 ">
                  <ListGroup className="list-group-flush d-flex flex-row my-2 justify-content-end">
                    <ListGroup.Item className="px-0 border-0 mx-0 py-0">
                      <b className="">Hypoallergenic</b>
                    </ListGroup.Item>
                    <Form.Select
                      value={hypoallergenic}
                      size="sm"
                      className="ms-1 pe-1"
                      onChange={(e) => {
                        setHypoallergenic(e.target.value);
                      }}
                    >
                      <option value=""></option>
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </Form.Select>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ListGroup className="list-group-flush d-flex flex-row justify-content-center">
                    <ListGroup.Item className="px-0 border-0 text-wrap ">
                      <div className="d-flex">
                        <div>
                          <b className="text-nowrap">Dietary restrictions</b>
                        </div>
                        <div className="d-flex">
                          <div>
                            <div
                              className={
                                addRestrictionMode
                                  ? "d-flex ms-1 align-items-center"
                                  : "d-none"
                              }
                            >
                              <Form.Control
                                value={dietaryRestriction}
                                size="sm"
                                type="text"
                                onInput={(e) =>
                                  setDietaryRestriction(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="ms-1">
                            <Badge
                              className="btn btn-primary"
                              onClick={() =>
                                !addRestrictionMode
                                  ? setAddRestrictionMode(true)
                                  : addNewRestriction()
                              }
                            >
                              Add +
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                  <div className=" d-flex justify-content-center">
                    {Array.from({ length: dietaryRestrictionArr.length }).map(
                      (_, idx) => (
                        <Badge
                          key={idx}
                          className="rounded-pill px-3 py-2 m-1 "
                        >
                          {dietaryRestrictionArr[idx]}
                        </Badge>
                      )
                    )}
                  </div>
                </Col>
              </Row>
              <Col>
                <ListGroup className="list-group-flush d-flex flex-row my-2 justify-content-center">
                  <ListGroup.Item className="px-0 border-0 text-wrap "></ListGroup.Item>
                  <ListGroup.Item className="px-2">
                    <FloatingLabel controlId="floatingTextarea2" label="Bio">
                      <Form.Control
                        as="textarea"
                        style={{
                          height: "100px",
                          width: "350px",
                          resize: "none",
                        }}
                        onInput={(e) => {
                          setBio(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <div className="d-flex justify-content-end">
                <Button
                  variant={isValidated ? "success rounded-pill" : "danger"}
                  onClick={isValidated ? addPetHandler : null}
                >
                  Add pet
                </Button>
                {/* <Button variant="dark rounded-pill">Adopt me!</Button>
            <Button variant="primary rounded-pill">Return me!</Button> */}
                {/* {<Button>Save to wishlist</Button>} */}
                {/* {<Button>Remove from wishlist</Button>} */}
                {/* <Button>Edit</Button> FOR ADMIN   */}
              </div>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </div>
  );
}

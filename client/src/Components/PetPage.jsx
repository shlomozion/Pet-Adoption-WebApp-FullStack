import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useEffect, useState } from "react";
import { UserContextInstance } from "../Context/UserContext";
// import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import { PetContextInstance } from "../Context/petContext";

export default function PetPage() {
  const { userPetArr } = useContext(UserContextInstance);
  const { petArr } = useContext(PetContextInstance);
  console.log("🚀 ~ petArr:", petArr);
  const [selectedPet, setSelectedPet] = useState({});

  const { id } = useParams();
  console.log("🚀 ~  id:", id);

  useEffect(() => {
    let [filteredPet] = petArr.filter((pet) => pet.petId !== id);
    setSelectedPet(filteredPet);
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ maxWidth: "30rem", maxHeight: "15rem" }}>
        <Card.Img variant="top" src={selectedPet.picture} />
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h2>Pet Name:</h2>
              <div className="ms-2 d-flex align-items-center">
                {selectedPet.name}
              </div>
            </div>
            <div className="d-flex">
              <h4>Status:</h4>
              <p className="text-success ms-2  d-flex align-items-center">
                {selectedPet.adoptionStatus}
              </p>
              {/* {"or Fostered or Adopted"} */}
            </div>
          </div>
          <Row xs={3}>
            <Col>
              <ListGroup className="list-group-flush d-flex flex-row my-2">
                <ListGroup.Item className="px-0 border-0 ">
                  <b>Type:</b>
                </ListGroup.Item>
                <ListGroup.Item className="px-2">
                  {selectedPet.type}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup className="list-group-flush d-flex flex-row my-2">
                <ListGroup.Item className="px-0 border-0 ">
                  <b>Breed:</b>
                </ListGroup.Item>
                <ListGroup.Item className="px-2">
                  {selectedPet.breed}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup className="list-group-flush d-flex flex-row my-2">
                <ListGroup.Item className="px-0 border-0 ">
                  <b>Color:</b>
                </ListGroup.Item>
                <ListGroup.Item className="px-2">
                  {selectedPet.color}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row xs={3}>
            <Col>
              <ListGroup className="list-group-flush d-flex flex-row my-2">
                <ListGroup.Item className="px-0 border-0 ">
                  <b>Height:</b>
                </ListGroup.Item>
                <ListGroup.Item className="px-2">
                  {selectedPet.height}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup className="list-group-flush d-flex flex-row my-2">
                <ListGroup.Item className="px-0 border-0 ">
                  <b>Weight:</b>
                </ListGroup.Item>
                <ListGroup.Item className="px-2">
                  {selectedPet.weight}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup className="list-group-flush d-flex flex-row my-2 flex-wrap">
                <ListGroup.Item className="px-0 border-0 ">
                  <b>Hypoallergenic:</b>
                </ListGroup.Item>
                <ListGroup.Item className="px-2">
                  {selectedPet.hypoallergenic === 0 ? "No" : "Yes"}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Col>
            <ListGroup className="list-group-flush d-flex flex-row my-2">
              <ListGroup.Item className="px-0 border-0 text-wrap ">
                <b>Dietary restrictions:</b>
              </ListGroup.Item>
              <ListGroup.Item className="px-2">
                {selectedPet.dietary === null ? "none" : selectedPet.dietary}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup className="list-group-flush d-flex flex-row my-2">
              <ListGroup.Item className="px-0 border-0 text-wrap ">
                <b>Bio:</b>
              </ListGroup.Item>
              <ListGroup.Item className="px-2">
                {selectedPet.bio}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          {/* <div className="d-flex justify-content-end"> */}
          {/* <Button
                variant="warning rounded-pill"
                // className={selectedPet.status === ""? '' selectedPet.status === ''}
              >
                Foster me!
              </Button> */}
          {/* <Button variant="dark rounded-pill">Adopt me!</Button> */}
          <div className="d-flex justify-content-end">
            {selectedPet.status === "Adopted" ? (
              <Button variant="danger rounded">Return me</Button>
            ) : selectedPet.status === "Fostered" ? (
              <div className="d-flex">
                <Button variant="danger mx-1 ">Return me</Button>
                <Button variant="success mx-1">Adopt me!</Button>
              </div>
            ) : null}
          </div>

          {/* {<Button>Save to wishlist</Button>} */}
          {/* {<Button>Remove from wishlist</Button>} */}
          {/* <Button>Edit</Button> FOR ADMIN   */}
          {/* </div> */}
        </Card.Body>
      </Card>
    </div>
  );
}

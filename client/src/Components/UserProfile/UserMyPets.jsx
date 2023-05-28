import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { useContext } from "react";
import { UserContextInstance } from "../../Context/UserContext";
import { useNavigate, NavLink } from "react-router-dom";

const UserMyPets = () => {
  const navigate = useNavigate();
  const { userPetArr } = useContext(UserContextInstance);

  return (
    <div>
      <Alert
        variant="light"
        className={
          !userPetArr.length
            ? "d-flex flex-column align-items-center my-5"
            : "d-none"
        }
      >
        You currently do not own or foster any pets.
        <br />
        <NavLink to="/browsePets" className="links mx-2">
          Browse Pets
        </NavLink>
      </Alert>
      <Container fluid="lg" className={`d-flex flex-column mb-5`}>
        <Row xs={1} md={2} className="g-4">
          {Array.from({
            length: userPetArr.length,
          }).map((_, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img
                  variant="top"
                  src={userPetArr[idx].img}
                  height={"400"}
                />
                <Card.Body>
                  <Container fluid="lg" className="px-0 ">
                    <Card.Title>
                      <b>{userPetArr[idx].name}</b>
                    </Card.Title>
                    <ListGroup className="list-group-flush  d-flex flex-row my-2">
                      <ListGroup.Item className="px-0 border-0">
                        <b>status:</b>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-2">
                        {userPetArr[idx].status}
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="light rounded-pill"
                        onClick={() =>
                          navigate(`/petPage/${userPetArr[idx].petId}`)
                        }
                      >
                        See more
                      </Button>
                    </div>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default UserMyPets;

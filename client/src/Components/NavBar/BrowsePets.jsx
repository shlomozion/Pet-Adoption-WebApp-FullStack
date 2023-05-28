import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { AuthContextInstance } from "../../Context/AuthContext";
import { PetContextInstance } from "../../Context/petContext";
import { UserContextInstance } from "../../Context/UserContext";

export default function AllPets() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContextInstance);
  const { petArr } = useContext(PetContextInstance);
  const { userPetArr } = useContext(UserContextInstance);
  const [searchResults, setSearchResults] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [savedPetsMode, setSavedPetsMode] = useState(false);
  const [savedPetResults, setSavedPetsResults] = useState(true);
  const [advancedSearchMode, setAdvancedSearchMode] = useState(false);
  console.log("advanced search mode", advancedSearchMode);
  console.log("saved pets mode", savedPetsMode);
  console.log("saved pets results", savedPetResults);

  // console.log("search mode", searchMode);

  // console.log("search results", searchResults);

  // useEffect(() => {
  //   if (searchResults.length) {
  //     setSearchMode(true);
  //     return;
  //   }
  // }, [searchResults]);

  // const searchHandler = (e) => {
  //   let input = e.target.value;
  //   const searchResults = petArr.filter(
  //     (item) =>
  //       item.type.charAt(input.length - 1) === input.charAt(input.length - 1)
  //   );
  //   console.log("found", searchResults);

  //   setSearchResults(searchResults);
  // };

  return (
    <div>
      <Button
        onClick={() =>
          savedPetResults
            ? setSavedPetsResults(false)
            : setSavedPetsResults(true)
        }
      >
        click
      </Button>
      <Container className="my-4">
        <Form className="d-flex mx-2">
          <Form.Control
            type="search"
            placeholder="Search pets"
            className="me-2 rounded-pill"
            aria-label="Search"
            // onInput={(e) => searchHandler(e)}
          />

          <div className="d-flex flex-column">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Advanced search"
              className="text-nowrap"
              onClick={() =>
                !advancedSearchMode
                  ? setAdvancedSearchMode(true)
                  : setAdvancedSearchMode(false)
              }
            />
            <Form.Check
              className={!isLoggedIn ? "d-none" : "d-block"}
              type="checkbox"
              label="Saved Pets"
              onClick={() =>
                !savedPetsMode
                  ? setSavedPetsMode(true)
                  : setSavedPetsMode(false)
              }
            />
          </div>
        </Form>
      </Container>
      <Alert
        variant="light"
        className={
          savedPetsMode && !userPetArr.length
            ? "d-flex flex-column align-items-center my-5"
            : "d-none"
        }
      >
        You currently do not own or foster any pets.
        <br />
        <Alert.Link href="#">Browse Pets</Alert.Link>
      </Alert>
      <Container
        fluid="lg"
        className={`d-flex flex-column mb-5 ${
          !savedPetResults ? "d-none" : "d-block"
        }`}
      >
        <Row xs={1} md={2} className="g-4">
          {Array.from({
            length: !savedPetsMode ? petArr.length : userPetArr.length,
          }).map((_, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    searchMode === true
                      ? searchResults[idx].picture
                      : petArr[idx].picture
                  }
                  height={"400"}
                />
                <Card.Body>
                  <Container fluid="lg" className="px-0 ">
                    <Card.Title>
                      <b>
                        {searchMode === true
                          ? searchResults[idx].name
                          : petArr[idx].name}
                      </b>
                    </Card.Title>
                    <ListGroup className="list-group-flush  d-flex flex-row my-2">
                      <ListGroup.Item className="px-0 border-0">
                        <b>status:</b>
                      </ListGroup.Item>
                      <ListGroup.Item
                        className={
                          petArr[idx].adoptionStatus === "available"
                            ? "text-success px-1"
                            : null
                        }
                      >
                        {searchMode === true
                          ? searchResults[idx].adoptionStatus
                          : petArr[idx].adoptionStatus}
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="light rounded-pill"
                        onClick={() =>
                          navigate(`/petPage/${petArr[idx].petId}`)
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
}

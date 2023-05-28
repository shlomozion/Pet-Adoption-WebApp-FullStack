import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

export default function AdminPetList() {
  const [isPetList, setIsPetList] = useState(true);
  const [searchResults, setSearchResults] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    if (searchResults.length) {
      setSearchMode(true);
      return;
    }
  }, [searchResults]);
  const searchHandler = (e) => {
    const results = Array.from(petList).filter(
      (item) =>
        item.type.charAt(e.target.value.length - 1) ===
        e.target.value.charAt(e.target.value.length - 1)
    );
    setSearchResults(results);

    results.map((item) => console.log(item));
  };
  let eventKey = 0;
  const petList = [];
  return (
    <div>
      <Container className="border">
        <Container className="h5 d-flex justify-content-center my-3">
          Pet List
        </Container>
        <Form className="d-flex mx-3 my-3">
          <Form.Control
            type="search"
            placeholder="Search By Email"
            className="me-2 rounded-pill"
            aria-label="Search"
            onInput={(e) => searchHandler(e)}
          />
        </Form>
        <Accordion defaultActiveKey="1" className="mb-3">
          {Array.from({
            length: searchMode
              ? searchResults.length
              : isPetList && petList.length,
          }).map((_, idx) => (
            <Accordion.Item
              eventKey={String(eventKey++)}
              key={String(eventKey++)}
            >
              <Accordion.Header className="p-0">
                <div className="d-flex justify-content-between w-100">
                  <div>{petList[idx].name}</div>
                  <div className="me-2"> {petList[idx].status}</div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Container>
                  <Row xs={1} md={2} className="d-flex justify-content-center">
                    <Col>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={petList[idx].img}
                          height={"400"}
                          width={"200"}
                        />
                        <Card.Body>
                          <Container fluid="lg" className="px-0 ">
                            <div className="d-flex justify-content-end">
                              <Button variant="light rounded-pill">
                                See more
                              </Button>
                            </div>
                          </Container>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}

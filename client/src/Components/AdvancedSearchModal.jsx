import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";

export default function AdvancedSearchModal() {
  const [show, setShow] = useState(false);
  const [searchFilter, setSearchFilter] = useState([
    "Height",
    "Name",
    "Status",
    "Weight",
    "Type",
    "Gender",
  ]);
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        backdropClassName="remove"
      >
        <Modal.Header className="bg-light border-0 p-2 "></Modal.Header>
        <Modal.Body className="show-grid bg-light">
          <Container>
            <Row>
              <Col xs={12} md={2}>
                <Form.Control
                  type="search"
                  placeholder="Search by"
                  className="me-2 rounded-pill"
                  aria-label="Search"
                  //   onInput={(e) => searchHandler(e)}
                />
              </Col>
            </Row>
          </Container>
          <Container>
            <div className="border my-3">
              {searchFilter.map((item) => (
                <Button
                  key={item}
                  className="rounded-pill m-1 py-1 pt-0"
                  variant="secondary"
                >
                  {item} <span className="h4">&times;</span>
                </Button>
              ))}
            </div>
          </Container>
          <Container>
            <Row xs={3} className="py-3">
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Status"

                  //   onClick={() =>
                  //     !savedPetsMode
                  //       ? setSavedPetsMode(true)
                  //       : setSavedPetsMode(false)
                  //   }
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Type"

                  //   onClick={() =>
                  //     !savedPetsMode
                  //       ? setSavedPetsMode(true)
                  //       : setSavedPetsMode(false)
                  //   }
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Gender"

                  //   onClick={() =>
                  //     !savedPetsMode
                  //       ? setSavedPetsMode(true)
                  //       : setSavedPetsMode(false)
                  //   }
                />
              </Col>
            </Row>
            <Row xs={3}>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Name"

                  //   onClick={() =>
                  //     !savedPetsMode
                  //       ? setSavedPetsMode(true)
                  //       : setSavedPetsMode(false)
                  //   }
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Height"

                  //   onClick={() =>
                  //     !savedPetsMode
                  //       ? setSavedPetsMode(true)
                  //       : setSavedPetsMode(false)
                  //   }
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Weight"

                  //   onClick={() =>
                  //     !savedPetsMode
                  //       ? setSavedPetsMode(true)
                  //       : setSavedPetsMode(false)
                  //   }
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Button onClick={() => setShow(true)}>click</Button>
    </div>
  );
}

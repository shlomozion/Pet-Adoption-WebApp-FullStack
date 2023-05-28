import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

export default function AdminUserList() {
  const userList = [
    {
      name: "sam",
      email: "jordan20zion@gmail.com",
    },
    {
      name: "dan",
      email: "jordan201@gmail.com",
    },
    {
      name: "jil",
      email: "jordan2012@gmail.com",
    },
    {
      name: "max",
      email: "jordan20123@gmail.com",
    },
  ];

  const [isUserList, setIsUserList] = useState(true);
  const [searchResults, setSearchResults] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  // console.log("searchMode", searchMode);

  const searchHandler = (e) => {
    const results = Array.from(userList).filter((item) =>
      isUserList
        ? item.email.charAt(e.target.value.length - 1) ===
          e.target.value.charAt(e.target.value.length - 1)
        : item.type.charAt(e.target.value.length - 1) ===
          e.target.value.charAt(e.target.value.length - 1)
    );
    setSearchResults(results);

    results.map((item) => console.log(item));
  };
  useEffect(() => {
    if (searchResults.length) {
      // console.log("hi");
      setSearchMode(true);
      return;
    }
  }, [searchResults]);
  let eventKey = 0;

  return (
    <div>
      <Container className="border">
        <Container className="h5 d-flex justify-content-center my-3">
          User List
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
              : isUserList && userList.length,
          }).map((_, idx) => (
            <Accordion.Item
              eventKey={String(eventKey++)}
              key={String(eventKey++)}
            >
              <Accordion.Header className="p-0">
                {userList[idx].name}
              </Accordion.Header>
              <Accordion.Body>
                <Table striped responsive bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Owner</th>
                      <th>Admin</th>
                      <th>another</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Molly jeff mell rell jhon elton</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}

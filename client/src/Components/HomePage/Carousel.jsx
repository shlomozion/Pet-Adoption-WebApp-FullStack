import Carousel from "react-bootstrap/Carousel";
import { useContext } from "react";
import { PetContextInstance } from "../../Context/petContext";
import Container from "react-bootstrap/esm/Container";

function Carousels() {
  const { petArr } = useContext(PetContextInstance);
  return (
    <div>
      <Container>
        <Carousel variant="dark">
          {Array.from({ length: petArr.length }).map((_, idx) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={petArr[idx].picture}
                alt="First slide"
              />

              <Carousel.Caption>
                <h3>{petArr[idx].name}</h3>
                <p className="bg-light bg-opacity-50">{petArr[idx].bio}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}

export default Carousels;

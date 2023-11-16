import { Carousel, Image } from "react-bootstrap";

function Slider() {
  return (
    <Carousel data-bs-theme="dark" style={{ width: "80rem", height: "30rem" }}>
      <Carousel.Item>
        <Image src=""></Image>
        <Carousel.Caption>
          <h3>First Slide</h3>
          <p>lorem lorem lorem lorem</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src=""></Image>
        <Carousel.Caption>
          <h3>Second Slide</h3>
          <p>lorem lorem lorem lorem</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src=""></Image>
        <Carousel.Caption>
          <h3>Third Slide</h3>
          <p>lorem lorem lorem lorem</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default Slider;

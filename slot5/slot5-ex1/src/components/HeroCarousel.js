// components/HeroCarousel.js
import { Carousel } from "react-bootstrap";

export default function HeroCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/mediterranean-chickpea-salad.jpg"
          alt="First slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Delicious Healthy Recipes</h3>
          <p>Discover our collection of nutritious meals</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/one-pan-lemon-garlic-salmon.jpg"
          alt="Second slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Quick & Easy Meals</h3>
          <p>Perfect for busy weeknights</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/quinoa-veggie-power-bowl.jpg"
          alt="Third slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Plant-Based Options</h3>
          <p>Healthy vegetarian and vegan recipes</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
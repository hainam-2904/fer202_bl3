import { Container } from "react-bootstrap";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <div className="py-5 bg-light border-bottom">
      <Container className="text-center" style={{ maxWidth: 880 }}>
        <HeroCarousel />
        <h1 className="fw-bold mb-3">Explore our simple, healthy recipes</h1>
        <p className="text-muted mb-0">
          Discover eight quick, whole-food dishes that fit real-life schedules and
          taste amazing. Use the search bar to find a recipe by name or ingredient,
          or simply scroll the list and let something delicious catch your eye.
        </p>
      </Container>
    </div>
  );
}
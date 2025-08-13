import { Container, Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes = [] }) {
  return (
    <Container className="pb-5">
      <Row className="g-4">
        {recipes.map((r) => (
          <Col key={r.title} xs={12} sm={6} md={4}>
            <RecipeCard recipe={r} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

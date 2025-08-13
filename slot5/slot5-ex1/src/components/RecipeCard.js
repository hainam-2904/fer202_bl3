import { Card, Button, ListGroup, Modal } from "react-bootstrap";
import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={recipe.image}
          alt={recipe.title}
          style={{ objectFit: "cover", height: 200 }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-semibold">{recipe.title}</Card.Title>
          <Card.Text className="text-muted small flex-grow-1">
            {recipe.description}
          </Card.Text>
          <ListGroup variant="flush" className="mb-3 small">
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Servings</span>
              <span>{recipe.servings}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Prep</span>
              <span>{recipe.prep} mins</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Cook</span>
              <span>{recipe.cook} mins</span>
            </ListGroup.Item>
          </ListGroup>
          <Button variant="success" onClick={() => setShow(true)}>
            View Recipe
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{recipe.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">{recipe.description}</p>
          <ul className="mb-0">
            <li>Servings: {recipe.servings}</li>
            <li>Prep time: {recipe.prep} mins</li>
            <li>Cook time: {recipe.cook} mins</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={() => alert("Added to cart!")}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
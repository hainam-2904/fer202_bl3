import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm border-0 sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo192.png"
            alt="Healthy Recipe Finder"
            width={30}
            height={30}
            className="me-2"
          />
          Healthy Recipe Finder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/recipe-request-form">Recipe Request Form</Nav.Link>
          </Nav>
          <Button as={Link} to="/recipes" variant="success">Browse recipes</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
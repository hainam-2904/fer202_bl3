import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function AppNavbar() {
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      className="custom-navbar shadow-sm sticky-top py-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          <img
            src="/logo192.png"
            alt="Movie Explorer"
            width={35}
            height={35}
            className="me-2 rounded"
          />
          Movie Explorer
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" className="bg-light" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-4">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "nav-active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favourites"
              className={location.pathname === "/favourites" ? "nav-active" : ""}
            >
              Favourites
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/request"
              className={location.pathname === "/request" ? "nav-active" : ""}
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

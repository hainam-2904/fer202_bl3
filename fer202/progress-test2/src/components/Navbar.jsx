import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Mobile Shop
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link onClick={() => alert("Go to Favourites")}>
            <FaHeart /> Favourites
          </Nav.Link>
          <Nav.Link onClick={() => alert("Go to Cart")}>
            <FaShoppingCart /> Cart
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/login")}>
            <FaUser /> Login
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;

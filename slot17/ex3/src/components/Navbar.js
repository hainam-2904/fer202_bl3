import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const AppNavbar = () => {
  const { cartItems } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <Navbar
      bg={theme === "dark" ? "dark" : "light"}
      variant={theme === "dark" ? "dark" : "light"}
      expand="lg"
      className="border-bottom"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">🍽️ Food Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-2">
            <Nav.Link as={Link} to="/cart">
              Cart <Badge bg="secondary">{cartItems.length}</Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/favourites">
              Favourites <Badge bg="danger">{favourites.length}</Badge>
            </Nav.Link>

            {/* Dropdown Account */}
            <NavDropdown title="👤 Account" id="basic-nav-dropdown" align="end">
              {user ? (
                <>
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/checkout">Checkout</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            {/* Toggle theme */}
            <Button
              size="sm"
              variant={theme === "dark" ? "light" : "dark"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

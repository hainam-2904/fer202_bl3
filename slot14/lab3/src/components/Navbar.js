import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileWizard from "../components/ProfileWizard";

export default function AppNavbar() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand as={Link} to="/students">
          Student Management
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/students">Students</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link onClick={() => setShowWizard(true)}>
              Build your Profile
            </Nav.Link>
          </Nav>

          {/* 🔍 Quick Search box chỉ để đẹp */}
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Quick search..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <ProfileWizard show={showWizard} handleClose={() => setShowWizard(false)} />
    </>
  );
}

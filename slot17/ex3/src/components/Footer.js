import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light border-top mt-5">
      <Container className="py-3 text-center text-muted small">
        <p className="mb-1">
          © {new Date().getFullYear()} 🍽️ Food Shop. All rights reserved.
        </p>
        <p className="mb-0">
          Made with ❤️ by <span className="fw-semibold">FPT</span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

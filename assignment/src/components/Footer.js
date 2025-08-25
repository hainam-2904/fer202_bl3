import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const footerClass = theme === "dark" ? "bg-dark border-top mt-5" : "bg-light border-top mt-5";
  const containerClass = theme === "dark" ? "py-3 text-center text-white-50 small" : "py-3 text-center text-muted small";

  return (
    <footer className={footerClass}>
      <Container className={containerClass}>
        <p className="mb-1">© {new Date().getFullYear()} Phone Shop. All rights reserved.</p>
        <p className="mb-0">
          Made with ❤️ by <span className="fw-semibold">FPT</span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

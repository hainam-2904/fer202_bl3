import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ToastContext } from "../context/ToastContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    } else {
      showToast("Invalid credentials", "danger");
    }
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f0f2f5" }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{ width: "100%", maxWidth: 420, borderRadius: "12px" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#343a40" }}>
          Welcome Back
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "8px", padding: "10px" }}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="loginPassword">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "8px", padding: "10px" }}
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 mb-3"
            style={{
              background: "linear-gradient(90deg, #4b6cb7, #182848)",
              border: "none",
              padding: "10px",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Đăng nhập
          </Button>

          <Link to="/register">
            <Button
              variant="outline-primary"
              className="w-100"
              style={{
                borderRadius: "8px",
                padding: "10px",
                fontWeight: "600",
              }}
            >
              Đăng ký
            </Button>
          </Link>
        </Form>
      </Card>
    </section>
  );
};

export default Login;

import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Authcontext";
import { ToastContext } from "../contexts/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);

  const validatePassword = (pass) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
    return regex.test(pass);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Password must be >6 characters, contain at least 1 uppercase letter and 1 special character."
      );
      return;
    }

    try {
      const { data } = await api.get("/accounts");
      const user = data.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (!user) {
        setError("Invalid email or password");
        return;
      }
      if (!user.isActive) {
        setError("Your account is not active");
        return;
      }

      login(user);
      addToast("Login successful!", "success");
      navigate("/products");
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="page-center">
      <Card className="p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

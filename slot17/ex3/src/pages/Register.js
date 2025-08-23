import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password không khớp!");
      return;
    } else if  (users.find((u) => u.username === form.username)) {
      alert("Username đã tồn tại!");
      return;
    } else navigate("/login");

    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Register thành công!");
  };

  return (
    <section className="container my-4" style={{ maxWidth: 500 }}>
      <Card className="p-3 shadow-sm">
        <h3 className="mb-3">Register Account</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </section>
  );
};

export default Register;

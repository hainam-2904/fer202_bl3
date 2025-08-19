import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function AboutForm({ data, onChange, onFileChange }) {
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    email: "",
  });

  useEffect(() => {
    const newErrors = { name: "", age: "", email: "" };

    // Name
    if (!data.name) {
      newErrors.name = "Name is required";
    } else if (data.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Age
    if (!data.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(data.age) || Number(data.age) <= 0 || Number(data.age) < 12) {
      newErrors.age = "Age must be a >0 and 12+";
    }

    // Email
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
  }, [data]);

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" onChange={(e) => onFileChange(e.target.files[0])} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={data.name}
          onChange={(e) => onChange("about", "name", e.target.value)}
          isInvalid={!!errors.name}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          value={data.age}
          onChange={(e) => onChange("about", "age", e.target.value)}
          isInvalid={!!errors.age}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={data.email}
          onChange={(e) => onChange("about", "email", e.target.value)}
          isInvalid={!!errors.email}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

AboutForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default AboutForm;

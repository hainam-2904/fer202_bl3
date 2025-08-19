import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

function AccountForm({ data, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    question: "",
    answer: "",
  });

  useEffect(() => {
    const newErrors = { username: "", password: "", confirmPassword: "", question: "", answer: "" };

    // Username
    if (!data.username) {
      newErrors.username = "Username is required";
    } else if (data.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    }

    // Password 
    // Password
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(data.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, number, and special char";
    }


    // Confirm password
    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Question
    if (!data.question) {
      newErrors.question = "Please select a secret question";
    }

    // Answer
    if (!data.answer) {
      newErrors.answer = "Answer is required";
    }

    setErrors(newErrors);
  }, [data]);

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={data.username}
          onChange={(e) => onChange("account", "username", e.target.value)}
          isInvalid={!!errors.username}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => onChange("account", "password", e.target.value)}
            isInvalid={!!errors.password}
            required
          />
          <InputGroup.Text
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={data.confirmPassword}
          onChange={(e) => onChange("account", "confirmPassword", e.target.value)}
          isInvalid={!!errors.confirmPassword}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Select
          value={data.question}
          onChange={(e) => onChange("account", "question", e.target.value)}
          isInvalid={!!errors.question}
          required
        >
          <option value="">Select a question...</option>
          <option>What is your first pet’s name?</option>
          <option>What is your mother’s maiden name?</option>
          <option>In which city were you born?</option>
          <option>Who was your favorite teacher?</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.question}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={data.answer}
          onChange={(e) => onChange("account", "answer", e.target.value)}
          isInvalid={!!errors.answer}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

AccountForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AccountForm;

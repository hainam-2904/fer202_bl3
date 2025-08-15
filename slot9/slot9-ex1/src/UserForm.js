// src/components/UserForm.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Alert } from "react-bootstrap";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name) {
      newErrors.name = "Tên không được để trống!";
    } else if (formData.name.length < 3 || formData.name.length > 50) {
      newErrors.name = "Tên phải từ 3 đến 50 kí tự!";
    }

    // Validate age
    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100!";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ!";
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10-15 chữ số!";
    }

    // Validate agree
    if (!formData.agree) {
      newErrors.agree = "Bạn phải đồng ý với điều khoản!";
    }

    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Container>
      <h3>Form Đăng Ký</h3>

      {showAlert && (
        <Alert variant="danger">Vui lòng sửa các lỗi bên dưới!</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group>
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Age */}
        <Form.Group>
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group>
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Agree */}
        <Form.Group>
          <Form.Check
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            label="Tôi đồng ý với điều khoản"
            isInvalid={!!errors.agree}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Đăng ký
        </Button>
      </Form>
    </Container>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default UserForm;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Toast, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileForm = ({ defaultName = "", defaultEmail = "", defaultAge = "" }) => {
  const [formData, setFormData] = useState({
    name: defaultName,
    email: defaultEmail,
    age: defaultAge
  });

  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, age } = formData;
    return (
      name.trim() !== "" &&
      email.includes("@") &&
      Number(age) >= 1
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() && validateForm()) {
      setShowModal(true);
      setShowToast(true);
    }

    setValidated(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light">
      {/* Toast thông báo */}
      <Toast 
        onClose={() => setShowToast(false)} 
        show={showToast} 
        delay={3000} 
        autohide
        className="position-fixed top-0 end-0 m-3"
        bg="success"
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Thành công</strong>
        </Toast.Header>
        <Toast.Body className="text-white">Thông tin đã được lưu!</Toast.Body>
      </Toast>

      {/* Form đăng ký */}
      <Card className="shadow-sm border-0" style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">I love react</h3>
          </div>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ tên đầy đủ"
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập họ tên
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
              <Form.Control.Feedback type="invalid">
                Email không hợp lệ
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tuổi</Form.Label>
              <Form.Control
                required
                type="number"
                min="1"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Nhập tuổi"
              />
              <Form.Control.Feedback type="invalid">
                Tuổi phải lớn hơn 0
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2 fw-bold"
            >
              ĐĂNG KÝ NGAY
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal hiển thị thông tin */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>THÔNG TIN CỦA BẠN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <div 
              className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
              style={{ width: "80px", height: "80px" }}
            >
              <span className="text-white fs-3">{formData.name.charAt(0).toUpperCase()}</span>
            </div>
            <h4 className="mt-3">{formData.name}</h4>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <span className="fw-bold">Email:</span>
              <span>{formData.email}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="fw-bold">Tuổi:</span>
              <span>{formData.age}</span>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ProfileForm.propTypes = {
  defaultName: PropTypes.string,
  defaultEmail: PropTypes.string,
  defaultAge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProfileForm;
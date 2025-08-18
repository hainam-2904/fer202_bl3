import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Toast, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileForm = ({ defaultName = "", defaultEmail = "", defaultAge = "" }) => {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [age, setAge] = useState(defaultAge);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate cơ bản -> báo lỗi bằng alert
    if (!name.trim()) {
      alert("⚠️ Vui lòng nhập họ tên!");
      return;
    }
    if (!email.includes("@")) {
      alert("⚠️ Email không hợp lệ!");
      return;
    }
    if (!age || Number(age) < 1) {
      alert("⚠️ Tuổi phải lớn hơn 0!");
      return;
    }

    // Nếu hợp lệ thì hiển thị modal + toast
    setShowModal(true);
    setShowToast(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light">
      {/* Toast thông báo thành công */}
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

      {/* Form nhập thông tin */}
      <Card className="shadow-sm border-0" style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">I love react</h3>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ tên đầy đủ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tuổi</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Nhập tuổi"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
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
              <span className="text-white fs-3">{name.charAt(0).toUpperCase()}</span>
            </div>
            <h4 className="mt-3">{name}</h4>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <span className="fw-bold">Email:</span>
              <span>{email}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="fw-bold">Tuổi:</span>
              <span>{age}</span>
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

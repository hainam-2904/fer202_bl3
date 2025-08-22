import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ show, onClose, message, bg = "success" }) => {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast onClose={onClose} show={show} delay={2000} autohide bg={bg}>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;

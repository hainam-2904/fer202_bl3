import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function StudentDetailModal({ student, onClose }) {
  return (
    <Modal show={!!student} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {student && (
          <>
            <img
              src={student.avatar || "/images/default-avatar.png"}
              alt={student.name}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
            <p><strong>ID:</strong> {student.id}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Age:</strong> {student.age}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

import React from "react";
import PropTypes from "prop-types";

export default function StudentCard({ student, onViewDetails }) {
  return (
    <div className="card shadow p-3">
      <img
        src={student.avatar}
        alt={student.name}
        className="card-img-top rounded"
        style={{
          objectFit: "contain",   // Giữ nguyên ảnh, không crop
          height: "250px",        // Cao hơn để thấy rõ mặt
          padding: "10px",        // Thêm khoảng trắng quanh ảnh
          backgroundColor: "#f8f9fa", // Nền sáng để ảnh nổi bật
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{student.name}</h5>
        <p className="card-text">
          <strong>Email:</strong> {student.email}
          <br />
          <strong>Age:</strong> {student.age}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => onViewDetails(student)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

import React from "react";
import StudentCard from "./StudentCard";

export default function StudentGrid({ students, onViewDetails }) {
  return (
    <div className="row">
      {students.map((s) => (
        <div
          className="col-lg-4 col-md-6 col-12 mb-4"
          key={s.id}
        >
          <StudentCard student={s} onViewDetails={onViewDetails} />
        </div>
      ))}
    </div>
  );
}

import React, { useState } from "react";
import StudentGrid from "../components/StudentGrid";
import StudentDetailModal from "../components/StudentDetailModal"; 
import { students } from "../components/students"; 
import SortDropdown from "../components/SortDropdown";
import { Button } from "react-bootstrap";

export default function StudentsPage() {
  const [sortOption, setSortOption] = useState("name-asc");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyWithAvatar, setOnlyWithAvatar] = useState(false); // ✅ state lọc avatar

  // Lọc theo avatar
  let filteredData = [...students];
  if (onlyWithAvatar) {
    filteredData = filteredData.filter((s) => s.avatar && s.avatar.trim() !== "");
  }

  // Lọc theo search
  filteredData = filteredData.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  const sortedData = filteredData.sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "age-asc") return a.age - b.age;
    if (sortOption === "age-desc") return b.age - a.age;
    return 0;
  });

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Students List</h2>

      {/* Thanh điều khiển */}
      <div className="d-flex align-items-center mb-3 gap-2">
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />

        <input
          type="text"
          placeholder="Search by name"
          className="form-control w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          variant={onlyWithAvatar ? "success" : "outline-secondary"}
          onClick={() => setOnlyWithAvatar(!onlyWithAvatar)}
        >
          Has Avatar
        </Button>
      </div>

      {/* Grid danh sách */}
      <StudentGrid students={sortedData} onViewDetails={handleViewDetails} />

      {/* Modal hiển thị chi tiết */}
      <StudentDetailModal
        student={selectedStudent}
        onClose={handleCloseModal}
      />
    </div>
  );
}

import React from "react";
import { Dropdown } from "react-bootstrap";

export default function SortDropdown({ sortOption, setSortOption }) {
  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle variant="secondary">Sort</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSortOption("age-asc")}>Age ↑</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("age-desc")}>Age ↓</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("name-asc")}>Name A → Z</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("name-desc")}>Name Z → A</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

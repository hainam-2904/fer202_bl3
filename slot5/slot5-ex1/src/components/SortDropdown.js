// components/SortDropdown.js
import { Dropdown } from "react-bootstrap";

export default function SortDropdown({ onSort }) {
  const sortOptions = [
    { label: "Name A → Z", value: "title-asc" },
    { label: "Name Z → A", value: "title-desc" },
    { label: "Prep ↑", value: "prep-asc" },
    { label: "Prep ↓", value: "prep-desc" },
    { label: "Cook ↑", value: "cook-asc" },
    { label: "Cook ↓", value: "cook-desc" },
  ];

  return (
    <Dropdown onSelect={onSort}>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort">
        Sort by
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {sortOptions.map((option) => (
          <Dropdown.Item key={option.value} eventKey={option.value}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
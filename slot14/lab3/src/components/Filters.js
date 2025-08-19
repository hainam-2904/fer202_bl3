import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function Filters({ search, setSearch, ageFilter, setAgeFilter, hasAvatar, setHasAvatar }) {
  return (
    <Form className="p-3 border rounded mb-3 bg-white">
      <Row className="mb-2">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
            <option value="">All ages</option>
            <option value="<=20">≤ 20</option>
            <option value="21-25">21 – 25</option>
            <option value=">25"> 25</option>
          </Form.Select>
        </Col>
      </Row>
      <Form.Check
        type="checkbox"
        label="Has avatar"
        checked={hasAvatar}
        onChange={(e) => setHasAvatar(e.target.checked)}
      />
    </Form>
  );
}

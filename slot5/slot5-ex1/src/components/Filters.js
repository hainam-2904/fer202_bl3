import { Row, Col, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

const TIME_OPTIONS = [
  { label: "Any", value: "" },
  { label: "5 mins", value: 5 },
  { label: "10 mins", value: 10 },
  { label: "12 mins", value: 12 },
  { label: "15 mins", value: 15 },
  { label: "20 mins", value: 20 },
  { label: "30 mins", value: 30 },
];

export default function Filters({
  maxPrep,
  setMaxPrep,
  maxCook,
  setMaxCook,
  onSearch,
}) {
  const [input, setInput] = useState("");
  const timer = useRef();

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch(input.trim()), 300);
    return () => clearTimeout(timer.current);
  }, [input, onSearch]);

  return (
    <div className="py-3">
      <Row className="g-3 align-items-center">
        <Col xs={12} md={3}>
          <Form.Select
            value={maxPrep}
            onChange={(e) => setMaxPrep(e.target.value)}
            aria-label="Max Prep Time"
          >
            {TIME_OPTIONS.map((o) => (
              <option key={`prep-${o.label}`} value={o.value}>
                Max Prep Time {o.label && `- ${o.label}`}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select
            value={maxCook}
            onChange={(e) => setMaxCook(e.target.value)}
            aria-label="Max Cook Time"
          >
            {TIME_OPTIONS.map((o) => (
              <option key={`cook-${o.label}`} value={o.value}>
                Max Cook Time {o.label && `- ${o.label}`}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={6}>
          <Form.Control
            type="search"
            placeholder="Search by name or ingredient…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
}
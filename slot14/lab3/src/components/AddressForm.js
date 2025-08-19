import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function AddressForm({ data, onChange }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={data.country}
          onChange={(e) => onChange("address", "country", e.target.value)}
          required
        >
          <option value="">Select country...</option>
          <option>Viet Nam</option>
          <option>Korea</option>
          <option>Italy</option>
          <option>Japan</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={data.city}
          onChange={(e) => onChange("address", "city", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          value={data.street}
          onChange={(e) => onChange("address", "street", e.target.value)}
          required
        />
      </Form.Group>
    </Form>
  );
}

AddressForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AddressForm;

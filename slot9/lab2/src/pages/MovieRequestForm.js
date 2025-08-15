import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function MovieRequestForm() {
  const [formData, setFormData] = useState({ title: '', genre: '', year: '', duration: '', description: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.genre) newErrors.genre = "Genre is required";
    if (!formData.year || formData.year < 1900) newErrors.year = "Year must be > 1900";
    if (!formData.duration || formData.duration <= 0) newErrors.duration = "Duration must be > 0";
    if (!formData.description || formData.description.length < 30) newErrors.description = "Description must be at least 30 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
    } else {
      setErrors({});
      setSubmitted(true);
      setFormData({ title: '', genre: '', year: '', duration: '', description: '' });
    }
  };

  return (
    <div>
      {submitted && <Alert variant="success">Request submitted. Thank you!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            isInvalid={!!errors.title}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            isInvalid={!!errors.genre}
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          />
          <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            isInvalid={!!errors.year}
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
          />
          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            isInvalid={!!errors.duration}
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          />
          <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            isInvalid={!!errors.description}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

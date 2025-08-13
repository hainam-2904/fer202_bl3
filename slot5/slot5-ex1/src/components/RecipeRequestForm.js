// components/RecipeRequestForm.js
import { Form, Button } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
export default function RecipeRequestForm() {
    return (
        <Form className="border p-4 rounded mb-4">
            <h3>Recipe Request Form</h3>
            <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
                <Form.Control.Feedback type="invalid">
                    Please enter your name
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid email
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Desired Ingredient</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="e.g., fresh salmon, organic quinoa, etc."
                />
                <Form.Control.Feedback type="invalid">
                    Please specify an ingredient
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Max Prep Time</Form.Label>
                <Form.Select>
                    <option>5 minutes</option>
                    <option>10 minutes</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit Request <Send className="ms-2" />
            </Button>
        </Form>
    );
}
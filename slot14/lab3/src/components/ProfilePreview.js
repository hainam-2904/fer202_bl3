import React from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function ProfilePreview({ show, handleClose, data }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Row>
              <Col md={4}>
                {data.avatar && (
                  <img
                    src={URL.createObjectURL(data.avatar)}
                    alt="avatar"
                    className="img-fluid rounded-circle"
                  />
                )}
              </Col>
              <Col md={8}>
                <h5>About</h5>
                <p>Name: {data.about.name}</p>
                <p>Age: {data.about.age}</p>
                <p>Email: {data.about.email}</p>

                <h5>Account</h5>
                <p>Username: {data.account.username}</p>
                <p>Secret Q: {data.account.question}</p>
                <p>Answer: {data.account.answer}</p>

                <h5>Address</h5>
                <p>Country: {data.address.country}</p>
                <p>City: {data.address.city}</p>
                <p>Street: {data.address.street}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

ProfilePreview.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ProfilePreview;

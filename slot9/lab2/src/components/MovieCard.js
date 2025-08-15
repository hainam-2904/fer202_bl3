import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Badge, Modal, ListGroup } from "react-bootstrap";

export default function MovieCard({ movie, onToggleFavourite, isFavourite }) {
  const [showModal, setShowModal] = useState(false);

  const handleFavouriteClick = () => {
    onToggleFavourite(movie.id);
  };

  return (
    <>
      <Card className="movie-card h-100 shadow-sm">
        {/* Ảnh poster */}
        <div className="card-img-container" style={{ height: "200px", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={movie.poster}
            alt={movie.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Nội dung card */}
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-semibold">
            {movie.title}
            <Badge bg="info" className="ms-2">{movie.genre}</Badge>
          </Card.Title>
          <Card.Text className="text-muted small flex-grow-1">
            {movie.description}
          </Card.Text>

          {/* Danh sách thông tin */}
          <ListGroup variant="flush" className="mb-3 small">
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Year</span>
              <span>{movie.year}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Country</span>
              <span>{movie.country}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Duration</span>
              <span>{movie.duration} mins</span>
            </ListGroup.Item>
          </ListGroup>

          {/* Nút hành động */}
          <Button variant="success" onClick={() => setShowModal(true)}>
            View Details
          </Button>
          <Button
            variant={isFavourite ? "outline-danger" : "outline-primary"}
            className="mt-2"
            onClick={handleFavouriteClick}
          >
            {isFavourite ? "❤️ Favorited" : "♡ Add to Favourite"}
          </Button>
        </Card.Body>
      </Card>

      {/* Modal popup giữa màn hình */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "150px", overflow: "hidden", marginBottom: "10px" }}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </div>
          <p className="mb-1"><strong>Genre:</strong> {movie.genre}</p>
          <p className="mb-1"><strong>Year:</strong> {movie.year}</p>
          <p className="mb-1"><strong>Country:</strong> {movie.country}</p>
          <p className="mb-2"><strong>Duration:</strong> {movie.duration} minutes</p>
          <p className="small">{movie.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" size="sm">
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  onToggleFavourite: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
};

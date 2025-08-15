import React, { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import { movies } from '../movies';

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(saved);
  }, []);

  const handleToggleFavourite = (id) => {
    const updated = favourites.filter(f => f !== id);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const favMovies = movies.filter(m => favourites.includes(m.id));

  return (
    <div>
      {favMovies.length === 0 ? (
        <Alert variant="info">No favourites yet.</Alert>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {favMovies.map(movie => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                onToggleFavourite={handleToggleFavourite}
                isFavourite={true}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

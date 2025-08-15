import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Alert, Toast, ToastContainer } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { movies, allGenres } from '../movies';

export default function FreeMovies() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('None');
  const [favourites, setFavourites] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(saved);
  }, []);

  const handleToggleFavourite = (id) => {
    let updated;
    let msg;
    let variant;
    if (favourites.includes(id)) {
      updated = favourites.filter(f => f !== id);
      msg = 'Removed from favourites!';
      variant = 'danger';
    } else {
      updated = [...favourites, id];
      msg = 'Added to favourites!';
      variant = 'success';
    }
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
    setToast({ show: true, message: msg, variant });
  };

  const filteredMovies = useMemo(() => {
    let filtered = movies.filter(m =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );
    if (genre !== 'All') filtered = filtered.filter(m => m.genre === genre);
    if (sort === 'asc') filtered.sort((a, b) => a.duration - b.duration);
    if (sort === 'desc') filtered.sort((a, b) => b.duration - a.duration);
    return filtered;
  }, [search, genre, sort]);

  return (
    <div>
      <SearchFilterBar
        search={search} setSearch={setSearch}
        genre={genre} setGenre={setGenre}
        sort={sort} setSort={setSort}
        allGenres={allGenres}
      />
      {filteredMovies.length === 0 ? (
        <Alert variant="warning">No movies found</Alert>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {filteredMovies.map(movie => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                onToggleFavourite={handleToggleFavourite}
                isFavourite={favourites.includes(movie.id)}
              />
            </Col>
          ))}
        </Row>
      )}

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          autohide
          delay={2000}
          onClose={() => setToast({ ...toast, show: false })}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

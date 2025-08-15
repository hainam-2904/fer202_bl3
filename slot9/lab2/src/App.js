import React from 'react';
import { Container, Navbar, Nav, Carousel } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import FreeMovies from './pages/FreeMovies';
import Favourites from './pages/Favourites';
import MovieRequestForm from './pages/MovieRequestForm';
import AppNavbar from './components/AppNavbar';

export default function App() {
  return (
    <Router>
      <AppNavbar />
        <Routes>
          <Route path="/" element={<FreeMovies />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/request" element={<MovieRequestForm />} />
        </Routes>
    </Router>
  );
}

import { useMemo, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import RecipesPage from "./components/RecipesPage"; 
import RecipeRequestForm from "./components/RecipeRequestForm";

function HomePage() {
  return (
    <>
      <Hero />
      <Container className="py-5" style={{ maxWidth: 980 }}>
        <h2>Welcome to Healthy Recipes</h2>
        <p>
          Explore delicious, healthy recipes that are easy to prepare. Use the
          navigation above to browse our collection, filter recipes by
          preparation/cooking time, or search by keyword.
        </p>
      </Container>
    </>
  );
}

function AboutPage() {
  return (
    <Container className="py-5" style={{ maxWidth: 980 }}>
      <h2>About</h2>
      <p>
        This app is built with React and React-Bootstrap to demonstrate a
        responsive layout, reusable components, filtering, and routing.
      </p>
    </Container>
  );
}

export default function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipe-request-form" element={<RecipeRequestForm />} />
      </Routes>
      <Footer />
    </>
  );
}
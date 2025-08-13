import { useMemo, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import RecipeGrid from "./components/RecipeGrid";
import Footer from "./components/Footer";
import { recipes } from "./data/recipes";

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

function RecipesPage() {
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");
  const [query, setQuery] = useState("");

  const onSearch = useCallback((q) => setQuery(q.toLowerCase()), []);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const okPrep = maxPrep === "" || r.prep <= Number(maxPrep);
      const okCook = maxCook === "" || r.cook <= Number(maxCook);
      const hay = (r.title + " " + r.description).toLowerCase();
      const okSearch = query === "" || hay.includes(query);
      return okPrep && okCook && okSearch;
    });
  }, [maxPrep, maxCook, query]);

  return (
    <>
      <Hero />
      <Container style={{ maxWidth: 1100 }}>
        <Filters
          maxPrep={maxPrep}
          setMaxPrep={setMaxPrep}
          maxCook={maxCook}
          setMaxCook={setMaxCook}
          onSearch={onSearch}
        />
        <RecipeGrid recipes={filtered} />
      </Container>
    </>
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
      </Routes>
      <Footer />
    </>
  );
}
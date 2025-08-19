import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudentsPage from "./pages/StudentsPage";

function Home() {
  return (
    <div className="container mt-4">
      <h1>Welcome to Student Management</h1>
      <p>This is a simple React app to manage students.</p>
    </div>
  );
}

function About() {
  return (
    <div className="container mt-4">
      <h1>About</h1>
      <p>This project demonstrates filtering, sorting, and managing student data using React.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

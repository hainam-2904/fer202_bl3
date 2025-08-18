import React, { useState } from "react";
import "./CompanyTable.css";

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

export default function CompanyTable() {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("startAsc");
  const [category, setCategory] = useState("All");

  const handleSearch = () => {
    setSearch(search.trim());
  };

  // Lọc theo category
  let filteredCompanies = companies.filter((c) => {
    return category === "All" || c.category === category;
  });

  // Lọc theo tên
  if (search) {
    filteredCompanies = filteredCompanies.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sắp xếp
  if (sortOption === "startAsc") {
    filteredCompanies.sort((a, b) => a.start - b.start);
  } else if (sortOption === "startDesc") {
    filteredCompanies.sort((a, b) => b.start - a.start);
  } else if (sortOption === "duration") {
    filteredCompanies.sort(
      (a, b) => b.end - b.start - (a.end - a.start)
    );
  }

  return (
    <div className="container">
        <h2 style={{ textAlign: "center" }}>Company List</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="startAsc">Year ↑</option>
          <option value="startDesc">Year ↓</option>
          <option value="duration">By Duration</option>
        </select>

        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="All">All Categories</option>
          <option value="Finance">Finance</option>
          <option value="Retail">Retail</option>
          <option value="Auto">Auto</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      {filteredCompanies.length === 0 ? (
        //<p>No result</p>
        alert ("khong ket qua")
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((c, index) => (
              <tr key={index}>
                <td>{c.name}</td>
                <td>{c.category}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
                <td>{c.end - c.start} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

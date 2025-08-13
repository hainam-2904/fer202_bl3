import { useMemo, useState, useCallback } from "react";
import { Container, Pagination, Dropdown } from "react-bootstrap";
import Hero from "./Hero";
import Filters from "./Filters";
import RecipeGrid from "./RecipeGrid";
import SortDropdown from "./SortDropdown";
import RecipeRequestForm from "./RecipeRequestForm";
import { recipes } from "../data/recipes"; 

function RecipesPage() {
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const onSearch = useCallback((q) => setQuery(q.toLowerCase()), []);
  const onSort = useCallback((sortKey) => setSortBy(sortKey), []);

  const filtered = useMemo(() => {
    let result = [...recipes];  
    
    // Filtering
    result = result.filter((r) => {
      const okPrep = maxPrep === "" || r.prep <= Number(maxPrep);
      const okCook = maxCook === "" || r.cook <= Number(maxCook);
      const hay = (r.title + " " + r.description).toLowerCase();
      const okSearch = query === "" || hay.includes(query);
      return okPrep && okCook && okSearch;
    });

    // Sorting
    result.sort((a, b) => {
      const [field, order] = sortBy.split("-");
      const valA = a[field];
      const valB = b[field];
      
      if (order === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

    return result;
  }, [maxPrep, maxCook, query, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const handleItemsPerPage = (count) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

  return (
    <>
      <Hero />
      <Container style={{ maxWidth: 1100 }}>
        <div id="recipe-request-form">
          <RecipeRequestForm />
        </div>
        <div className="d-flex justify-content-between mb-3">
          <Filters
            maxPrep={maxPrep}
            setMaxPrep={setMaxPrep}
            maxCook={maxCook}
            setMaxCook={setMaxCook}
            onSearch={onSearch}
          />
          <SortDropdown onSort={onSort} />
        </div>
        <RecipeGrid recipes={paginatedRecipes} />
        
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Dropdown onSelect={handleItemsPerPage}>
            <Dropdown.Toggle variant="outline-secondary">
              Items per page: {itemsPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={6}>6</Dropdown.Item>
              <Dropdown.Item eventKey={9}>9</Dropdown.Item>
              <Dropdown.Item eventKey={12}>12</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Pagination>
            <Pagination.First 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1} 
            />
            <Pagination.Prev 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              disabled={currentPage === 1} 
            />
            
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            
            <Pagination.Next 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
              disabled={currentPage === totalPages} 
            />
            <Pagination.Last 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages} 
            />
          </Pagination>
        </div>
      </Container>
    </>
  );
}

export default RecipesPage;  
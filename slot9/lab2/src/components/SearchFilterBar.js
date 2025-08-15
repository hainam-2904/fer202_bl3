import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputGroup, Form } from 'react-bootstrap';

export default function SearchFilterBar({ search, setSearch, genre, setGenre, sort, setSort, allGenres }) {
  return (
    <Row className="mb-3">
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Col>
      <Col md={4}>
        <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {allGenres.map((g) => <option key={g}>{g}</option>)}
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="None">Sort by Duration</option>
          <option value="asc">Duration ↑</option>
          <option value="desc">Duration ↓</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

SearchFilterBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  allGenres: PropTypes.arrayOf(PropTypes.string).isRequired
};

import React, { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Form, Row, Col } from "react-bootstrap";

const Products = () => {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // filter theo search
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // sort theo giá hoặc tên
    if (sortOption === "price-asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [search, sortOption]);

  return (
    <section className="my-4 container">
      <h2 className="mb-3">Danh sách sản phẩm</h2>

      {/* Search + Sort Controls */}
      <Row className="mb-3 g-2">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={12} md={6}>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sắp xếp mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A → Z</option>
            <option value="name-desc">Tên Z → A</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="col">
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <p className="text-muted">Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </section>
  );
};

export default Products;

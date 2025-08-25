import React, { useState, useEffect } from "react";
import BannerCarousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      <BannerCarousel />
      <section className="container my-5">
        <h2 className="mb-4 text-center">🌟 Sản phẩm nổi bật</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <a href="/products" className="btn btn-outline-primary">
            Xem tất cả sản phẩm
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;

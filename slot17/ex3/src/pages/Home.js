import React from "react";
import BannerCarousel from "../components/Carousel";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  // Lấy 2-3 sản phẩm làm nổi bật
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Banner */}
      <BannerCarousel />

      {/* Featured Products */}
      <section className="container my-5">
        <h2 className="mb-4">Sản phẩm nổi bật</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {featured.map((p) => (
            <div key={p.id} className="col">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

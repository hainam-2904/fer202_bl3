import React from "react";
import { Carousel } from "react-bootstrap";

const BannerCarousel = () => {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdnv2.tgdd.vn/mwg-static/common/News/1569702/thumb%20iPhone%2016%20-%20%202%20.jpg"
          alt="First slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "black", fontWeight: "bold" }}>
            iPhone 16 - Siêu phẩm mới nhất của Apple
          </h2>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://invietnhat.vn/wp-content/uploads/2025/06/banner-blogs.jpg"
          alt="Second slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "black", fontWeight: "bold" }}>
            Đỉnh nóc kịch trần
          </h2>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-cool-new-mobile-phone-promotion-purple-banner-image_183067.jpg"
          alt="Third slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "black", fontWeight: "bold" }}>
            Giảm giá cực sốc hôm nay
          </h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;

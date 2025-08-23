import React from "react";
import { Carousel } from "react-bootstrap";

const BannerCarousel = () => {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/banner1.jpg"
          alt="First slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            Khám giá các loại đồ ăn top 1 thế giới
          </h2>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/banner2.jpg"
          alt="Second slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            Đỉnh nóc kịch trần
          </h2>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/banner3.jpg"
          alt="Third slide"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            Giảm giá cực sốc hôm nay
          </h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;

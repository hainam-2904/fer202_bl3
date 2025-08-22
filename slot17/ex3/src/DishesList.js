import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <section className="my-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h4 m-0">Danh sách món ăn</h2>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {dishes.map((dish) => (
          <div key={dish.id} className="col">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={dish.image}
                alt={dish.name}
                style={{ objectFit: "cover", height: 160 }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                  {dish.description}
                </Card.Text>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="fw-semibold">
                    ${parseFloat(dish.price).toFixed(2)}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => addToCart(dish)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;

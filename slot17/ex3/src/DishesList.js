import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

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
            <div className="card h-100 shadow-sm">
              <img
                src={dish.image}
                alt={dish.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: 160 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text text-muted small flex-grow-1">
                  {dish.description}
                </p>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="fw-semibold">
                    ${parseFloat(dish.price).toFixed(2)}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(dish)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
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

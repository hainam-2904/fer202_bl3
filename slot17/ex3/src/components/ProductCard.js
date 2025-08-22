import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { ToastContext } from "../context/ToastContext"; 

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { addToFavourites, favourites } = useContext(FavouritesContext);
  const { showToast } = useContext(ToastContext);

  const isFavourite = favourites.some((fav) => fav.id === product.id);
  
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ objectFit: "cover", height: 160 }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="fw-semibold">${parseFloat(product.price).toFixed(2)}</span>
        </div>
        <div className="d-flex flex-column gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              addToCart(product);
              showToast("Added to cart!", "success");
            }}
          >
            Add to Cart
          </Button>
          {isFavourite ? (
            <Button as={Link} to="/favourites" variant="warning" size="sm">
              Browse My Favourites
            </Button>
          ) : (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                addToFavourites(product);
                showToast("Added to favourites!", "danger");
              }}
            >
                  Add to Favourites
            </Button>
          )}
        <Button as={Link} to={`/products/${product.id}`} variant="secondary" size="sm">
          View Details
        </Button>
      </div>
    </Card.Body>
    </Card >
  );
};

export default ProductCard;

import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";

const ViewDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const { addToCart } = useContext(CartContext);
  const { addToFavourites, favourites } = useContext(FavouritesContext);

  if (!product) return <p className="container my-4">Product not found!</p>;

  const isFavourite = favourites.some((fav) => fav.id === product.id);

  return (
    <section className="container my-4">
      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ maxHeight: 300, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <h5>${parseFloat(product.price).toFixed(2)}</h5>

          <div className="d-flex gap-2 mt-3">
            <Button variant="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
            {isFavourite ? (
              <Button as={Link} to="/favourites" variant="warning">
                Browse My Favourites
              </Button>
            ) : (
              <Button variant="outline-danger" onClick={() => addToFavourites(product)}>
                Add to Favourites
              </Button>
            )}
            <Button as={Link} to="/products" variant="secondary">
              Back to List
            </Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default ViewDetails;

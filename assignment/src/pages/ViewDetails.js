import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/FavouritesContext";

const ViewDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(undefined);

  React.useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (product === undefined) {
    return <p className="text-center my-4">⏳ Loading...</p>;
  }

  if (product === null) {
    return <p className="text-danger text-center my-4">❌ Product not found</p>;
  }

  return (
    <section className="container my-4">
      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{
            objectFit: "contain",
            height: 200,
            width: "100%",
            backgroundColor: "#f8f9fa"
          }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <h5>
            ${product.salePrice || product.price}{" "}
            {product.salePrice && (
              <span style={{ textDecoration: "line-through" }}>
                ${product.price}
              </span>
            )}
          </h5>

          <div className="d-flex gap-2 mt-3">
            <Button
              variant="primary"
              onClick={() => addToCart({ ...product, qty: 1 })}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => addToWishlist(product)}
            >
              Add to Wishlist
            </Button>
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

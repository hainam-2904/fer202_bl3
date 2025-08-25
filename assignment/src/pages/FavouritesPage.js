import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { WishlistContext } from "../context/FavouritesContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);

  if (!Array.isArray(wishlist) || wishlist.length === 0) {
    return (
      <Container className="my-4">
        <h3>My Wishlist</h3>
        <div className="text-muted">No items in your wishlist.</div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">My Wishlist</h3>
        <Button variant="outline-danger" size="sm" onClick={() => clearWishlist()}>
          Clear All
        </Button>
      </div>

      <Row xs={1} sm={2} md={3} lg={3} className="g-4">
        {wishlist.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
            <div className="mt-2 text-center">
              <Button variant="outline-danger" size="sm" onClick={() => removeFromWishlist(product.id)}>
                Remove
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WishlistPage;

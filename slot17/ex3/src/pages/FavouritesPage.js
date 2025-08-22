import React, { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FavouritesPage = () => {
  const { favourites, removeFromFavourites, clearFavourites } =
    useContext(FavouritesContext);

  if (favourites.length === 0) {
    return (
      <section className="container my-4">
        <h2>My Favourites</h2>
        <p className="text-muted">Bạn chưa thêm sản phẩm nào vào favourites.</p>
        <Button as={Link} to="/products" variant="primary">
          Đi đến Products
        </Button>
      </section>
    );
  }

  return (
    <section className="container my-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>My Favourites</h2>
        <Button variant="outline-danger" onClick={clearFavourites}>
          Clear All
        </Button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {favourites.map((fav) => (
          <div key={fav.id} className="col">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={fav.image}
                alt={fav.name}
                style={{ objectFit: "cover", height: 160 }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{fav.name}</Card.Title>
                <Card.Text className="flex-grow-1 small text-muted">
                  {fav.description}
                </Card.Text>
                <div className="d-flex flex-column gap-2">
                  <Button as={Link} to={`/products/${fav.id}`} variant="secondary">
                    View Details
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeFromFavourites(fav.id)}
                  >
                    Remove
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

export default FavouritesPage;

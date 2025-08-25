import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { Card, Button, Badge, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/FavouritesContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const isWished = useMemo(() => {
    return Array.isArray(wishlist) && wishlist.some((w) => w.id === product.id);
  }, [wishlist, product.id]);

  const handleAddToCart = () => {
    addToCart({ ...product, qty: 1 });
    showToast("Added to cart!", "success");
  };

  const handleWishlist = () => {
    if (!user) {
      showToast("Please sign in to save wishlist", "info");
      // redirect to login with redirect_uri to return to current page
      const redirectUri = location.pathname + location.search;
      navigate(`/login?redirect_uri=${encodeURIComponent(redirectUri)}`);
      return;
    }

    if (isWished) {
      navigate("/wishlist");
      return;
    }

    addToWishlist(product);
    showToast("Added to wishlist!", "success");
  };

  const price = product.salePrice ?? product.price;

  return (
    <Card className="h-100 shadow-sm position-relative">
      {product.tags?.includes("hot") && (
        <Badge bg="danger" style={{ position: "absolute", right: 8, top: 8 }}>
          HOT
        </Badge>
      )}
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ objectFit: "contain", height: 180, backgroundColor: "#f8f9fa" }}
        onError={(e) => { e.target.onerror = null; e.target.src = "/logo.svg"; }}
        loading="lazy"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{product.title}</Card.Title>
        <small className="text-muted">{product.name}</small>

        <div className="mt-2 mb-3">
          {product.salePrice ? (
            <>
              <span className="fw-bold me-2">${product.salePrice}</span>
              <small className="text-muted text-decoration-line-through">
                ${product.price}
              </small>
            </>
          ) : (
            <span className="fw-bold">${product.price}</span>
          )}
        </div>

        {/* Updated action buttons: cart icon, heart icon, kept View Details */}
        <div className="mt-auto d-flex gap-2 align-items-center">
          <OverlayTrigger placement="top" overlay={<Tooltip>Add to cart</Tooltip>}>
            <Button
              variant="primary"
              onClick={handleAddToCart}
              type="button"
              className="d-flex align-items-center"
              style={{ whiteSpace: "nowrap" }}
            >
              <FaShoppingCart style={{ marginRight: 8 }} />

            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{isWished ? "View wishlist" : "Add to wishlist"}</Tooltip>}
          >
            <Button
              variant={isWished ? "outline-secondary" : "outline-danger"}
              onClick={handleWishlist}
              type="button"
              className="d-flex align-items-center"
              style={{ whiteSpace: "nowrap" }}
            >
              {isWished ? <FaHeart style={{ color: "red", marginRight: 8 }} /> : <FaRegHeart style={{ marginRight: 8 }} />}

            </Button>
          </OverlayTrigger>

          <Button
            variant="outline-primary"
            onClick={() => navigate(`/product/${product.id}`)}
            type="button"
            className="flex-shrink-0 ms-auto"
            style={{ whiteSpace: "nowrap" }}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;

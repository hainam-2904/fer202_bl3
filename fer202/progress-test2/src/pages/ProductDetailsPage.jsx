import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import api from "../services/api";
import { formatPrice, assetUrl } from "../utils/format";
import NavBar from "../components/Navbar";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        if (data) {
          const normalized = {
            id: data.id,
            name: data.title || data.name,
            image: data.image,
            price: data.price,
            description: data.description,
            category: data.category,
          };
          setProduct(normalized);
        }
      } catch (err) {
        console.error("Error loading product:", err);
      }
    })();
  }, [id]);

  if (!product) return <p className="text-center mt-4">Loading...</p>;

  return (
    <>
      <NavBar />
      <Card className="p-4 shadow mx-auto mt-4" style={{ maxWidth: "600px" }}>
        <Card.Img
          src={
            assetUrl(product.image) ||
            "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={product.name}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <h4 className="text-primary">{formatPrice(product.price)}</h4>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

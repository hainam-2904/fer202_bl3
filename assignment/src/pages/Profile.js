import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card, Button, ListGroup, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A";
  const wishlist = Array.isArray(user.wishlist) ? user.wishlist : [];

  return (
    <section className="container my-4" style={{ maxWidth: 800 }}>
      <Card className="p-3 shadow-sm">
        <div className="d-flex align-items-center gap-3 mb-3">
          <Image
            src={user.avatar || "/images/default-avatar.png"}
            rounded
            style={{ width: 96, height: 96, objectFit: "cover" }}
            alt={`${user.username || user.name}'s avatar`}
          />
          <div>
            <h4 className="mb-0">{user.name || user.username}</h4>
            <small className="text-muted">Member since: {createdAt}</small>
          </div>
        </div>

        <ListGroup variant="flush" className="mb-3">
          <ListGroup.Item>
            <strong>ID:</strong> {user.id ?? "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Username:</strong> {user.username ?? "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email:</strong> {user.email ?? "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Password:</strong> {"••••••••"} 
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Secret question:</strong> {user.secretQuestion ?? "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Secret answer:</strong> {user.answer ? "••••••" : "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Wishlist ({wishlist.length}):</strong>
            {wishlist.length > 0 ? (
              <ul className="mt-2 mb-0">
                {wishlist.map((w, idx) => (
                  <li key={idx}>{typeof w === "string" || typeof w === "number" ? w : w.title ?? w.name ?? `Item ${idx + 1}`}</li>
                ))}
              </ul>
            ) : (
              <div className="text-muted">No items</div>
            )}
          </ListGroup.Item>
        </ListGroup>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" onClick={() => navigate("/")}>
            Back to shop
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Sign out
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default Profile;

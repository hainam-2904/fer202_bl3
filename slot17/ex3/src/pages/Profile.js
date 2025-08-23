import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card, Button } from "react-bootstrap";
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

  return (
    <section className="container my-4" style={{ maxWidth: 500 }}>
      <Card className="p-3 shadow-sm">
        <h3 className="mb-3">Thông tin cá nhân</h3>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" onClick={() => navigate("/products")}>
            Quay lại mua hàng
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              logout(); 
              navigate("/login");
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default Profile;

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Card, Table, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <section className="my-4 container">
      <Card className="shadow-sm">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h2 className="h5 m-0">Giỏ hàng</h2>
          <Badge bg="secondary">
            {cart.length} item{cart.length !== 1 ? "s" : ""}
          </Badge>
        </Card.Header>

        <Card.Body>
          {cart.length === 0 ? (
            <p className="text-muted mb-0">Giỏ hàng của bạn đang trống.</p>
          ) : (
            <>
              <div className="table-responsive">
                <Table striped hover bordered size="sm" className="align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: "50%" }}>Món</th>
                      <th className="text-end">Giá</th>
                      <th className="text-end">Số lượng</th>
                      <th className="text-end">Tổng</th>
                      <th className="text-end">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td className="text-end">${item.price}</td>
                        <td className="text-end">{item.qty}</td>
                        <td className="text-end">${item.price * item.qty}</td>
                        <td className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-between flex-wrap gap-2">
                <h3 className="m-0">Total: ${subtotal.toFixed(2)}</h3>
                <div>
                  <Button variant="outline-secondary" onClick={clearCart}>
                    Xóa giỏ hàng
                  </Button>
                  <Button variant="success" onClick={handleCheckout}>
                    Tiến hành thanh toán
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </section>
  );
};

export default CartPage;

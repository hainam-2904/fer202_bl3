import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Table, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [paidItems, setPaidItems] = useState([]);

  // tổng giá trị giỏ hàng
  const totalValue = cart
    .reduce((total, item) => total + Number(item.price) * (item.qty || 1), 0)
    .toFixed(2);

  const handlePay = async () => {
    if (!cart || cart.length === 0) {
      alert("Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    const order = {
      userId: user?.id || null,
      username: user?.username || "Guest",
      items: cart,
      total: totalValue,
      date: new Date().toISOString(),
    };

    try {
      await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      setPaidItems(cart);
      setShowModal(true);
      clearCart();
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng!");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  if (!user) {
    return (
      <section className="container my-4">
        <Alert variant="warning">
          Bạn cần <Link to="/login">đăng nhập</Link> để tiếp tục thanh toán.
        </Alert>
      </section>
    );
  }

  return (
    <section className="container my-4">
      <h2>Checkout</h2>
      <p>
        Xin chào <b>{user.username}</b>, bạn đang tiến hành thanh toán!
      </p>

      {cart.length === 0 ? (
        <p className="text-muted">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <div className="table-responsive">
              <Table striped bordered hover size="sm" className="align-middle">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th className="text-center">Số lượng</th>
                    <th className="text-end">Giá</th>
                    <th className="text-end">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title || item.name}</td>
                      <td className="text-center">{item.qty}</td>
                      <td className="text-end">${Number(item.price).toFixed(2)}</td>
                      <td className="text-end">
                        ${(Number(item.price) * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3}>Tổng cộng</th>
                    <th className="text-end">${totalValue}</th>
                  </tr>
                </tfoot>
              </Table>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="success" onClick={handlePay}>
                Tiến hành thanh toán
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modal thanh toán thành công */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán thành công 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Cảm ơn bạn <b>{user?.username}</b> đã mua hàng!
          </p>
          <Table striped bordered size="sm" className="align-middle">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th className="text-center">Số lượng</th>
                <th className="text-end">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {paidItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title || item.name}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-end">
                    ${(Number(item.price) * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>Tổng cộng</th>
                <th className="text-end">${totalValue}</th>
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Checkout;

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Table, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, totalValue, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [paidItems, setPaidItems] = useState([]);

  const handlePay = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống, không thể thanh toán!");
      return;
    }
    setPaidItems([...cartItems]);
    setShowModal(true);
    clearCart();
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

      {cartItems.length === 0 ? (
        <p className="text-muted">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <div className="table-responsive">
              <Table striped bordered hover size="sm" className="align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Sản phẩm</th>
                    <th className="text-end">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="text-end">
                        ${parseFloat(item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Tổng cộng</th>
                    <th className="text-end">${totalValue}</th>
                  </tr>
                </tfoot>
              </Table>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="success" onClick={handlePay}>
                Pay
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
          <p>Cảm ơn bạn <b>{user?.name}</b> đã mua hàng!</p>
          <Table striped bordered size="sm" className="align-middle">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th className="text-end">Giá</th>
              </tr>
            </thead>
            <tbody>
              {paidItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="text-end">
                    ${parseFloat(item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Tổng cộng</th>
                <th className="text-end">
                  ${paidItems.reduce((acc, i) => acc + parseFloat(i.price), 0).toFixed(2)}
                </th>
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

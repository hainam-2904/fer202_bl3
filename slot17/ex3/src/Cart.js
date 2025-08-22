import React, { useContext} from "react";
import { CartContext } from "./CartContext";
import { Card, Table, Button, Badge } from "react-bootstrap";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);
const handleCheckout = () => {
  alert("Checkout successful!");
  clearCart();
};

  return (
    <section className="my-4">
      <Card className="shadow-sm">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h2 className="h5 m-0">Giỏ hàng</h2>
          <Badge bg="secondary">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </Badge>
        </Card.Header>

        <Card.Body>
          {cartItems.length === 0 ? (
            <p className="text-muted mb-0">Giỏ hàng của bạn đang trống.</p>
          ) : (
            <>
              <div className="table-responsive">
                <Table striped hover bordered size="sm" className="align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: "50%" }}>Món</th>
                      <th className="text-end">Giá</th>
                      <th className="text-end">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td className="text-end">
                          ${parseFloat(item.price).toFixed(2)}
                        </td>
                        <td className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Tổng</th>
                      <th className="text-end">${totalValue}</th>
                      <th />
                    </tr>
                  </tfoot>
                </Table>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="outline-secondary" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button variant="success" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </section>
  );
};

export default Cart;

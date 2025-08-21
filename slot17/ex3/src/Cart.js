import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);

  return (
    <section className="my-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h2 className="h5 m-0">Giỏ hàng</h2>
          <span className="badge text-bg-secondary">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="card-body">
          {cartItems.length === 0 ? (
            <p className="text-muted mb-0">Giỏ hàng của bạn đang trống.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table align-middle">
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
                        <td className="text-end">${parseFloat(item.price).toFixed(2)}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
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
                </table>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-secondary" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="btn btn-success" disabled>
                  Checkout (coming soon)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;

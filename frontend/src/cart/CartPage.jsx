import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page-content">
      <h1>Cart Review</h1>

      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.name} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)} each</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => decreaseQty(item.name)}>-</button>
                  <button onClick={() => increaseQty(item.name)}>+</button>
                  <button onClick={() => removeFromCart(item.name)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>
            <button onClick={() => navigate("/checkout")} disabled={cart.length === 0}>
              Continue to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
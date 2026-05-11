import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, checkoutCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    const order = checkoutCart();
    if (order) {
      alert("Purchase successful!");
      navigate("/orders");
    }
  };

  return (
    <div className="page-content">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <div>
          <p className="empty-message">Your cart is empty. Add items before checkout.</p>
          <button onClick={() => navigate("/")}>Back to Store</button>
        </div>
      ) : (
        <>
          <div className="checkout-summary">
            {cart.map((item) => (
              <div key={item.name} className="checkout-item">
                <strong>{item.name}</strong>
                <span>{item.quantity} × ${item.price.toFixed(2)}</span>
              </div>
            ))}
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
          <div className="checkout-actions">
            <button onClick={() => navigate("/cart")}>Back to Cart</button>
            <button onClick={handlePurchase} disabled={cart.length === 0}>
              Complete Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
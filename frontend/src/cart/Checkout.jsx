import { useContext } from "react";
import { CartContext } from "./CartContext";

function Checkout() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>
      <h2>Total: ${total}</h2>

      <button onClick={() => alert("Stripe comes next step")}>
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;
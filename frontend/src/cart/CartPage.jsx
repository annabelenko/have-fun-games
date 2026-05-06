import { useContext } from "react";
import { CartContext } from "./CartContext";

function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart Page</h1>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item.name} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <p>Qty: {item.quantity}</p>

          <button onClick={() => decreaseQty(item.name)}>-</button>
          <button onClick={() => increaseQty(item.name)}>+</button>
          <button onClick={() => removeFromCart(item.name)}>Remove</button>
        </div>
      ))}

      <h2>Total: ${total}</h2>
    </div>
  );
}

export default CartPage;
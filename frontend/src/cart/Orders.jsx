import { useContext } from "react";
import { CartContext } from "./CartContext";

function OrdersPage() {
  const { orders } = useContext(CartContext);

  return (
    <div className="page-content">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p className="empty-message">No orders yet. Complete a purchase to see your order history.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <h2>{order.id}</h2>
                <span>{order.status}</span>
              </div>
              <p>{order.date}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.name}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;

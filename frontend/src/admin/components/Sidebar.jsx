import React from "react";

const Sidebar = () => {
  return (
    <div style={{ width: "200px", background: "#111", color: "#fff", height: "100vh", padding: "20px" }}>
      <h2>Admin</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Dashboard</li>
        <li>Orders</li>
        <li>Users</li>
      </ul>
    </div>
  );
};

export default Sidebar;
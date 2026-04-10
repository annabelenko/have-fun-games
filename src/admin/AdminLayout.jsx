import React from "react";
import Sidebar from "./components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
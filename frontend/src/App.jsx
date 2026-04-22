import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="header-logo"></div>
        <span className="header-title">Have Fun Games</span>
      </header>

      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
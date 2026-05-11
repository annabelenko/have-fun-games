import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GamePage from "./pages/GamePage";
import ErrorPage from "./pages/ErrorPage";
import AuthProvider, { AuthContext } from "./auth/AuthContext";
import CartProvider, { CartContext } from "./cart/CartContext";
import CartPage from "./cart/CartPage";
import "./App.css";

function Header() {
  const { user, loading, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return null;

  return (
    <header className="header">
      <Link to="/" className="header-brand">
        <div className="header-logo"></div>
        <span className="header-title">Have Fun Games</span>
      </Link>

      <nav className="header-nav">
        <Link to="/cart" className="cart-icon-link">
          🛒
          <span className="cart-count">{cartItemCount}</span>
        </Link>

        {user ? (
          <>
            <span className="header-nav-link">{user.email}</span>
            <button className="header-nav-cta" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-nav-link">
              Login
            </Link>
            <Link to="/signup" className="header-nav-cta">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/*" element={<ErrorPage message="Page does not exist" />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
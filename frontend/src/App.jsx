import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GamePage from "./pages/GamePage";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";

export default function App() {
	return (
		<BrowserRouter>
			<header className="header">
				<Link to="/" className="header-brand">
					<div className="header-logo"></div>
					<span className="header-title">Have Fun Games</span>
				</Link>
				<nav className="header-nav">
					<Link to="/login" className="header-nav-link">
						Login
					</Link>
					<Link to="/signup" className="header-nav-cta">
						Sign Up
					</Link>
				</nav>
			</header>

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/game" element={<GamePage />} />
				<Route path="/game/:id" element={<GamePage />} />
				<Route
					path="/*"
					element={<ErrorPage message="Page does not exist" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

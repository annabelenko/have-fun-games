import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./auth.css";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		setLoading(false);
		if (error) {
			setError(error.message);
		} else {
			navigate(-1);
		}
	};

	return (
		<div className="auth-page">
			<div className="auth-card">
				{/* Brand */}
				<div className="auth-brand">
					<div className="auth-brand-icon">🎮</div>
					<span className="auth-brand-name">HFG</span>
				</div>

				<h1 className="auth-heading">Welcome back</h1>
				<p className="auth-sub">Sign in to your account to continue</p>

				{error && (
					<div className="auth-error">
						<span>⚠</span>
						<span>{error}</span>
					</div>
				)}

				<form onSubmit={handleLogin} noValidate>
					<div className="auth-field">
						<label className="auth-label" htmlFor="email">Email</label>
						<div className="auth-input-wrap">
							<input
								id="email"
								className="auth-input"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoComplete="email"
							/>
						</div>
					</div>

					<div className="auth-field">
						<label className="auth-label" htmlFor="password">Password</label>
						<div className="auth-input-wrap">
							<input
								id="password"
								className="auth-input has-toggle"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								autoComplete="current-password"
							/>
							<button
								type="button"
								className="auth-toggle-btn"
								onClick={() => setShowPassword((v) => !v)}
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? "🙈" : "👁"}
							</button>
						</div>
					</div>

					<button className="auth-submit" type="submit" disabled={loading}>
						{loading && <span className="auth-spinner" />}
						{loading ? "Signing in…" : "Sign in"}
					</button>
				</form>

				<p className="auth-footer">
					Don&apos;t have an account?{" "}
					<Link to="/signup">Create one</Link>
				</p>
			</div>
		</div>
	);
}

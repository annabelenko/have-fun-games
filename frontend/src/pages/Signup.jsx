import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./auth.css";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSignup = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const { error } = await supabase.auth.signUp({ email, password });
		setLoading(false);
		if (error) {
			setError(error.message);
		} else {
			setSuccess(true);
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

				<h1 className="auth-heading">Create account</h1>
				<p className="auth-sub">Join HFG and start building your library</p>

				{error && (
					<div className="auth-error">
						<span>⚠</span>
						<span>{error}</span>
					</div>
				)}

				{success && (
					<div className="auth-success">
						<span>✓</span>
						<span>Account created! Check your email to confirm your address.</span>
					</div>
				)}

				{!success && (
					<form onSubmit={handleSignup} noValidate>
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
									placeholder="Min. 6 characters"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									autoComplete="new-password"
									minLength={6}
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
							{loading ? "Creating account…" : "Create account"}
						</button>
					</form>
				)}

				<p className="auth-footer">
					Already have an account?{" "}
					<Link to="/login">Sign in</Link>
				</p>
			</div>
		</div>
	);
}

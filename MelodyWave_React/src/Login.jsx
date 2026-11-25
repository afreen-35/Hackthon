
import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    onLogin();
  };

  const switchPage = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-container">
      <div className="auth-decoration decoration-one"></div>
      <div className="auth-decoration decoration-two"></div>

      <div className="auth-box">
        <div className="auth-logo">♫</div>

        <h1>Melody<span>Wave</span></h1>

        <p className="auth-tagline">
          Your music. Your mood. Your world.
        </p>

        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <p className="auth-description">
          {isSignup
            ? "Join MelodyWave and discover your music world."
            : "Login to enjoy your favorite music."}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {isSignup && (
            <>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />
            </>
          )}

          {!isSignup && (
            <p className="forgot-password">Welcome to MelodyWave!</p>
          )}

          <button type="submit" className="auth-button">
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="auth-switch">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button type="button" onClick={switchPage}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>

        <p className="auth-footer">
          ♫ Made for music lovers
        </p>
      </div>
    </div>
  );
}

export default Login;

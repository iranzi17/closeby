import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const validate = () => {
    const errs = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errs.push("Invalid email format");
    }
    if (password.length < 6) {
      errs.push("Password must be at least 6 characters");
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;
    try {
      if (isRegistering) {
        await onRegister(email, password);
        setMessage("Registration successful");
      } else {
        await onLogin(email, password);
        setMessage("Login successful");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {errors.map((err, idx) => (
          <p key={idx}>{err}</p>
        ))}
        {message && <p>{message}</p>}
        <button type="submit" className="login-button">
          {isRegistering ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggle-button"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;


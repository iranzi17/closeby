import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "locations", res.user.uid), {
          uid: res.user.uid,
          email: res.user.email,
          sharing: false,
          lat: null,
          lng: null,
        });
        alert("✅ Registration successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Login successful!");
      }
      navigate("/map");
    } catch (error) {
      alert("❌ Error: " + error.message);
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

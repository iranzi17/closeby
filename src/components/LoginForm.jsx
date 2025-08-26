import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage("✅ Registration successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage("✅ Login successful!");
      }
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2"
        />
        {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2"
        />
        {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Submitting..." : isRegistering ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          disabled={loading}
          className="text-blue-500 underline disabled:opacity-50"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
        {formError && <div className="text-red-500">❌ {formError}</div>}
        {successMessage && <div className="text-green-600">{successMessage}</div>}
      </form>
    </div>
  );
}

export default LoginForm;

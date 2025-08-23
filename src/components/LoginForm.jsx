import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password);
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-4 py-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-4 py-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {isRegistering ? "Register" : "Login"}
        </button>
        <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="text-blue-500 underline">
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

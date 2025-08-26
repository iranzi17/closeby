import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import MapComponent from "./components/MapComponent";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, register, logout } = useAuth();

  return (
    <div>
      {!user ? (
        <div>
          <h2>Register</h2>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => register(email, password)}>Register</button>
          <span>
            {" "}Already have an account?
            <button onClick={() => login(email, password)}>Login</button>
          </span>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={logout}>Logout</button>
          <MapComponent currentUser={user} />
        </div>
      )}
    </div>
  );
}

export default App;

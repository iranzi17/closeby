import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MapComponent from "./components/MapComponent";

function App() {
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/map" replace /> : <LoginForm />}
      />
      <Route
        path="/map"
        element={
          user ? (
            <div>
              <h2>Welcome, {user.email}</h2>
              <button onClick={logout}>Logout</button>
              <button onClick={() => setShare(true)}>Share Location</button>
              <button onClick={() => setShare(false)}>Stop Sharing</button>
              <MapComponent currentUser={user} shareLocation={share} />
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/map" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;

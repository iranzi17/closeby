import React from "react";
import useAuth from "./hooks/useAuth";
import LoginForm from "./components/LoginForm";
import MapComponent from "./components/MapComponent";

function App() {
  const { user, login, register, logout } = useAuth();

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={login} onRegister={register} />
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

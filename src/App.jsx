import React from "react";
import useAuth from "./hooks/useAuth";
import LoginForm from "./components/LoginForm";
import MapComponent from "./components/MapComponent";
import FirebaseWarning from "./components/FirebaseWarning";
import { firebaseInitError } from "./firebase";

function App() {
  const { user, login, register, logout } = useAuth();

  if (firebaseInitError) {
    return <FirebaseWarning />;
  }

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

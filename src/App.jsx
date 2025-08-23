// File: firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6U0unu3JeeyT6vmR53VUgRbV10T1mWRH8",
  authDomain: "closeby-app-b70a1.firebaseapp.com",
  databaseURL: "https://closeby-app-b70a1-default-rtdb.firebaseio.com",
  projectId: "closeby-app-b70a1",
  storageBucket: "closeby-app-b70a1.appspot.com",
  messagingSenderId: "547769823139",
  appId: "1:547769823139:web:e9e362816684fedd3d1d16",
  measurementId: "G-MKL1L2K7Q1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, set, remove } from "firebase/database";
import { auth, db } from "./firebaseConfig";
import MapView from "./components/MapView";
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const toggleSharing = () => {
    if (!sharing) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locRef = ref(db, `locations/${user.uid}`);
        set(locRef, {
          name: user.email,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setSharing(true);
      });
    } else {
      remove(ref(db, `locations/${user.uid}`));
      setSharing(false);
    }
  };

  if (!user) return <LoginForm />;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Welcome, {user.email}</h1>
        <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
      <button onClick={toggleSharing} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        {sharing ? "Stop Sharing" : "Share My Location"}
      </button>
      <MapView currentUserId={user.uid} />
    </div>
  );
}

export default App;

// Remove the LoginForm and MapView component code from this file.
// Keep only the App component and its export here.

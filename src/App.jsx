import React, { useEffect, useState } from "react";
import { auth, db } from './firebase'; // ✅ FIXED: Import both `auth` and `db`
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import MapComponent from "./components/MapComponent";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [allLocations, setAllLocations] = useState([]);

  // 🔐 Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "locations", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLocation(docSnap.data());
        }
      } else {
        setUser(null);
        setLocation(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 📡 Fetch all shared user locations
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "locations"), (snapshot) => {
      const sharedLocations = snapshot.docs
        .map(doc => doc.data())
        .filter(data => data.sharing === true);
      setAllLocations(sharedLocations);
    });
    return () => unsub();
  }, []);

  // ✅ Register new user
  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "locations", res.user.uid), {
        uid: res.user.uid,
        email: res.user.email,
        sharing: false,
        lat: null,
        lng: null,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Login
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🚪 Logout
  const logout = () => {
    signOut(auth);
  };

  // 📍 Share location
  const shareLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      await updateDoc(doc(db, "locations", user.uid), {
        lat: latitude,
        lng: longitude,
        sharing: true,
      });
    });
  };

  // 🚫 Stop sharing
  const stopSharing = async () => {
    await updateDoc(doc(db, "locations", user.uid), {
      sharing: false,
      lat: null,
      lng: null,
    });
  };

  return (
    <div>
      {!user ? (
        <div>
          <h2>Register</h2>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={register}>Register</button>
          <span> Already have an account? <button onClick={login}>Login</button> </span>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={logout}>Logout</button>
          <button onClick={shareLocation}>Share Location</button>
          <button onClick={stopSharing}>Stop Sharing</button>
          <MapComponent userLocation={location} markers={allLocations} />
        </div>
      )}
    </div>
  );
}

export default App;

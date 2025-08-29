import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

/**
 * Hook wrapping Firebase authentication helpers.
 *
 * @returns {object} auth API
 * @returns {object|null} return.user - current Firebase user or null
 * @returns {Function} return.register - register(email, password)
 * @returns {Function} return.login - login(email, password)
 * @returns {Function} return.logout - sign the user out
 */
export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!auth) return undefined;
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const register = async (email, password) => {
    if (!auth || !db) throw new Error("Firebase not initialized");
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "locations", res.user.uid), {
      uid: res.user.uid,
      email: res.user.email,
      sharing: false,
      lat: null,
      lng: null,
    });
    return res.user;
  };

  const login = (email, password) => {
    if (!auth) throw new Error("Firebase not initialized");
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    if (!auth) throw new Error("Firebase not initialized");
    return signOut(auth);
  };

  return { user, register, login, logout };
}

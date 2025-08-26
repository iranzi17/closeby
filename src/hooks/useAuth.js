import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
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
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const register = async (email, password) => {
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

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return { user, register, login, logout };
}

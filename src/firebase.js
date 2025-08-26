// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optional: import { getDatabase } from "firebase/database";
// Optional: import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6UunoU3eeyT6vmR53VUgRbv10IlmWRH8",
  authDomain: "closeby-app-b70a1.firebaseapp.com",
  databaseURL: "https://closeby-app-b70a1-default-rtdb.firebaseio.com",
  projectId: "closeby-app-b70a1",
  storageBucket: "closeby-app-b70a1.appspot.com",
  messagingSenderId: "547769023139",
  appId: "1:547769023139:web:e9e3602166874fedd31d16",
  measurementId: "G-MKL1L2K7Q1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
// Optional: export const realtimeDB = getDatabase(app);
// Optional: export const storage = getStorage(app);

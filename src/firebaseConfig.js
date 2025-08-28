import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyC6UunoU3eeyT6vmR53VUgRbv10IlmWRH8",
  authDomain: "closeby-app-b70a1.firebaseapp.com",
  databaseURL: "https://closeby-app-b70a1-default-rtdb.firebaseio.com",
  projectId: "closeby-app-b70a1",
  storageBucket: "closeby-app-b70a1.firebasestorage.app",
  messagingSenderId: "547769023139",
  appId: "1:547769023139:web:e9e3602166874fedd31d16",
  measurementId: "G-MKL1L2K7Q1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);        // ✅ Keep this
export const db = getFirestore(app);     // ✅ Now exports Firestore

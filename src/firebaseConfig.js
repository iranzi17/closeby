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

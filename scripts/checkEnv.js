// scripts/checkEnv.js
require("dotenv").config();

const mode = process.argv[2] || "default";

const firebaseVars = {
  REACT_APP_API_KEY: "AIzaSy... (your Firebase API key)",
  REACT_APP_AUTH_DOMAIN: "closeby-app-b70a1.firebaseapp.com",
  REACT_APP_DATABASE_URL: "https://closeby-app-b70a1-default-rtdb.firebaseio.com",
  REACT_APP_PROJECT_ID: "closeby-app-b70a1",
  REACT_APP_STORAGE_BUCKET: "closeby-app-b70a1.firebasestorage.app",
  REACT_APP_MESSAGING_SENDER_ID: "547769023139",
  REACT_APP_APP_ID: "1:547769023139:web:e9e3602166874fedd31d16",
  REACT_APP_MEASUREMENT_ID: "G-MKL1L2K7Q1"
};

const dataConnectVars = {
  REACT_APP_DATA_CONNECT_URL:
    "https://us-central1-closeby-app-b70a1.firebasedataconnect.app/closeby"
};

let required = {};
if (mode === "firebase") {
  required = firebaseVars;
} else if (mode === "dataconnect") {
  required = dataConnectVars;
} else {
  required = { ...firebaseVars, ...dataConnectVars };
}

const missing = Object.keys(required).filter((v) => !process.env[v]);

if (missing.length) {
  console.error("❌ Missing environment variables:\n");
  missing.forEach((key) => {
    console.error(`  ${key}  (example: ${required[key]})`);
  });
  process.exit(1);
}

console.log("✅ All required env vars are set.");

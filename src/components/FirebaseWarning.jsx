import React from "react";

export default function FirebaseWarning() {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
      <p className="font-bold">Warning</p>
      <p>Firebase initialization failed. Some features may be unavailable.</p>
    </div>
  );
}

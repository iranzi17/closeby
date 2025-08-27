import React, { useEffect, useState } from "react";

import MapComponent from "./components/MapComponent";

function App() {
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (

  );
}

export default App;

import React, { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function App() {
  const [user, setUser] = useState(null);
  const [eventName, setEventName] = useState("");
  const [joinId, setJoinId] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const handleCreateEvent = () => {
    // Placeholder handler
    alert(`Create event: ${eventName}`);
  };

  const handleJoinEvent = () => {
    // Placeholder handler
    alert(`Join event: ${joinId}`);
  };

  return (
    <div>
      {user && <MapComponent currentUser={user} />}
      <div>
        <input
          type="text"
          placeholder="Event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Join ID"
          value={joinId}
          onChange={(e) => setJoinId(e.target.value)}
        />
        <button onClick={handleJoinEvent}>Join Event</button>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;

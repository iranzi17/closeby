import React, { useEffect, useState } from "react";

import MapComponent from "./components/MapComponent";
import { createEvent, joinEvent } from "./api/events";

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  // 🎉 Placeholder create/join event handlers using Data Connect
  const handleCreateEvent = async () => {
    try {
      const token = await user.getIdToken();
      await createEvent(
        {
          name: eventName,
          description: 'Placeholder event',
          location: 'TBD',
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          isPublic: true,
        },
        token
      );
      alert('Event created');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleJoinEvent = async () => {
    try {
      const token = await user.getIdToken();
      await joinEvent(joinId, token);
      alert('Join request sent');
    } catch (err) {
      alert(err.message);
    }
  };

  return (

  );
}

export default App;

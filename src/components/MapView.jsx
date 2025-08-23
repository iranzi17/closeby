import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import "leaflet/dist/leaflet.css";

function MapView({ currentUserId }) {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const locRef = ref(db, "locations");
    const unsub = onValue(locRef, (snapshot) => {
      const data = snapshot.val() || {};
      setLocations(data);
    });
    return () => unsub();
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.entries(locations).map(([uid, { lat, lng, name }]) => (
        <Marker key={uid} position={[lat, lng]}>
          <Popup>{uid === currentUserId ? "You" : name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;

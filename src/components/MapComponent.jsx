import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

const MapComponent = ({ currentUser, shareLocation, mockUsers = null, mockPosition = null }) => {
  const [users, setUsers] = useState(mockUsers || []);
  const [position, setPosition] = useState(mockPosition);

  // Custom marker icon
  const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Get user's current position and optionally update Firestore
    useEffect(() => {
      if (mockPosition) return;
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported.");
        return;
      }

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        if (shareLocation && currentUser?.uid) {
          await updateDoc(doc(db, "users", currentUser.uid), {
            lat: latitude,
            lng: longitude,
            lastUpdated: serverTimestamp(),
          });
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [shareLocation, currentUser]);

  // Listen to shared users' locations
    useEffect(() => {
      if (mockUsers) return;
      const q = query(collection(db, "users"), where("shareLocation", "==", true));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const usersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      });

      return () => unsubscribe();
    }, [mockUsers]);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <MapContainer center={position || [0, 0]} zoom={13} scrollWheelZoom style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {position && (
          <Marker position={position} icon={icon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {users.map((user) =>
          user.lat && user.lng && user.uid !== currentUser.uid ? (
            <Marker key={user.id} position={[user.lat, user.lng]} icon={icon}>
              <Popup>{user.email || "User"}</Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

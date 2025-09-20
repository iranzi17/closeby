// src/components/MapComponent.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeolocation from "../hooks/useGeolocation";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapComponent({ currentUser }) {
  const { position, markers, shareLocation, stopSharing } =
    useGeolocation(currentUser);
  // Debug log to confirm key injection
  useEffect(() => {
    console.log("✅ MapTiler Key:", process.env.REACT_APP_MAPTILER_KEY);
  }, []);

  const tileUrl = `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=${process.env.REACT_APP_MAPTILER_KEY}`;
  console.log("✅ Tile URL template:", tileUrl);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={shareLocation}>
          Share location
        </button>
        <button type="button" onClick={stopSharing}>
          Stop sharing
        </button>
      </div>
      <MapContainer
        center={position ? [position.lat, position.lng] : [-1.9441, 30.0619]} // fallback: Kigali
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={tileUrl}
          attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
        />
        {position && (
          <Marker position={[position.lat, position.lng]} icon={icon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {markers &&
          markers
            .filter((m) => m.uid !== currentUser?.uid)
            .map((m) => (
              <Marker key={m.uid} position={[m.lat, m.lng]} icon={icon}>
                <Popup>{m.email || "User"}</Popup>
              </Marker>
            ))}
      </MapContainer>
    </div>
  );
}

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGeolocation from "../hooks/useGeolocation";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapComponent({ currentUser }) {
  const { position, markers, shareLocation, stopSharing } =
    useGeolocation(currentUser);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <button onClick={shareLocation}>Share Location</button>
      <button onClick={stopSharing}>Stop Sharing</button>
      <MapContainer
        center={position ? [position.lat, position.lng] : [0, 0]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {position && (
          <Marker position={[position.lat, position.lng]} icon={icon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {markers
          .filter((m) => m.uid !== currentUser.uid)
          .map((m) => (
            <Marker key={m.uid} position={[m.lat, m.lng]} icon={icon}>
              <Popup>{m.email || "User"}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

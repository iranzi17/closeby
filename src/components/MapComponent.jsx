import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ userLocation, markers = [] }) => {
  const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const position =
    userLocation && userLocation.lat != null && userLocation.lng != null
      ? [userLocation.lat, userLocation.lng]
      : [0, 0];

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {userLocation && userLocation.lat != null && userLocation.lng != null && (
          <Marker position={position} icon={icon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {markers
          .filter(
            (m) =>
              m.sharing &&
              m.lat != null &&
              m.lng != null &&
              m.uid !== userLocation?.uid
          )
          .map((m) => (
            <Marker key={m.uid} position={[m.lat, m.lng]} icon={icon}>
              <Popup>{m.email || "User"}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;


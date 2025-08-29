import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGeolocation from "../hooks/useGeolocation";

const MapComponent = ({ currentUser }) => {
  const { position, markers, shareLocation, stopSharing } = useGeolocation(currentUser);

  // Custom marker icon
  const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const center = position ? [position.lat, position.lng] : [0, 0];

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <button onClick={shareLocation}>Share Location</button>
      <button onClick={stopSharing}>Stop Sharing</button>
      <MapContainer center={center} zoom={13} scrollWheelZoom style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {position && (
          <Marker position={[position.lat, position.lng]} icon={icon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {markers.map((user) =>
          user.lat &&
          user.lng &&
          user.uid !== currentUser.uid ? (
            <Marker key={user.uid} position={[user.lat, user.lng]} icon={icon}>
              <Popup>{user.email || "User"}</Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


  const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });


        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />


            <Popup>You are here</Popup>
          </Marker>
        )}


            <Marker key={m.uid} position={[m.lat, m.lng]} icon={icon}>
              <Popup>{m.email || "User"}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;


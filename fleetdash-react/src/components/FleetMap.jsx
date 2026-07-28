import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function FleetMap() {
  return (
    <div className="panel">
      <h3>Live Fleet Map</h3>

      <MapContainer
        center={[17.385, 78.4867]}
        zoom={5}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "12px"
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[17.385, 78.4867]}>
          <Popup>Vehicle VH1001 - Hyderabad</Popup>
        </Marker>

        <Marker position={[12.9716, 77.5946]}>
          <Popup>Vehicle VH1002 - Bangalore</Popup>
        </Marker>

        <Marker position={[13.0827, 80.2707]}>
          <Popup>Vehicle VH1003 - Chennai</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
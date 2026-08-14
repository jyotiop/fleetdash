import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function FleetMap({ vehicles = {} }) {
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

        {/* Static Initial Markers */}
        <Marker position={[17.385, 78.4867]}>
          <Popup>Vehicle VH1001 - Hyderabad (Static)</Popup>
        </Marker>

        <Marker position={[12.9716, 77.5946]}>
          <Popup>Vehicle VH1002 - Bangalore (Static)</Popup>
        </Marker>

        <Marker position={[13.0827, 80.2707]}>
          <Popup>Vehicle VH1003 - Chennai (Static)</Popup>
        </Marker>

        {/* Live Dynamic Markers */}
        {Object.entries(vehicles).map(([vehicleId, data]) => (
          <Marker key={vehicleId} position={[data.lat, data.lng]}>
            <Popup>
              <strong>Vehicle:</strong> {vehicleId}<br />
              <strong>Latitude:</strong> {data.lat.toFixed(6)}<br />
              <strong>Longitude:</strong> {data.lng.toFixed(6)}<br />
              <strong>Last Updated:</strong> {data.lastUpdated}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
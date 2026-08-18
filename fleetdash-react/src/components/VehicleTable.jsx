import { useState } from "react";

export default function VehicleTable({ liveVehicles = {} }) {
  const [search, setSearch] = useState("");

  // Base list of vehicles
  const staticVehicles = [
    { id: "VH1001", status: "Online", location: "Hyderabad", driver: "Ramesh" },
    { id: "VH1002", status: "Offline", location: "Bangalore", driver: "Suresh" },
    { id: "VH1003", status: "Moving", location: "Chennai", driver: "Mahesh" },
    { id: "VH1004", status: "Idle", location: "Mumbai", driver: "Rajesh" }
  ];

  // Merge with live vehicle coordinates from WebSockets
  const mergedVehicles = [...staticVehicles];
  Object.entries(liveVehicles).forEach(([id, data]) => {
    const existingIndex = mergedVehicles.findIndex((v) => v.id === id);
    const liveData = {
      id,
      status: "Moving",
      location: `${data.lat.toFixed(4)}, ${data.lng.toFixed(4)}`,
      driver: "Live Telemetry"
    };

    if (existingIndex !== -1) {
      mergedVehicles[existingIndex] = { ...mergedVehicles[existingIndex], ...liveData };
    } else {
      mergedVehicles.push(liveData);
    }
  });

  const filtered = mergedVehicles.filter(
    (vehicle) =>
      vehicle.id.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Online":
        return {
          background: "rgba(16, 185, 129, 0.12)",
          color: "#34d399",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.1)",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.3px",
          textTransform: "uppercase"
        };
      case "Offline":
        return {
          background: "rgba(244, 63, 94, 0.12)",
          color: "#fb7185",
          border: "1px solid rgba(244, 63, 94, 0.25)",
          boxShadow: "0 0 10px rgba(244, 63, 94, 0.1)",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.3px",
          textTransform: "uppercase"
        };
      case "Moving":
        return {
          background: "rgba(59, 130, 246, 0.12)",
          color: "#60a5fa",
          border: "1px solid rgba(59, 130, 246, 0.25)",
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.1)",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.3px",
          textTransform: "uppercase"
        };
      case "Idle":
        return {
          background: "rgba(245, 158, 11, 0.12)",
          color: "#fbbf24",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          boxShadow: "0 0 10px rgba(245, 158, 11, 0.1)",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.3px",
          textTransform: "uppercase"
        };
      default:
        return {
          background: "rgba(100, 116, 139, 0.12)",
          color: "#94a3b8",
          border: "1px solid rgba(100, 116, 139, 0.25)",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.3px",
          textTransform: "uppercase"
        };
    }
  };

  return (
    <div className="panel">
      <h3>Vehicle Management</h3>

      <input
        type="text"
        placeholder="Filter by vehicle ID or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          margin: "15px 0 20px 0",
          borderRadius: "10px",
          border: "1px solid var(--border-glass)",
          background: "rgba(255, 255, 255, 0.02)",
          color: "white",
          outline: "none",
          fontSize: "14px",
          transition: "var(--transition-smooth)"
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--primary)";
          e.target.style.boxShadow = "0 0 12px var(--primary-glow)";
          e.target.style.background = "rgba(255, 255, 255, 0.05)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border-glass)";
          e.target.style.boxShadow = "none";
          e.target.style.background = "rgba(255, 255, 255, 0.02)";
        }}
      />

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr style={{ color: "var(--text-muted)", fontSize: "13px", textAlign: "left" }}>
              <th style={{ padding: "14px", fontWeight: "600" }}>ID</th>
              <th style={{ padding: "14px", fontWeight: "600" }}>Status</th>
              <th style={{ padding: "14px", fontWeight: "600" }}>Location / Coordinates</th>
              <th style={{ padding: "14px", fontWeight: "600" }}>Driver</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((vehicle) => (
              <tr 
                key={vehicle.id} 
                style={{ 
                  borderTop: "1px solid var(--border-glass)", 
                  fontSize: "14px",
                  transition: "var(--transition-smooth)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.01)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td style={{ padding: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{vehicle.id}</td>

                <td style={{ padding: "14px" }}>
                  <span style={getStatusStyle(vehicle.status)}>
                    {vehicle.status}
                  </span>
                </td>

                <td style={{ padding: "14px", color: "var(--text-muted)", fontFamily: "monospace", fontSize: "13px" }}>
                  {vehicle.location}
                </td>
                <td style={{ padding: "14px", color: "var(--text-muted)" }}>{vehicle.driver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
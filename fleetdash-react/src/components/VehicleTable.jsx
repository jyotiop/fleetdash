import { useState } from "react";

const vehicles = [
  { id: "VH1001", status: "Online", location: "Hyderabad", driver: "Ramesh" },
  { id: "VH1002", status: "Offline", location: "Bangalore", driver: "Suresh" },
  { id: "VH1003", status: "Moving", location: "Chennai", driver: "Mahesh" },
  { id: "VH1004", status: "Idle", location: "Mumbai", driver: "Rajesh" }
];

export default function VehicleTable() {
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter(
    (vehicle) =>
      vehicle.id.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "#22C55E";
      case "Offline":
        return "#EF4444";
      case "Moving":
        return "#3B82F6";
      case "Idle":
        return "#F59E0B";
      default:
        return "#64748B";
    }
  };

  return (
    <div className="panel">
      <h3>Vehicle Management</h3>

      <input
        type="text"
        placeholder="Search vehicle..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          margin: "15px 0",
          borderRadius: "8px",
          border: "1px solid #334155",
          background: "#0F172A",
          color: "white"
        }}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Location</th>
            <th>Driver</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>

              <td>
                <span
                  style={{
                    background: getStatusColor(vehicle.status),
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                >
                  {vehicle.status}
                </span>
              </td>

              <td>{vehicle.location}</td>
              <td>{vehicle.driver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
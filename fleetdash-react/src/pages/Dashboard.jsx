import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Dashboard.css";

import DashboardCards from "../components/DashboardCards";
import FleetChart from "../components/FleetChart";
import VehicleStatusChart from "../components/VehicleStatusChart";
import FleetMap from "../components/FleetMap";
import VehicleTable from "../components/VehicleTable";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Connect to the Express/Socket.io backend server
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("⚡ [Socket.io] Connected to FleetDash backend!");
    });

    // Listen for live vehicle location updates
    socket.on("location-update", (data) => {
      try {
        const buffer = data.location;
        const view = new DataView(buffer);
        const lat = view.getFloat64(0);
        const lng = view.getFloat64(8);

        setVehicles((prev) => ({
          ...prev,
          [data.vehicleId]: {
            lat,
            lng,
            lastUpdated: new Date().toLocaleTimeString()
          }
        }));
      } catch (err) {
        console.error("❌ Failed to decode binary coordinates:", err);
      }
    });

    // Listen for live geofence breach alerts
    socket.on("geofence-alert", (data) => {
      const newAlert = {
        id: Date.now() + Math.random(),
        vehicleId: data.vehicleId,
        timestamp: data.timestamp
      };
      setAlerts((prev) => [newAlert, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="dashboard-header">
        <h1>Fleet Dashboard</h1>
        <p>Welcome back, Team Alpha 👋</p>
      </div>

      {/* KPI Cards */}
      <DashboardCards />

      {/* Weekly Trips Chart */}
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <FleetChart />
      </div>

      {/* Vehicle Status Pie Chart */}
      <div style={{ marginBottom: "20px" }}>
        <VehicleStatusChart />
      </div>

      {/* Fleet Map */}
      <div style={{ marginBottom: "20px" }}>
        <FleetMap vehicles={vehicles} />
      </div>

      {/* Vehicle Table + Alerts */}
      <div className="dashboard-grid">
        <VehicleTable liveVehicles={vehicles} />

        <div className="panel">
          <h3>Recent Alerts</h3>

          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} className="alert-item-live">
                🚨 GEOFENCE BREACH - Vehicle {alert.vehicleId} ({new Date(alert.timestamp).toLocaleTimeString()})
              </li>
            ))}
            <li>🚨 Overspeed detected - Vehicle VH1001</li>
            <li>🔌 Vehicle disconnected - Vehicle VH1002</li>
            <li>⛽ Low fuel warning - Vehicle VH1003</li>
            <li>🔧 Maintenance due - Vehicle VH1004</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
import "./Dashboard.css";

import DashboardCards from "../components/DashboardCards";
import FleetChart from "../components/FleetChart";
import VehicleStatusChart from "../components/VehicleStatusChart";
import FleetMap from "../components/FleetMap";
import VehicleTable from "../components/VehicleTable";

export default function Dashboard() {
  return (
    <div>
      <div className="dashboard-header">
        <h1>Fleet Dashboard</h1>
        <p>Welcome back, Nikhil 👋</p>
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
        <FleetMap />
      </div>

      {/* Vehicle Table + Alerts */}
      <div className="dashboard-grid">
        <VehicleTable />

        <div className="panel">
          <h3>Recent Alerts</h3>

          <ul>
            <li>🚨 Overspeed detected - Vehicle VH1001</li>
            <li>🔌 Vehicle disconnected - Vehicle VH1002</li>
            <li>⛽ Low fuel warning - Vehicle VH1003</li>
            <li>🔧 Maintenance due - Vehicle VH1004</li>
            <li>📍 Geofence breach detected</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
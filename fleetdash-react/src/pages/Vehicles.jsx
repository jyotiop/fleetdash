import { FiTruck, FiTrendingUp, FiCpu, FiTool } from "react-icons/fi";
import VehicleTable from "../components/VehicleTable";
import "../pages/Dashboard.css"; // Reuse the dashboard layout classes

export default function Vehicles() {
  return (
    <div>
      <div className="dashboard-header">
        <h1>Vehicle Management</h1>
        <p>Real-time vehicle status and registry logs</p>
      </div>

      {/* KPI Cards */}
      <div className="cards-grid" style={{ marginBottom: "24px" }}>
        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--primary), var(--accent-cyan))" }}>
            <FiTruck />
          </div>
          <h2>1,284</h2>
          <p>Total Fleet Size</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--success), var(--accent-cyan))" }}>
            <FiTrendingUp />
          </div>
          <h2>987</h2>
          <p>Active In Transit</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--warning), var(--accent-magenta))" }}>
            <FiCpu />
          </div>
          <h2>254</h2>
          <p>Eco-drive Status</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--danger), var(--accent-purple))" }}>
            <FiTool />
          </div>
          <h2>43</h2>
          <p>Scheduled Maintenance</p>
        </div>
      </div>

      {/* Main Table view */}
      <div style={{ marginTop: "20px" }}>
        <VehicleTable />
      </div>
    </div>
  );
}
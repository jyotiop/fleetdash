import { FiAlertOctagon, FiAlertTriangle, FiCheckCircle, FiActivity } from "react-icons/fi";
import "../pages/Dashboard.css";

export default function Alerts() {
  const alertsList = [
    { id: 1, type: "GEOFENCE_BREACH", vehicle: "TRUCK-999", severity: "Critical", desc: "Entered restricted warehouse zone boundary", time: "Just Now", status: "Active" },
    { id: 2, type: "OVERSPEEDING", vehicle: "VH1001", severity: "Warning", desc: "Exceeded speed threshold: 104 km/h", time: "25 Mins Ago", status: "Active" },
    { id: 3, type: "DISCONNECTED", vehicle: "VH1002", severity: "Critical", desc: "GPS ping lost for over 15 minutes", time: "1 Hour Ago", status: "Investigating" },
    { id: 4, type: "FUEL_LEVEL_LOW", vehicle: "VH1003", severity: "Warning", desc: "Fuel tank below reserve capacity (8%)", time: "3 Hours Ago", status: "Resolved" },
    { id: 5, type: "MAINTENANCE_DUE", vehicle: "VH1004", severity: "Info", desc: "Scheduled engine diagnostic required", time: "1 Day Ago", status: "Resolved" }
  ];

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return { background: "rgba(244, 63, 94, 0.12)", color: "#fb7185", border: "1px solid rgba(244, 63, 94, 0.25)", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "12px" };
      case "Warning":
        return { background: "rgba(245, 158, 11, 0.12)", color: "#fbbf24", border: "1px solid rgba(245, 158, 11, 0.25)", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "12px" };
      default:
        return { background: "rgba(59, 130, 246, 0.12)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.25)", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "12px" };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return { color: "#f43f5e", fontWeight: "700" };
      case "Resolved":
        return { color: "#10b981", fontWeight: "600" };
      default:
        return { color: "#f59e0b", fontWeight: "600" };
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Incident Center & Alerts</h1>
        <p>Monitor geofence breaches, vehicle parameters, and connections</p>
      </div>

      {/* KPI Cards */}
      <div className="cards-grid" style={{ marginBottom: "24px" }}>
        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--danger), var(--accent-purple))" }}>
            <FiAlertOctagon />
          </div>
          <h2>14</h2>
          <p>Critical Incidents</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--warning), var(--accent-magenta))" }}>
            <FiAlertTriangle />
          </div>
          <h2>28</h2>
          <p>Pending Warnings</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--success), var(--accent-cyan))" }}>
            <FiCheckCircle />
          </div>
          <h2>156</h2>
          <p>Resolved Today</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--info), var(--primary))" }}>
            <FiActivity />
          </div>
          <h2>9 mins</h2>
          <p>Avg Resolution Time</p>
        </div>
      </div>

      {/* Alerts Logs Panel */}
      <div className="panel">
        <h3>System Alerts Feed</h3>
        <div style={{ overflowX: "auto", marginTop: "15px" }}>
          <table>
            <thead>
              <tr style={{ color: "var(--text-muted)", fontSize: "13px", textAlign: "left" }}>
                <th style={{ padding: "14px", fontWeight: "600" }}>Incident Type</th>
                <th style={{ padding: "14px", fontWeight: "600" }}>Vehicle ID</th>
                <th style={{ padding: "14px", fontWeight: "600" }}>Severity</th>
                <th style={{ padding: "14px", fontWeight: "600" }}>Description</th>
                <th style={{ padding: "14px", fontWeight: "600" }}>Reported Time</th>
                <th style={{ padding: "14px", fontWeight: "600" }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {alertsList.map((alert) => (
                <tr 
                  key={alert.id}
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
                  <td style={{ padding: "14px", fontWeight: "700", color: "#f8fafc" }}>
                    {alert.type}
                  </td>
                  <td style={{ padding: "14px", fontWeight: "600" }}>{alert.vehicle}</td>
                  <td style={{ padding: "14px" }}>
                    <span style={getSeverityStyle(alert.severity)}>
                      {alert.severity}
                    </span>
                  </td>
                  <td style={{ padding: "14px", color: "var(--text-muted)" }}>{alert.desc}</td>
                  <td style={{ padding: "14px", color: "var(--text-muted)", fontSize: "13px" }}>{alert.time}</td>
                  <td style={{ padding: "14px", style: getStatusStyle(alert.status) }}>
                    <span style={getStatusStyle(alert.status)}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
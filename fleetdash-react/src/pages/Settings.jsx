import { FiSettings, FiSliders, FiDatabase, FiBell, FiLock } from "react-icons/fi";
import "../pages/Dashboard.css";

export default function Settings() {
  return (
    <div>
      <div className="dashboard-header">
        <h1>Control Panel & Settings</h1>
        <p>Configure geofence boundaries, API parameters, and notifications</p>
      </div>

      <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        
        {/* Geofence & Ingestion Settings */}
        <div className="panel">
          <h3><FiSliders style={{ marginRight: "8px" }} /> Ingestion & Geofencing</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
            
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px" }}>
                Active Geofence Polygon (Warehouse Boundary)
              </label>
              <textarea 
                defaultValue="[ [77.3910, 28.5355], [77.3950, 28.5355], [77.3950, 28.5310], [77.3910, 28.5310], [77.3910, 28.5355] ]"
                rows="3"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-glass)",
                  background: "rgba(255,255,255,0.02)",
                  color: "white",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                  Ingestion PORT
                </label>
                <input 
                  type="text" 
                  defaultValue="3000"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-glass)",
                    background: "rgba(255,255,255,0.02)",
                    color: "white",
                    outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                  Socket.io Port
                </label>
                <input 
                  type="text" 
                  defaultValue="3000"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-glass)",
                    background: "rgba(255,255,255,0.02)",
                    color: "white",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            <div>
              <button style={{
                background: "linear-gradient(135deg, var(--primary), var(--accent-purple))",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "14px",
                width: "100%"
              }}>
                Apply Ingestion Settings
              </button>
            </div>

          </div>
        </div>

        {/* Database & Alerts Settings */}
        <div className="panel">
          <h3><FiDatabase style={{ marginRight: "8px" }} /> Database & Notifications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
            
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px" }}>
                MongoDB Bucket Aggregation Interval (Hours)
              </label>
              <select style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid var(--border-glass)",
                background: "#0c1424",
                color: "white",
                outline: "none"
              }}>
                <option>1 Hour (Default)</option>
                <option>2 Hours</option>
                <option>6 Hours</option>
                <option>24 Hours</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", marginBottom: "12px" }}>
                Alert Broadcast Preferences
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)" }}>
                  <input type="checkbox" defaultChecked /> Web Browser Instant Push Notifications
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)" }}>
                  <input type="checkbox" defaultChecked /> Slack Webhook Warnings
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)" }}>
                  <input type="checkbox" /> E-mail Dispatch Report Alerts
                </label>
              </div>
            </div>

            <div>
              <button style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-glass)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "14px",
                width: "100%"
              }}>
                Reset to Default Parameters
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
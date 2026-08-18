import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from "recharts";
import { FiBarChart2, FiActivity, FiMapPin, FiNavigation } from "react-icons/fi";
import "../pages/Dashboard.css";

const tripData = [
  { name: "Mon", trips: 340, distance: 4800 },
  { name: "Tue", trips: 380, distance: 5200 },
  { name: "Wed", trips: 410, distance: 5900 },
  { name: "Thu", trips: 360, distance: 4900 },
  { name: "Fri", trips: 390, distance: 5400 },
  { name: "Sat", trips: 220, distance: 3100 },
  { name: "Sun", trips: 180, distance: 2400 }
];

const fuelEfficiencyData = [
  { name: "TRUCK-999", efficiency: 8.2 },
  { name: "VH1001", efficiency: 7.5 },
  { name: "VH1002", efficiency: 6.8 },
  { name: "VH1003", efficiency: 7.9 },
  { name: "VH1004", efficiency: 5.4 }
];

export default function Analytics() {
  return (
    <div>
      <div className="dashboard-header">
        <h1>Fleet Operations Analytics</h1>
        <p>Operational reports, fuel efficiency stats, and distance logs</p>
      </div>

      {/* KPI Cards */}
      <div className="cards-grid" style={{ marginBottom: "24px" }}>
        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--primary), var(--accent-cyan))" }}>
            <FiActivity />
          </div>
          <h2>31,700 km</h2>
          <p>Total Traveled Distance</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-magenta))" }}>
            <FiNavigation />
          </div>
          <h2>2,280</h2>
          <p>Completed Trips</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--success), var(--accent-cyan))" }}>
            <FiBarChart2 />
          </div>
          <h2>7.1 km/L</h2>
          <p>Avg Fuel Efficiency</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon" style={{ background: "linear-gradient(135deg, var(--warning), var(--danger))" }}>
            <FiMapPin />
          </div>
          <h2>14,830 L</h2>
          <p>Fuel Consumed</p>
        </div>
      </div>

      {/* Charts Display Grid */}
      <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="panel">
          <h3>Trips & Distance Overview</h3>
          <div style={{ height: "300px", marginTop: "15px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tripData}>
                <defs>
                  <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0c1424", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }} />
                <Area type="monotone" dataKey="trips" stroke="var(--primary)" fillOpacity={1} fill="url(#colorTrips)" strokeWidth={2} name="Trips Done" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <h3>Vehicle Fuel Efficiency (km/L)</h3>
          <div style={{ height: "300px", marginTop: "15px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0c1424", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
                <Bar dataKey="efficiency" fill="url(#grad)" name="Efficiency (km/L)">
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-purple)" />
                      <stop offset="100%" stopColor="var(--accent-magenta)" />
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
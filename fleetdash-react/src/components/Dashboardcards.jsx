import "./DashboardCards.css";
import {
  FiTruck,
  FiWifi,
  FiAlertTriangle,
  FiTrendingUp
} from "react-icons/fi";

const cards = [
  {
    title: "Total Vehicles",
    value: "1284",
    icon: <FiTruck />,
    color: "#2563EB"
  },
  {
    title: "Online",
    value: "987",
    icon: <FiWifi />,
    color: "#22C55E"
  },
  {
    title: "Alerts",
    value: "42",
    icon: <FiAlertTriangle />,
    color: "#EF4444"
  },
  {
    title: "Trips Today",
    value: "356",
    icon: <FiTrendingUp />,
    color: "#8B5CF6"
  }
];

export default function DashboardCards() {
  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <div className="dashboard-card" key={card.title}>
          <div
            className="dashboard-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <h2>{card.value}</h2>
          <p>{card.title}</p>
        </div>
      ))}
    </div>
  );
}
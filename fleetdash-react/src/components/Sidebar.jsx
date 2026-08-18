import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiTruck,
  FiAlertTriangle,
  FiBarChart2,
  FiSettings,
  FiX
} from "react-icons/fi";

import "./Sidebar.css";

const menus = [
  { name: "Dashboard", path: "/", icon: <FiGrid /> },
  { name: "Vehicles", path: "/vehicles", icon: <FiTruck /> },
  { name: "Alerts", path: "/alerts", icon: <FiAlertTriangle /> },
  { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> }
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>

      <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
        <FiX />
      </button>

      <h2 className="logo">
        FleetDash
      </h2>

      <nav>

        {menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            end={menu.path === "/"}
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
            onClick={onClose}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}
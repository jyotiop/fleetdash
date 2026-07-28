import "./Navbar.css";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">

      <button className="menu-btn" onClick={onMenuClick}>
        <FiMenu />
      </button>

      <div className="search-box">
        <FiSearch />
        <input
          type="text"
          placeholder="Search vehicles..."
        />
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <FiBell />
        </button>

        <div className="profile">

          <div className="avatar">
            PN
          </div>

          <div>
            <h4>Nikhil</h4>
            <small>Administrator</small>
          </div>

        </div>

      </div>

    </header>
  );
}
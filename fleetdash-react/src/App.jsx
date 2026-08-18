import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import "./App.css";

export default function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="app-shell">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="app-main">

        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="app-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/vehicles"
              element={<Vehicles />}
            />

            <Route
              path="/alerts"
              element={<Alerts />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </div>

  );

}
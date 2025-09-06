import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [user, setUser] = useState({ name: "User", email: "email@example.com" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user data in localStorage", e);
      }
    }
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo">SubTrack</h2>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="user-info">
        <img
          src={`https://i.pravatar.cc/40?u=${user.email || "default"}`}
          alt={user.name || "User"}
        />
        <div>
          <p>{user.name}</p>
          <p className="email">{user.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

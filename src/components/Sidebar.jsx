import React, { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [user, setUser] = useState({ name: "User", email: "email@example.com" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo">SubTrack</h2>
        <nav className="nav">
          <a className="active">Dashboard</a>
          <a>Subscriptions</a>
          <a>Reports</a>
          <a>Settings</a>
        </nav>
      </div>

      <div className="user-info">
        <img
          src={`https://i.pravatar.cc/40?u=${user.email}`}
          alt={user.name}
        />
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

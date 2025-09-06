import React, { useEffect, useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [user, setUser] = useState({ name: "User", email: "email@example.com" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <aside className="w-64 bg-[#111827] p-6 flex flex-col justify-between shadow-lg">
      <div>
        <h2 className="text-2xl font-bold text-indigo-400 mb-8">SubTrack</h2>
        <nav className="space-y-3">
          <a className="block px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md">
            Dashboard
          </a>
          <a className="block px-4 py-2 hover:bg-[#1e293b] rounded-lg">Subscriptions</a>
          <a className="block px-4 py-2 hover:bg-[#1e293b] rounded-lg">Reports</a>
          <a className="block px-4 py-2 hover:bg-[#1e293b] rounded-lg">Settings</a>
        </nav>
      </div>

      {/* User Info */}
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

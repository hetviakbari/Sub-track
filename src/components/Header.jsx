import React from "react";
import { Plus, Bell } from "lucide-react";
import Button from "./ui/Button";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">Dashboard</h1>
      <div className="actions">
        <Button>
          <Plus size={18} className="mr-1" /> Add Subscription
        </Button>
        <Bell className="icon" />
      </div>
    </div>
  );
};

export default Header;

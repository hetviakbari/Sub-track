import React from "react";
import { Plus, Bell } from "lucide-react";
import Button from "./ui/Button";

const Header = () => {
  return (
    <div className="header flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <Button>
          <Plus size={18} className="inline-block mr-1" /> Add Subscription
        </Button>
        <Bell className="icon" />
      </div>
    </div>
  );
};

export default Header;

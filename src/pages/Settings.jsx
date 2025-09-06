import React from "react";
import Sidebar from "../components/Sidebar";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="settings-page">
        <h1>Settings</h1>
        <div className="settings-grid">

          {/* Account Section */}
          <section className="settings-section">
            <h2>Account</h2>
            <p>Update your account information.</p>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Jane Doe" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="jane.doe@example.com" />
            </div>
            <button className="btn save">Save Changes</button>
          </section>

          {/* Notifications Section */}
          <section className="settings-section">
            <h2>Manage Notifications</h2>
            <p>Customize your notification preferences.</p>
            <div className="form-group checkbox">
              <label>
                <input type="checkbox" /> Payment Reminders
              </label>
              <small>Get notified before a subscription payment is due.</small>
            </div>
            <div className="form-group">
              <label>Notification Type</label>
              <select>
                <option>Email & Push Notifications</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notification Frequency</label>
              <select>
                <option>3 days before</option>
              </select>
            </div>
            <button className="btn save">Save Preferences</button>
          </section>

          {/* Currency Section */}
          <section className="settings-section">
            <h2>Currency</h2>
            <p>Preferred Currency</p>
            <div className="form-group">
              <select>
                <option>EUR - Euro</option>
                <option>USD - Dollar</option>
              </select>
            </div>
          </section>

          {/* Data Privacy Section */}
          <section className="settings-section">
            <h2>Data Privacy</h2>
            <p>Control how your data is used.</p>
            <div className="link-item">
              <span>Privacy Settings</span>
              <span className="chevron">›</span>
            </div>
          </section>

          {/* Help & Support Section */}
          <section className="settings-section">
            <h2>Help & Support</h2>
            <div className="link-item">
              <span>Help Center</span>
              <span className="chevron">›</span>
            </div>
            <div className="link-item">
              <span>Contact Support</span>
              <span className="chevron">›</span>
            </div>
            <div className="link-item">
              <span>App Version</span>
              <span>1.2.3</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;

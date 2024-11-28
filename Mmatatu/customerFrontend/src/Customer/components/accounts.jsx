import React, { useState } from "react";
import { User, Lock, Bell, CreditCard, Shield, LogOut } from "lucide-react";

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    profilePicture: "/api/placeholder/200/200",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyDigest: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "friends",
    dataSharing: false,
  });

  const handleProfileUpdate = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const toggleNotification = (setting) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <section className=" h-[calc(100vh-72px)] bg-white text-gray-800 py-10">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <User className="mr-3" /> Account Settings
        </h1>

        {/* Profile Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2" /> Personal Profile
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileUpdate("name", e.target.value)}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileUpdate("email", e.target.value)}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2" /> Notification Settings
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Email Alerts</span>
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={() => toggleNotification("emailAlerts")}
                className="toggle"
              />
            </div>
            <div className="flex justify-between items-center">
              <span>Push Notifications</span>
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={() => toggleNotification("pushNotifications")}
                className="toggle"
              />
            </div>
            <div className="flex justify-between items-center">
              <span>Weekly Digest</span>
              <input
                type="checkbox"
                checked={notifications.weeklyDigest}
                onChange={() => toggleNotification("weeklyDigest")}
                className="toggle"
              />
            </div>
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2" /> Privacy & Security
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Profile Visibility
              </label>
              <select
                value={privacySettings.profileVisibility}
                onChange={(e) =>
                  setPrivacySettings((prev) => ({
                    ...prev,
                    profileVisibility: e.target.value,
                  }))
                }
                className="bg-white w-full p-2 border rounded"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span>Data Sharing</span>
              <input
                type="checkbox"
                checked={privacySettings.dataSharing}
                onChange={() =>
                  setPrivacySettings((prev) => ({
                    ...prev,
                    dataSharing: !prev.dataSharing,
                  }))
                }
                className="toggle"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Changes
          </button>
          <button className="text-red-500 flex items-center hover:underline">
            <LogOut className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;

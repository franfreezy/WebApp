import { useState } from "react";
import { FaBus, FaWallet, FaBell, FaUser, FaBars } from "react-icons/fa";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-blue-600 text-white h-screen ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      <button
        className="text-white text-2xl p-4"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
      <div className="flex flex-col items-center mt-4 space-y-4">
        <NavItem
          icon={<FaWallet />}
          label="View Balance"
          isCollapsed={isCollapsed}
          href="/dashboard"
        />
        <NavItem
          icon={<FaBus />}
          label="Track Buses"
          isCollapsed={isCollapsed}
          href="/dashboard/track"
        />
        <NavItem
          icon={<FaBell />}
          label="Notifications"
          isCollapsed={isCollapsed}
          href="/dashboard/notifications"
        />
        <NavItem
          icon={<FaUser />}
          label="Account Settings"
          isCollapsed={isCollapsed}
          href="/dashboard/account"
        />
      </div>
    </div>
  );
}

function NavItem({ icon, label, isCollapsed, href }) {
  return (
    <a
      href={href}
      className="flex items-center w-full px-4 py-2 text-white hover:bg-blue-700 rounded-md"
    >
      {icon}
      {!isCollapsed && <span className="ml-4">{label}</span>}
    </a>
  );
}

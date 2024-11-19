import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    "New passenger boarded",
    "Passenger balance insufficient",
  ]);

  return (
    <div className="bg-white p-4 rounded shadow text-gray-800">
      <h2 className="text-lg font-bold mb-2">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="bg-gray-100 p-2 rounded shadow text-gray-700"
          >
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
}

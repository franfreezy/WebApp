import React, { useState } from "react";
import { Bell, MapPin, Clock, AlertCircle } from "lucide-react";

const NotificationsDashboard = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "route",
      icon: <MapPin className="text-blue-500" />,
      title: "Route Update",
      message: "Your usual route has a 15-minute delay",
      timestamp: "10 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      icon: <AlertCircle className="text-red-500" />,
      title: "Traffic Warning",
      message: "Accident on Highway 101 near exit 25",
      timestamp: "25 mins ago",
      read: false,
    },
    {
      id: 3,
      type: "schedule",
      icon: <Clock className="text-green-500" />,
      title: "Schedule Reminder",
      message: "Next bus arrives in 5 minutes",
      timestamp: "1 hour ago",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Bell className="mr-2" /> Notifications
        </h2>
        <span className="text-sm text-gray-500">
          {notifications.filter((n) => !n.read).length} unread
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start p-3 rounded-lg ${
              !notification.read
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "bg-gray-50"
            }`}
          >
            <div className="mr-3">{notification.icon}</div>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{notification.title}</h3>
                <span className="text-xs text-gray-500">
                  {notification.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-700">{notification.message}</p>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="mt-2 text-xs text-blue-600 hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:underline">
          <a href="/dashboard/notifications">View all notifications</a>
        </button>
      </div>
    </div>
  );
};

export default NotificationsDashboard;

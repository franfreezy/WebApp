export default function NotificationPanel() {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <p className="text-sm text-gray-500">
        Receive alerts when your bus is near your stop.
      </p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Manage Notifications
      </button>
    </div>
  );
}

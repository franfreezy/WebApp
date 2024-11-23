export default function ControlPanel() {
  return (
    <div className="bg-white p-4 flex justify-around items-center shadow">
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Start Route
      </button>
      <button className="bg-gray-600 text-white px-4 py-2 rounded">
        Emergency Contact
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        End Route
      </button>
    </div>
  );
}

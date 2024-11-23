export default function PassengerList() {
  const passengers = [
    { id: 1, name: "John Doe", balance: "$10" },
    { id: 2, name: "Jane Smith", balance: "Insufficient" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow text-gray-800">
      <h2 className="text-lg font-bold mb-2">Passengers</h2>
      <ul className="space-y-2">
        {passengers.map((passenger) => (
          <li
            key={passenger.id}
            className={`flex justify-between items-center p-2 rounded ${
              passenger.balance === "Insufficient"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            <span>{passenger.name}</span>
            <span>{passenger.balance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

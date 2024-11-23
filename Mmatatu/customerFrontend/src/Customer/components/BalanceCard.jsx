export default function BalanceCard() {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold">Balance</h2>
      <p className="text-2xl font-bold text-green-500">KSh 1,200</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Recharge via M-Pesa
      </button>
    </div>
  );
}

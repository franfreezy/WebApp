import BalanceCard from "./components/BalanceCard";
import Header from "./components/Header";
import NotificationPanel from "./components/NotificationPanel";
import Sidebar from "./components/Sidebar";

export default function CustomerDashboard() {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <main className="flex-1">
        <Header title="Customer Dashboard" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <BalanceCard />
          <NotificationPanel />
        </div>
        <div className="mt-6">{/* <BusMap /> */}</div>
      </main>
    </div>
  );
}

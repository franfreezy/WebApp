import BalanceCard from "./BalanceCard";
import NotificationPanel from "./NotificationPanel";

const Dash = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <BalanceCard />
      <NotificationPanel />
    </div>
  );
};

export default Dash;

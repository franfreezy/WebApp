import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import Select from "react-select";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const RevenueCollectionPage = () => {
  const [filter, setFilter] = useState("daily"); // daily, weekly, monthly
  const [revenueData, setRevenueData] = useState({
    daily: 1200,
    weekly: 8400,
    monthly: 35000,
  });
  const [earningsPerRouteData, setEarningsPerRouteData] = useState([]);
  const [historicalRevenueData, setHistoricalRevenueData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue Trend",
        data: [10000, 15000, 13000, 18000, 20000, 22000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  const earningsPerRoute = [
    { route: "Route A", revenue: 5000 },
    { route: "Route B", revenue: 3000 },
    { route: "Route C", revenue: 7000 },
  ];

  // Update earnings and trends based on the selected filter
  useEffect(() => {
    const fetchFilteredData = () => {
      if (filter === "daily") {
        setRevenueData({ daily: 1200, weekly: 8400, monthly: 35000 });
        setEarningsPerRouteData([
          { route: "Route A", revenue: 500 },
          { route: "Route B", revenue: 300 },
          { route: "Route C", revenue: 700 },
        ]);
        setHistoricalRevenueData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue Trend (Daily)",
              data: [1200, 1100, 1300, 1400, 1500, 1600],
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        });
      } else if (filter === "weekly") {
        setRevenueData({ daily: 1200, weekly: 8400, monthly: 35000 });
        setEarningsPerRouteData([
          { route: "Route A", revenue: 3500 },
          { route: "Route B", revenue: 2500 },
          { route: "Route C", revenue: 5000 },
        ]);
        setHistoricalRevenueData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue Trend (Weekly)",
              data: [8000, 7500, 9500, 10000, 10500, 12000],
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
          ],
        });
      } else if (filter === "monthly") {
        setRevenueData({ daily: 1200, weekly: 8400, monthly: 35000 });
        setEarningsPerRouteData([
          { route: "Route A", revenue: 15000 },
          { route: "Route B", revenue: 12000 },
          { route: "Route C", revenue: 17000 },
        ]);
        setHistoricalRevenueData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue Trend (Monthly)",
              data: [30000, 35000, 33000, 37000, 39000, 40000],
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              fill: true,
            },
          ],
        });
      }
    };

    fetchFilteredData();
  }, [filter]);

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption.value);
  };

  return (
    <div style={{ padding: "20px" }} className="text-gray-800">
      <h2>Revenue Collection</h2>

      {/* Revenue Filter */}
      <div style={{ marginBottom: "20px" }}>
        <Select
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ]}
          value={{
            value: filter,
            label: filter.charAt(0).toUpperCase() + filter.slice(1),
          }}
          onChange={handleFilterChange}
        />
      </div>

      {/* Revenue Summary */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Total Revenue</h3>
        <p>{`$${revenueData[filter]}`}</p>
      </div>

      {/* Earnings Per Route */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Earnings Per Route</h3>
        <Bar
          data={{
            labels: earningsPerRoute.map((route) => route.route),
            datasets: [
              {
                data: earningsPerRouteData.map((route) => route.revenue),
                backgroundColor: "rgba(0, 123, 255, 0.5)",
              },
            ],
          }}
        />
      </div>

      {/* Historical Revenue Trends */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Historical Revenue Trends</h3>
        <Line data={historicalRevenueData} />
      </div>
    </div>
  );
};

export default RevenueCollectionPage;

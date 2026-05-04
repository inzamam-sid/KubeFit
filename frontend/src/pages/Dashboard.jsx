import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import RevenueChart from "../components/RevenueChart";
import MemberChart from "../components/MemberChart";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState("30d");

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

//   const fetchChart = async () => {
//   const res = await API.get("/dashboard/revenue-chart");
//   setChartData(res.data);
// };
  const fetchChart = async (selectedRange = "30d") => {
    const res = await API.get(`/dashboard/revenue-chart?range=${selectedRange}`);
    setChartData(res.data);
  };

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  } else {
    fetchStats();
    fetchChart(range);
  }
}, [range]);

  if (!stats) return <h2>Loading...</h2>;

  return (
  <Layout>
    <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Members" value={stats.totalMembers} color="blue" />
      <Card title="Active Members" value={stats.activeMembers} color="green" />
      <Card title="Hold Members" value={stats.holdMembers} color="yellow" />
      <Card title="Expiring Today" value={stats.expiringToday} color="orange" />
      <Card title="Overdue Members" value={stats.overdueMembers} color="red" />
      <Card title="Revenue" value={`₹${stats.monthlyRevenue}`} color="purple" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <RevenueChart data={chartData} />
      <MemberChart stats={stats} />
    </div>
  </Layout>
);
};

const Card = ({ title, value, color }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      
      <div className={`inline-block px-3 py-1 rounded-full text-sm mb-3 ${colorMap[color]}`}>
        {title}
      </div>

      {/* <h2 className="text-3xl font-bold">{value}</h2> */}
      <h2 className="text-3xl font-bold flex items-center gap-2">
        📊 {value}
      </h2>
    </div>
  );
};
export default Dashboard;
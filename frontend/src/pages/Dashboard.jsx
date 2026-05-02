import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  } else {
    fetchStats();
  }
}, []);

  if (!stats) return <h2>Loading...</h2>;

  return (
  <Layout>
    <h2>Dashboard</h2>

    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <Card title="Total Members" value={stats.totalMembers} />
      <Card title="Active Members" value={stats.activeMembers} />
      <Card title="Hold Members" value={stats.holdMembers} />
      <Card title="Expiring Today" value={stats.expiringToday} />
      <Card title="Overdue Members" value={stats.overdueMembers} />
      <Card title="Revenue" value={`₹${stats.monthlyRevenue}`} />
    </div>
  </Layout>
);
};

const Card = ({ title, value }) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        minWidth: "220px",
      }}
    >
      <p style={{ color: "#888" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
};
export default Dashboard;
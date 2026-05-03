import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

const Alerts = () => {
  const [expiring, setExpiring] = useState([]);
  const [overdue, setOverdue] = useState([]);

  const fetchData = async () => {
    try {
      const exp = await API.get("/subscriptions/expiring-today");
      const over = await API.get("/subscriptions/overdue");

      setExpiring(exp.data.subscriptions);
      setOverdue(over.data.subscriptions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h2>Alerts</h2>

      {/* 🔴 Overdue */}
      <h3 style={{ color: "red" }}>Overdue Members</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Package</th>
            <th>End Date</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {overdue.map((s) => (
            <tr key={s._id}>
              <td>{s.memberId?.name}</td>
              <td>{s.packageId?.name}</td>
              <td>{new Date(s.endDate).toLocaleDateString()}</td>
              <td>{s.memberId?.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* 🟡 Expiring Today */}
      <h3 style={{ color: "orange" }}>Expiring Today</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Package</th>
            <th>End Date</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {expiring.map((s) => (
            <tr key={s._id}>
              <td>{s.memberId?.name}</td>
              <td>{s.packageId?.name}</td>
              <td>{new Date(s.endDate).toLocaleDateString()}</td>
              <td>{s.memberId?.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Alerts;
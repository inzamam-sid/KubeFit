import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = async () => {
    try {
      const res = await API.get("/subscriptions");
      setSubscriptions(res.data.subscriptions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // ⏸ Hold
  const holdSub = async (id) => {
    await API.post(`/subscriptions/${id}/hold`);
    fetchSubscriptions();
  };

  // ▶ Resume
  const resumeSub = async (id) => {
    await API.post(`/subscriptions/${id}/resume`);
    fetchSubscriptions();
  };

  const getStatusColor = (status) => {
    if (status === "active") return "green";
    if (status === "hold") return "orange";
    return "red";
  };

  return (
    <Layout>
      <h2>Subscriptions</h2>

     <table className="w-full bg-white rounded-xl shadow overflow-hidden">
  <thead className="bg-gray-200">
    <tr>
      <th className="p-3 text-left">Member</th>
      <th className="p-3 text-left">Package</th>
      <th className="p-3">Start</th>
      <th className="p-3">End</th>
      <th className="p-3">Status</th>
      <th className="p-3">Action</th>
    </tr>
  </thead>

  <tbody>
    {subscriptions.map((s) => (
      <tr key={s._id} className="border-t">
        
        <td className="p-3">
          {s.memberId?.name}
          <div className="text-sm text-gray-500">
            {s.memberId?.memberId}
          </div>
        </td>

        <td className="p-3">{s.packageId?.name}</td>

        <td className="p-3 text-center">
          {new Date(s.startDate).toLocaleDateString()}
        </td>

        <td className="p-3 text-center">
          {new Date(s.endDate).toLocaleDateString()}
        </td>

        <td className="p-3 text-center">
          <span className={`px-3 py-1 rounded-full text-white text-sm ${
            s.status === "active" ? "bg-green-500" :
            s.status === "hold" ? "bg-yellow-500" :
            "bg-red-500"
          }`}>
            {s.status}
          </span>
        </td>

        <td className="p-3 text-center">
          {s.status === "active" && (
            <button
              onClick={() => holdSub(s._id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Hold
            </button>
          )}

          {s.status === "hold" && (
            <button
              onClick={() => resumeSub(s._id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Resume
            </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </Layout>
  );
};

export default SubscriptionList;
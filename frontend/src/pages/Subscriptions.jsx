import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

const Subscriptions = () => {
  const [members, setMembers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    memberId: "",
    packageId: "",
    finalPrice: "",
  });

  // 📥 Fetch members
  const fetchMembers = async () => {
    const res = await API.get("/members");
    setMembers(res.data.members);
  };

  // 📦 Fetch packages
  const fetchPackages = async () => {
    const res = await API.get("/packages");
    console.log(res.data);
    setPackages(res.data.packages);
  };

  useEffect(() => {
    fetchMembers();
    fetchPackages();
  }, []);

  // ➕ Create subscription
  const createSubscription = async () => {
    if (!form.memberId || !form.packageId) {
  alert("Select member and package");
  return;
}
    try {
    //   await API.post("/subscriptions", form);
            await API.post("/subscriptions", {
        ...form,
        finalPrice: form.finalPrice ? Number(form.finalPrice) : undefined,
        });
      alert("Subscription created");
      setForm({ memberId: "", packageId: "", finalPrice: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <Layout>
      <h2>Assign Subscription</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        
        {/* Member Dropdown */}
        <select
          value={form.memberId}
          onChange={(e) =>
            setForm({ ...form, memberId: e.target.value })
          }
        >
          <option value="">Select Member</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name} ({m.memberId})
            </option>
          ))}
        </select>

        {/* Package Dropdown */}
       <select
        value={form.packageId}
        onChange={(e) =>
            setForm({ ...form, packageId: e.target.value })
        }
        >
        <option value="">Select Package</option>

        {packages.map((p) => (
            <option key={p._id} value={p._id}>
            {p.name} - ₹{p.price}
            </option>
        ))}
        </select>
        

        {/* Discount Price */}
        <input
          placeholder="Final Price (optional)"
          value={form.finalPrice}
          onChange={(e) =>
            setForm({ ...form, finalPrice: e.target.value })
          }
        />

        <button onClick={createSubscription}>Create</button>
      </div>
    </Layout>
  );
};

export default Subscriptions;




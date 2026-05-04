import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
  });

  // 📥 Fetch packages
  const fetchPackages = async () => {
    try {
      const res = await API.get("/packages");
      setPackages(res.data.packages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // ➕ Add package
  const addPackage = async () => {
    if (!form.name || !form.duration || !form.price) {
      alert("All fields required");
      return;
    }

    try {
      await API.post("/packages", form);
      alert("Package added");

      setForm({ name: "", duration: "", price: "" });
      fetchPackages();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // ❌ Disable package
  const disablePackage = async (id) => {
    if (!window.confirm("Disable this package?")) return;

    try {
      await API.put(`/packages/${id}`);
      fetchPackages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Packages</h2>

      {/* ➕ Add Package */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h3 className="mb-4 font-semibold">Add Package</h3>

        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="Package Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Duration (days)"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <button
            onClick={addPackage}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* 📦 Packages List */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">All Packages</h3>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Price</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {packages.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.duration} days</td>
                <td className="p-2">₹{p.price}</td>

                <td className="p-2">
                  <button
                    onClick={() => disablePackage(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Packages;
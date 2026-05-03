import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    memberId: "",
    mobile: "",
  });
  const [editId, setEditId] = useState(null);

  // 📥 Fetch Members
  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data.members);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ➕ Add Member
  const addMember = async () => {
    try {
      await API.post("/members", form);
      alert("Member added");
      setForm({ name: "", memberId: "", mobile: "" });
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // ❌ Delete Member
  const deleteMember = async (id) => {
    try {
      await API.delete(`/members/${id}`);
      fetchMembers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (member) => {
  setForm({
    name: member.name,
    memberId: member.memberId,
    mobile: member.mobile,
  });

  setEditId(member._id);
};

const updateMember = async () => {
  try {
    await API.put(`/members/${editId}`, form);
    alert("Member updated");

    setEditId(null);
    setForm({ name: "", memberId: "", mobile: "" });

    fetchMembers();
  } catch (err) {
    alert("Update failed");
  }
};

  return (
    <Layout>
      <h2>Members</h2>

      {/* ➕ Add Member Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Member ID"
          value={form.memberId}
          onChange={(e) => setForm({ ...form, memberId: e.target.value })}
        />

        <input
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        {/* <button onClick={addMember}>Add</button> */}
        <button onClick={editId ? updateMember : addMember}>
          {editId ? "Update Member" : "Add Member"}
        </button>
      </div>

      {/* 📋 Members List */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Member ID</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.memberId}</td>
              <td>{m.mobile}</td>
              <td>
                <button onClick={() => handleEdit(m)}>Edit</button>
                <button onClick={() => deleteMember(m._id)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Members;
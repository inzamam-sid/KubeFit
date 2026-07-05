import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

// Ultra-Premium Gradients for both themes
const getGradients = (isDarkMode) => ({
  brand: isDarkMode 
    ? 'linear-gradient(135deg, #FF3B30 0%, #FF9500 50%, #FF3B30 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  brandAlt: isDarkMode 
    ? 'linear-gradient(135deg, #5856D6 0%, #FF9500 50%, #5856D6 100%)'
    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%)',
  card: isDarkMode 
    ? 'linear-gradient(135deg, rgba(28, 28, 30, 0.98) 0%, rgba(28, 28, 30, 0.95) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 240, 255, 0.95) 100%)',
  cardPremium: isDarkMode 
    ? 'linear-gradient(135deg, rgba(35, 35, 40, 0.98) 0%, rgba(25, 25, 30, 0.95) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 245, 255, 0.95) 100%)',
  dark: isDarkMode 
    ? 'linear-gradient(135deg, #1a1a1a 0%, #0D0D0D 50%, #1a1a1a 100%)'
    : 'linear-gradient(135deg, #f5f0ff 0%, #e8eaff 50%, #f5f0ff 100%)',
  purple: isDarkMode 
    ? 'linear-gradient(135deg, #5856D6 0%, #5E5CE6 100%)'
    : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  red: isDarkMode 
    ? 'linear-gradient(135deg, #FF3B30 0%, #FF453A 100%)'
    : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  orange: isDarkMode 
    ? 'linear-gradient(135deg, #FF9500 0%, #FF9F0A 100%)'
    : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  green: isDarkMode 
    ? 'linear-gradient(135deg, #34C759 0%, #30D158 100%)'
    : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  blue: isDarkMode 
    ? 'linear-gradient(135deg, #007AFF 0%, #0A84FF 100%)'
    : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  darkGray: isDarkMode 
    ? 'linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)'
    : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
  gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
  muscle: isDarkMode 
    ? 'linear-gradient(135deg, #8B0000 0%, #FF4500 50%, #8B0000 100%)'
    : 'linear-gradient(135deg, #DC2626 0%, #F97316 50%, #DC2626 100%)',
});

const Members = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    memberId: "",
    mobile: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const gradients = getGradients(isDarkMode);
  const bgGradient = isDarkMode 
    ? 'radial-gradient(ellipse at 20% 30%, #1a1a2e 0%, #0a0a0f 100%)'
    : 'radial-gradient(ellipse at 20% 30%, #f5f0ff 0%, #e8eaff 100%)';

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(
        `/members?search=${search}&page=${page}&limit=10`
      );
      setMembers(res.data.members);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [search, page]);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);


  // ✅ ADDED: Import CSV function
  const importCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await API.post("/members/import/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.message);
      fetchMembers();
    } catch (err) {
      alert("Import failed");
    }
  };



  const addMember = async () => {
    if (!form.name || !form.memberId || !form.mobile) {
      alert("⚠️ Please fill all fields");
      return;
    }
    try {
      await API.post("/members", form);
      alert("💪 Member added successfully!");
      setForm({ name: "", memberId: "", mobile: "" });
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding member");
    }
  };

  // const deleteMember = async (id) => {
  //   if (window.confirm("⚠️ Are you sure you want to delete this member?")) {
  //     try {
  //       await API.delete(`/members/${id}`);
  //       fetchMembers();
  //       alert("✅ Member deleted successfully");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  const deleteMember = async (id) => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to archive this member?"
      )
    )
      return;

    try {
      const res = await API.delete(`/members/${id}`);

      toast.success(res.data.message);

      fetchMembers();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
};

  const handleEdit = (member) => {
    setForm({
      name: member.name,
      memberId: member.memberId,
      mobile: member.mobile,
    });
    setEditId(member._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateMember = async () => {
    try {
      await API.put(`/members/${editId}`, form);
      alert("✅ Member updated successfully");
      setEditId(null);
      setForm({ name: "", memberId: "", mobile: "" });
      fetchMembers();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <Layout isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode}>
      <div className="min-h-screen relative overflow-hidden transition-all duration-700" style={{ background: bgGradient }}>
        
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12 space-y-6 sm:space-y-8 md:space-y-10">
          
          {/* Hero Section */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-700 animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500" />
            
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-2xl border border-white/20" style={{ background: gradients.cardPremium }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-2xl animate-pulse" />
                      <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 shadow-2xl">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>
                          ELITE MEMBERSHIP MANAGEMENT
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                          Members
                        </span>
                        <br className="block sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                          Directory
                        </span>
                      </h1>
                      <p className={`text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Manage and track all elite gym members • Real-time insights
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-green-500/30">
                        <div className="relative">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute" />
                          <div className="w-2 h-2 bg-green-500 rounded-full relative" />
                        </div>
                        <span className="text-xs font-semibold text-green-400">{members.length} Active Members</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Form Card */}
          <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(30px)' }} />
            <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} />
            <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.brand }} />
            
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur-lg animate-pulse" />
                  <div className="relative p-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {editId ? "Update Member Profile" : "Add New Member"}
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{editId ? "Modify member details below" : "Enter member information to register"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative group/input">
                  <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                      isDarkMode 
                        ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                        : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                </div>
                
                <div className="relative group/input">
                  <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                  <input
                    type="text"
                    placeholder="Member ID"
                    value={form.memberId}
                    onChange={(e) => setForm({ ...form, memberId: e.target.value })}
                    className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                      isDarkMode 
                        ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                        : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                </div>
                
                <div className="relative group/input">
                  <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                      isDarkMode 
                        ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                        : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                </div>
              </div>
              
              {/* <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={editId ? updateMember : addMember}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base text-white"
                  style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {editId ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Update Member
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Member
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
                
                {editId && (
                  <button
                    onClick={() => {
                      setEditId(null);
                      setForm({ name: "", memberId: "", mobile: "" });
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div> */}



          {/* ✅ ADDED: Action Buttons Row with Export and Import */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={editId ? updateMember : addMember}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base text-white"
                  style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {editId ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Update Member
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Member
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
                
                {editId && (
                  <button
                    onClick={() => {
                      setEditId(null);
                      setForm({ name: "", memberId: "", mobile: "" });
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                )}

                {/* ✅ ADDED: Export CSV Button */}
                <button
                  onClick={() => {
                    window.open(
                      "http://localhost:5000/api/members/export/csv",
                      "_blank"
                    );
                  }}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base text-white"
                  style={{ background: gradients.green, boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export CSV
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>

                {/* ✅ ADDED: Import CSV Button with hidden file input */}
                <label className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base text-white cursor-pointer"
                  style={{ background: gradients.blue, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}>
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Import CSV
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <input
                    type="file"
                    accept=".csv"
                    onChange={importCSV}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>

                  {/* ✅ ADDED: Download Sample CSV Button */}
                {/* <button
                  onClick={() => {
                    window.open(
                      "http://localhost:5000/api/members/sample/csv",
                      "_blank"
                    );
                  }}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base text-white"
                  style={{ background: gradients.purple, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Sample CSV
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button> */}



              </div>
            </div>
          </div>




          {/* Premium Search Section */}
          <div className="relative">
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-all duration-500" />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className={`h-5 w-5 ${isDarkMode ? 'text-red-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="🔍 Search by name, member ID, or mobile number..."
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all duration-300 text-sm sm:text-base ${
                    isDarkMode 
                      ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                      : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <svg className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-gray-500 hover:text-red-500' : 'text-gray-400 hover:text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Premium Members Table */}
          <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.red, filter: 'blur(30px)' }} />
            <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
            <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.brand }} />
            
            <div className="relative overflow-x-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl animate-pulse" />
                    <div className="relative inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent" />
                  </div>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead style={{ background: isDarkMode ? 'linear-gradient(135deg, #1a1a1a 0%, #2C2C2E 100%)' : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
                    <tr>
                      <th className={`px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Member</th>
                      <th className={`px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Member ID</th>
                      <th className={`px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Contact</th>
                      <th className={`px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'} text-center`}>Actions</th>
                    </tr>
                  </thead>
                  
                  <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                    {members.map((m, index) => (
                      <tr 
                        key={m._id} 
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className="transition-all duration-300 cursor-pointer group/row"
                        style={{ background: hoveredRow === index 
                          ? (isDarkMode 
                              ? 'linear-gradient(90deg, rgba(255,59,48,0.1) 0%, rgba(255,149,0,0.05) 100%)'
                              : 'linear-gradient(90deg, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.04) 100%)')
                          : 'transparent' 
                        }}
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className={`absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur group-hover/row:opacity-100 opacity-0 transition-opacity`} />
                              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: gradients.muscle }}>
                                {m.name.charAt(0)}
                              </div>
                            </div>
                            <div>
                              <p className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{m.name}</p>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Member since 2024</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${isDarkMode ? 'bg-black/50 border-red-500/30' : 'bg-white/50 border-purple-300'}`}>
                            <svg className={`w-3 h-3 ${isDarkMode ? 'text-red-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0h4" />
                            </svg>
                            <span className={`text-xs sm:text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{m.memberId}</span>
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <svg className={`w-4 h-4 ${isDarkMode ? 'text-red-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{m.mobile}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleEdit(m)}
                              className="group/edit relative p-2 rounded-lg transition-all duration-300 hover:scale-110"
                              style={{ background: gradients.orange }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            
                            <button
                              onClick={() => deleteMember(m._id)}
                              className="group/delete relative p-2 rounded-lg transition-all duration-300 hover:scale-110"
                              style={{ background: gradients.red }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
              {members.length === 0 && !isLoading && (
                <div className="text-center py-16">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl animate-pulse" />
                    <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <svg className={`w-12 h-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className={`text-base font-medium mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No members found</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Add a new member to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Premium Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Showing <span className={`font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>{members.length}</span> members • Page <span className={`font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>{page}</span> of <span className={`font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`group relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-white`}
                style={{ background: page === 1 ? (isDarkMode ? '#2C2C2E' : '#E5E7EB') : gradients.red, color: page === 1 ? (isDarkMode ? '#6B6B6B' : '#9CA3AF') : 'white' }}
              >
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
              </button>
              
              <div className="flex items-center gap-2">
                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = idx + 1;
                  } else if (page <= 3) {
                    pageNum = idx + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = page - 2 + idx;
                  }
                  
                  if (pageNum > 0 && pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`relative w-10 h-10 rounded-xl font-bold transition-all duration-300 text-sm ${
                          page === pageNum
                            ? 'text-white shadow-lg scale-110'
                            : (isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100')
                        }`}
                        style={page === pageNum ? { background: gradients.brand } : {}}
                      >
                        {pageNum}
                        {page === pageNum && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white rounded-full animate-pulse" />
                        )}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
              
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`group relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-white`}
                style={{ background: page === totalPages ? (isDarkMode ? '#2C2C2E' : '#E5E7EB') : gradients.red, color: page === totalPages ? (isDarkMode ? '#6B6B6B' : '#9CA3AF') : 'white' }}
              >
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Premium Stats Summary Card */}
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl group/stats" style={{ background: gradients.dark, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="absolute inset-0 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(40px)' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/stats:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>LIVE METRICS</span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Performance Dashboard
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  { icon: "💪", label: "Total Members", value: members.length },
                  { icon: "📄", label: "Current Page", value: `${page} / ${totalPages}` },
                  { icon: "🔍", label: "Search Results", value: members.length },
                  { icon: "✅", label: "Active Status", value: "Online" },
                ].map((item, idx) => (
                  <div key={idx} className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                    <div className="text-3xl mb-2 group-hover/stat:animate-bounce">{item.icon}</div>
                    <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>{item.label}</p>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Footer */}
          <div className="text-center pt-6 pb-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>💪 Elite Member Management</span>
              </div>
              <div className={`w-px h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Real-time Updates</span>
              </div>
              <div className={`w-px h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Auto-refresh: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </Layout>
  );
};

export default Members;
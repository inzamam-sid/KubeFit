import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

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
  gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
});

const Subscriptions = () => {
  const [members, setMembers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    memberId: "",
    packageId: "",
    finalPrice: "",
  });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const gradients = getGradients(isDarkMode);
  const bgGradient = isDarkMode 
    ? 'radial-gradient(ellipse at 20% 30%, #1a1a2e 0%, #0a0a0f 100%)'
    : 'radial-gradient(ellipse at 20% 30%, #f5f0ff 0%, #e8eaff 100%)';

  // 📥 Fetch members
  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/members");
      setMembers(res.data.members);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 📦 Fetch packages
  const fetchPackages = async () => {
    try {
      const res = await API.get("/packages");
      setPackages(res.data.packages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchPackages();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Handle package selection
  const handlePackageChange = (packageId) => {
    const pkg = packages.find(p => p._id === packageId);
    setSelectedPackage(pkg);
    setForm({ ...form, packageId: packageId, finalPrice: pkg ? pkg.price : "" });
  };

  // ➕ Create subscription
  const createSubscription = async () => {
    if (!form.memberId || !form.packageId) {
      alert("⚠️ Please select both member and package");
      return;
    }
    try {
      await API.post("/subscriptions", {
        ...form,
        finalPrice: form.finalPrice ? Number(form.finalPrice) : undefined,
      });
      alert("✅ Subscription created successfully!");
      setForm({ memberId: "", packageId: "", finalPrice: "" });
      setSelectedPackage(null);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating subscription");
    }
  };

  // Get member name by ID
  const getMemberName = (memberId) => {
    const member = members.find(m => m._id === memberId);
    return member ? member.name : "";
  };

  // Get package name by ID
  const getPackageName = (packageId) => {
    const pkg = packages.find(p => p._id === packageId);
    return pkg ? pkg.name : "";
  };

  // Get member details
  const getMemberDetails = (memberId) => {
    return members.find(m => m._id === memberId);
  };

  return (
    <Layout isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode}>
      <div className="min-h-screen relative overflow-hidden transition-all duration-700" style={{ background: bgGradient }}>
        
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-full blur-3xl animate-spin-slow" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12 space-y-6 sm:space-y-8 md:space-y-10">
          
          {/* Hero Section - Ultra Premium */}
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>
                          SUBSCRIPTION MANAGEMENT
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                          Assign
                        </span>
                        <br className="block sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                          Subscription
                        </span>
                      </h1>
                      <p className={`text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Assign membership packages to gym members • Seamless activation
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
                        <span className="text-xs font-semibold text-green-400">{members.length} Available Members</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Subscription Form - 3D Glass Morphism */}
          <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(30px)' }} />
            <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} />
            <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.brand }} />
            
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg animate-pulse" />
                  <div className="relative p-2 rounded-xl" style={{ background: gradients.purple }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm0 8h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    New Subscription
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Create a new membership subscription</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Member Dropdown */}
                <div className="relative group/field">
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Select Member
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/field:opacity-50 transition-all duration-500" />
                    <select
                      value={form.memberId}
                      onChange={(e) => setForm({ ...form, memberId: e.target.value })}
                      className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 appearance-none text-sm sm:text-base ${
                        isDarkMode 
                          ? 'border-gray-700 bg-black/60 text-white focus:ring-red-500'
                          : 'border-gray-300 bg-white/60 text-gray-900 focus:ring-purple-500'
                      } focus:outline-none focus:ring-2 focus:border-transparent cursor-pointer`}
                    >
                      <option value="" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>Choose a member...</option>
                      {members.map((m) => (
                        <option key={m._id} value={m._id} className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
                          {m.name} ({m.memberId})
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {form.memberId && (
                    <div className="mt-2 flex items-center gap-2 animate-slideDown">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-green-500 text-xs">
                        ✓ Selected: {getMemberName(form.memberId)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Package Dropdown */}
                <div className="relative group/field">
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Select Package
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/field:opacity-50 transition-all duration-500" />
                    <select
                      value={form.packageId}
                      onChange={(e) => handlePackageChange(e.target.value)}
                      className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 appearance-none text-sm sm:text-base ${
                        isDarkMode 
                          ? 'border-gray-700 bg-black/60 text-white focus:ring-red-500'
                          : 'border-gray-300 bg-white/60 text-gray-900 focus:ring-purple-500'
                      } focus:outline-none focus:ring-2 focus:border-transparent cursor-pointer`}
                    >
                      <option value="" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>Choose a package...</option>
                      {packages.map((p) => (
                        <option key={p._id} value={p._id} className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
                          {p.name} - ₹{p.price} ({p.duration} days)
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {selectedPackage && (
                    <div className="mt-2 p-2 rounded-lg animate-slideDown" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                      <p className="text-orange-400 text-xs flex items-center gap-1">
                        <span>📦</span> {selectedPackage.name} • {selectedPackage.duration} days
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Price Input */}
                <div className="relative group/field">
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Final Price {selectedPackage && <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>(Original: ₹{selectedPackage.price})</span>}
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/field:opacity-50 transition-all duration-500" />
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className={`text-sm font-semibold ${isDarkMode ? 'text-yellow-500' : 'text-purple-600'}`}>₹</span>
                      </span>
                      <input
                        type="number"
                        placeholder={selectedPackage ? `Enter final price` : "Final price (optional)"}
                        value={form.finalPrice}
                        onChange={(e) => setForm({ ...form, finalPrice: e.target.value })}
                        className={`relative w-full pl-8 pr-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                          isDarkMode 
                            ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                            : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                        } focus:outline-none focus:ring-2 focus:border-transparent`}
                      />
                    </div>
                  </div>
                  {form.finalPrice && selectedPackage && Number(form.finalPrice) < selectedPackage.price && (
                    <div className="mt-2 flex items-center gap-2 animate-slideDown">
                      <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-500 text-xs">
                        🎉 Discount applied! Saved ₹{selectedPackage.price - Number(form.finalPrice)}
                      </p>
                    </div>
                  )}
                  {form.finalPrice && selectedPackage && Number(form.finalPrice) > selectedPackage.price && (
                    <div className="mt-2 flex items-center gap-2 animate-slideDown">
                      <svg className="w-3 h-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-yellow-500 text-xs">
                        ⚠️ Price is higher than original
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={createSubscription}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base text-white"
                  style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Create Subscription
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
                
                <button
                  onClick={() => {
                    setForm({ memberId: "", packageId: "", finalPrice: "" });
                    setSelectedPackage(null);
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Clear Form
                </button>
              </div>
            </div>
          </div>

          {/* Selected Details Preview Card - Animated */}
          {(form.memberId || form.packageId) && (
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 animate-slideUp">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.green, filter: 'blur(20px)' }} />
              <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
              <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.green }} />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg animate-pulse" />
                    <div className="relative p-2 rounded-xl" style={{ background: gradients.green }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Subscription Summary
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Review your selection before creating</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: gradients.purple }}>
                        👤
                      </div>
                      <div>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Selected Member</p>
                        <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {form.memberId ? getMemberName(form.memberId) : "Not selected"}
                        </p>
                      </div>
                    </div>
                    {form.memberId && getMemberDetails(form.memberId) && (
                      <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        ID: {getMemberDetails(form.memberId).memberId}
                      </p>
                    )}
                  </div>
                  
                  <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: gradients.orange }}>
                        📦
                      </div>
                      <div>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Selected Package</p>
                        <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {form.packageId ? getPackageName(form.packageId) : "Not selected"}
                        </p>
                      </div>
                    </div>
                    {selectedPackage && (
                      <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Duration: {selectedPackage.duration} days
                      </p>
                    )}
                  </div>
                  
                  <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: gradients.gold }}>
                        💰
                      </div>
                      <div>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Final Amount</p>
                        <p className="font-bold text-xl text-green-400">
                          {form.finalPrice ? `₹${form.finalPrice}` : form.packageId ? "To be set" : "N/A"}
                        </p>
                      </div>
                    </div>
                    {form.finalPrice && selectedPackage && Number(form.finalPrice) !== selectedPackage.price && (
                      <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {Number(form.finalPrice) < selectedPackage.price ? '✨ Discount Applied' : '⚠️ Custom Price'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Premium Stats Dashboard */}
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl group/stats" style={{ background: gradients.dark, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="absolute inset-0 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(40px)' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/stats:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>PLATFORM INSIGHTS</span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ready for Subscription
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover/stat:animate-bounce">👥</div>
                  <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Total Members</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{members.length}</p>
                  <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Available for subscription</p>
                </div>
                <div className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover/stat:animate-bounce">📦</div>
                  <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Active Packages</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{packages.length}</p>
                  <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>To choose from</p>
                </div>
                <div className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover/stat:animate-bounce">💪</div>
                  <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Ready to Assign</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{members.length}</p>
                  <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Awaiting subscription</p>
                </div>
                <div className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover/stat:animate-bounce">🎯</div>
                  <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Conversion Rate</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>0%</p>
                  <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Start assigning</p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Footer */}
          <div className="text-center pt-6 pb-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>💪 Elite Subscription Management</span>
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
                <span>Ready to assign: {new Date().toLocaleTimeString()}</span>
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
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </Layout>
  );
};

export default Subscriptions;
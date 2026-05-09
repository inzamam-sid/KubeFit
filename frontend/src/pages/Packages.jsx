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

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const gradients = getGradients(isDarkMode);
  const bgGradient = isDarkMode 
    ? 'radial-gradient(ellipse at 20% 30%, #1a1a2e 0%, #0a0a0f 100%)'
    : 'radial-gradient(ellipse at 20% 30%, #f5f0ff 0%, #e8eaff 100%)';

  // 📥 Fetch packages
  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/packages");
      setPackages(res.data.packages);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // ➕ Add package
  const addPackage = async () => {
    if (!form.name || !form.duration || !form.price) {
      alert("⚠️ All fields required");
      return;
    }

    try {
      await API.post("/packages", form);
      alert("💪 Package added successfully!");

      setForm({ name: "", duration: "", price: "" });
      fetchPackages();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding package");
    }
  };

  // ❌ Disable package
  const disablePackage = async (id) => {
    if (!window.confirm("⚠️ Disable this package?")) return;

    try {
      await API.put(`/packages/${id}`);
      fetchPackages();
      alert("✅ Package disabled successfully");
    } catch (err) {
      console.log(err);
      alert("Error disabling package");
    }
  };

  const activePackages = packages.filter(p => p.isActive !== false).length;
  const totalRevenue = packages.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = packages.length > 0 ? Math.round(totalRevenue / packages.length) : 0;

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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>
                          PREMIUM PACKAGE MANAGEMENT
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                          Gym Packages
                        </span>
                        <br className="block sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                          & Pricing
                        </span>
                      </h1>
                      <p className={`text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Manage membership packages and pricing structures • Real-time insights
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
                        <span className="text-xs font-semibold text-green-400">{activePackages} Active Packages</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Add Package Form Card - 3D Glass Morphism */}
          <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(30px)' }} />
            <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} />
            <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.brand }} />
            
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg animate-pulse" />
                  <div className="relative p-2 rounded-xl" style={{ background: gradients.blue }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Add New Package
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Create a new membership package</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative group/input">
                  <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                  <input
                    type="text"
                    placeholder="Package Name"
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className={`w-4 h-4 ${isDarkMode ? 'text-orange-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type="number"
                      placeholder="Duration (days)"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      className={`relative w-full pl-9 pr-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                        isDarkMode 
                          ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                          : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                    />
                  </div>
                </div>
                
                <div className="relative group/input">
                  <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className={`text-lg ${isDarkMode ? 'text-yellow-500' : 'text-purple-500'}`}>₹</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Price"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className={`relative w-full pl-8 pr-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                        isDarkMode 
                          ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                          : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                    />
                  </div>
                </div>
                
                <button
                  onClick={addPackage}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base text-white"
                  style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Package
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              </div>
            </div>
          </div>

          {/* Premium Packages List - Card Grid Layout */}
          <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(30px)' }} />
            <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
            <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.brand }} />
            
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg animate-pulse" />
                    <div className="relative p-2 rounded-xl" style={{ background: gradients.green }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      All Packages
                    </h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Manage and monitor all membership packages</p>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total: {packages.length} packages
                  </span>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl animate-pulse" />
                    <div className="relative inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent" />
                  </div>
                </div>
              ) : packages.length === 0 ? (
                <div className="text-center py-16">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl animate-pulse" />
                    <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <svg className={`w-12 h-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                  </div>
                  <p className={`text-base font-medium mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No packages found</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Add a new package to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {packages.map((pkg, index) => (
                    <div
                      key={pkg._id}
                      onMouseEnter={() => setHoveredPackage(index)}
                      onMouseLeave={() => setHoveredPackage(null)}
                      className="group/pkg relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-slideUp"
                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover/pkg:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(20px)' }} />
                      <div className="absolute inset-px rounded-xl backdrop-blur-sm" style={{ background: gradients.card }} />
                      <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover/pkg:h-1" style={{ background: gradients.brand }} />
                      
                      <div className="relative p-5">
                        {/* Package Icon with Glow */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className={`absolute inset-0 rounded-xl blur-xl transition-opacity duration-500 ${hoveredPackage === index ? 'opacity-100' : 'opacity-0'}`} style={{ background: gradients.brand }} />
                            <div className="relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: gradients.brand }}>
                              💪
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${pkg.isActive !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {pkg.isActive !== false ? 'Active' : 'Disabled'}
                          </div>
                        </div>
                        
                        {/* Package Details */}
                        <h4 className={`font-bold text-lg sm:text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{pkg.name}</h4>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <svg className={`w-4 h-4 ${isDarkMode ? 'text-orange-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.duration} Days Duration</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className={`w-4 h-4 ${isDarkMode ? 'text-yellow-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>₹{pkg.price}</span>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Popularity</span>
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>85%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: '85%', background: gradients.brand }} />
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <button
                          onClick={() => disablePackage(pkg._id)}
                          className="group/btn relative w-full overflow-hidden rounded-lg px-4 py-2.5 font-semibold transition-all duration-300 hover:scale-105 text-sm"
                          style={{ background: gradients.red, boxShadow: '0 4px 15px rgba(255, 59, 48, 0.3)' }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            {pkg.isActive !== false ? 'Disable Package' : 'Package Disabled'}
                          </span>
                          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </button>
                      </div>
                      
                      {/* Shine Effect on Hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover/pkg:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    </div>
                  ))}
                </div>
              )}
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
                  Package Performance Dashboard
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover/stat:animate-bounce">📦</div>
                  <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Total Packages</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{packages.length}</p>
                </div>
                <div className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover/stat:animate-bounce">✅</div>
                  <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Active Packages</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{activePackages}</p>
                </div>
                <div className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover/stat:animate-bounce">💰</div>
                  <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Avg. Price</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{avgPrice}</p>
                </div>
                <div className="text-center group/stat transition-all duration-500 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover/stat:animate-bounce">🎯</div>
                  <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Total Value</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{totalRevenue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Footer */}
          <div className="text-center pt-6 pb-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>💪 Elite Package Management</span>
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
                <span>Last updated: {new Date().toLocaleString()}</span>
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

export default Packages;
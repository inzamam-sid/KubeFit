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
  cyan: isDarkMode
    ? 'linear-gradient(135deg, #00E5FF 0%, #00B4D8 100%)'
    : 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
});

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [hoveredRow, setHoveredRow] = useState(null);

  const gradients = getGradients(isDarkMode);
  const bgGradient = isDarkMode 
    ? 'radial-gradient(ellipse at 20% 30%, #1a1a2e 0%, #0a0a0f 100%)'
    : 'radial-gradient(ellipse at 20% 30%, #f5f0ff 0%, #e8eaff 100%)';

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await API.get("/subscriptions");
      setSubscriptions(res.data.subscriptions);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // ⏸ Hold
  const holdSub = async (id) => {
    if (window.confirm("⏸️ Put this subscription on hold?")) {
      try {
        await API.post(`/subscriptions/${id}/hold`);
        fetchSubscriptions();
        alert("✅ Subscription put on hold");
      } catch (err) {
        alert("Error putting subscription on hold");
      }
    }
  };

  // ▶ Resume
  const resumeSub = async (id) => {
    if (window.confirm("▶️ Resume this subscription?")) {
      try {
        await API.post(`/subscriptions/${id}/resume`);
        fetchSubscriptions();
        alert("✅ Subscription resumed");
      } catch (err) {
        alert("Error resuming subscription");
      }
    }
  };

  const getStatusColor = (status) => {
    if (status === "active") return "green";
    if (status === "hold") return "orange";
    return "red";
  };

  const getStatusBadgeClass = (status) => {
    if (status === "active") return `bg-gradient-to-r from-green-500 to-emerald-500`;
    if (status === "hold") return `bg-gradient-to-r from-orange-500 to-yellow-500`;
    return `bg-gradient-to-r from-red-500 to-pink-500`;
  };

  const getStatusIcon = (status) => {
    if (status === "active") return "💪";
    if (status === "hold") return "⏸️";
    return "⛔";
  };

  // Filter subscriptions
  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === "all") return true;
    return sub.status === filter;
  });

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === "active").length,
    hold: subscriptions.filter(s => s.status === "hold").length,
    expired: subscriptions.filter(s => s.status === "expired").length,
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>
                          SUBSCRIPTION OVERVIEW
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                          Subscriptions
                        </span>
                        <br className="block sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                          List
                        </span>
                      </h1>
                      <p className={`text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Manage and track all member subscriptions • Real-time monitoring
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
                        <span className="text-xs font-semibold text-green-400">{stats.active} Active Now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Stats Cards - 3D Glass Morphism */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {[
              { label: "Total", value: stats.total, icon: "📊", color: "brand", sub: "All subscriptions" },
              { label: "Active", value: stats.active, icon: "💪", color: "green", sub: "Currently active" },
              { label: "On Hold", value: stats.hold, icon: "⏸️", color: "orange", sub: "Temporarily hold" },
              { label: "Expired", value: stats.expired, icon: "⛔", color: "red", sub: "Need renewal" },
            ].map((stat, idx) => (
              <div key={idx} className="group/stat relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-slideUp" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'backwards' }}>
                <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700" style={{ background: gradients[stat.color], filter: 'blur(15px)' }} />
                <div className="absolute inset-px rounded-xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover/stat:h-1" style={{ background: gradients[stat.color] }} />
                
                <div className="relative p-4 sm:p-5 text-center">
                  <div className="text-3xl sm:text-4xl mb-2 group-hover/stat:animate-bounce">{stat.icon}</div>
                  <p className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                  <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 ${
                    stat.color === 'green' ? 'text-green-400' : 
                    stat.color === 'orange' ? 'text-orange-400' : 
                    stat.color === 'red' ? 'text-red-400' : 
                    (isDarkMode ? 'text-white' : 'text-gray-900')
                  }`}>{stat.value}</p>
                  <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>{stat.sub}</p>
                </div>
                
                <div className="absolute inset-0 -translate-x-full group-hover/stat:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Premium Filter Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              { id: "all", label: "All", icon: "📋", count: stats.total },
              { id: "active", label: "Active", icon: "💪", count: stats.active, color: "green" },
              { id: "hold", label: "On Hold", icon: "⏸️", count: stats.hold, color: "orange" },
              { id: "expired", label: "Expired", icon: "⛔", count: stats.expired, color: "red" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`group relative px-4 sm:px-5 py-2 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm overflow-hidden ${
                  filter === tab.id
                    ? "text-white shadow-lg"
                    : `${isDarkMode ? 'text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-200'}`
                }`}
                style={filter === tab.id ? { background: gradients[tab.color] || gradients.brand } : {}}
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.charAt(0)}</span>
                  <span className={`text-xs ${filter === tab.id ? 'opacity-100' : 'opacity-70'}`}>
                    ({tab.count})
                  </span>
                </span>
                {filter === tab.id && (
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                )}
              </button>
            ))}
          </div>

          {/* Premium Subscriptions Table - Glass Morphism */}
          <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(30px)' }} />
            <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
            <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.brand }} />
            
            <div className="relative p-4 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg animate-pulse" />
                    <div className="relative p-2 rounded-xl" style={{ background: gradients.blue }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      All Subscriptions
                    </h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {filteredSubscriptions.length} subscriptions found
                    </p>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping absolute" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 relative" />
                  </div>
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Live Updates</span>
                </div>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl animate-pulse" />
                    <div className="relative inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent" />
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`px-3 sm:px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Member</th>
                        <th className={`px-3 sm:px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Package</th>
                        <th className={`px-3 sm:px-4 py-3 text-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Start Date</th>
                        <th className={`px-3 sm:px-4 py-3 text-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>End Date</th>
                        <th className={`px-3 sm:px-4 py-3 text-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Status</th>
                        <th className={`px-3 sm:px-4 py-3 text-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Action</th>
                      </tr>
                    </thead>

                    <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
                      {filteredSubscriptions.map((s, index) => {
                        const isExpiringSoon = new Date(s.endDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && s.status === "active";
                        const isExpired = new Date(s.endDate) < new Date() && s.status === "active";
                        
                        return (
                          <tr 
                            key={s._id} 
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                            className="transition-all duration-300 cursor-pointer group/row animate-slideUp"
                            style={{ 
                              animationDelay: `${index * 50}ms`, 
                              animationFillMode: 'backwards',
                              background: hoveredRow === index 
                                ? (isDarkMode 
                                    ? 'linear-gradient(90deg, rgba(255,59,48,0.1) 0%, rgba(255,149,0,0.05) 100%)'
                                    : 'linear-gradient(90deg, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.04) 100%)')
                                : 'transparent'
                            }}
                          >
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur group-hover/row:opacity-100 opacity-0 transition-opacity" />
                                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: gradients.brand }}>
                                    {s.memberId?.name?.charAt(0) || "M"}
                                  </div>
                                </div>
                                <div>
                                  <p className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{s.memberId?.name || "Unknown"}</p>
                                  <p className={`text-[10px] sm:text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.memberId?.memberId || "No ID"}</p>
                                </div>
                              </div>
                            </td>
                            
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <span className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                                <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-orange-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                {s.packageId?.name || "Unknown"}
                              </span>
                            </td>
                            
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                              <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {new Date(s.startDate).toLocaleDateString()}
                              </div>
                            </td>
                            
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                              <div className="relative inline-block">
                                <div className={`text-xs sm:text-sm font-medium ${
                                  isExpired ? 'text-red-400' : 
                                  isExpiringSoon ? 'text-yellow-400' : 
                                  (isDarkMode ? 'text-gray-300' : 'text-gray-600')
                                }`}>
                                  {new Date(s.endDate).toLocaleDateString()}
                                </div>
                                {isExpiringSoon && !isExpired && (
                                  <div className="absolute -top-1 -right-3 w-2 h-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
                                  </div>
                                )}
                              </div>
                              {isExpiringSoon && !isExpired && (
                                <p className="text-[10px] text-yellow-500 mt-0.5">Expiring soon!</p>
                              )}
                            </td>
                            
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                              <span className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium shadow-lg ${getStatusBadgeClass(s.status)}`}>
                                <span className="text-sm">{getStatusIcon(s.status)}</span>
                                <span className="capitalize">{s.status}</span>
                              </span>
                            </td>
                            
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                              {s.status === "active" && (
                                <button
                                  onClick={() => holdSub(s._id)}
                                  className="group/btn relative overflow-hidden rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 font-medium transition-all duration-300 hover:scale-105 text-xs sm:text-sm text-white"
                                  style={{ background: gradients.orange, boxShadow: '0 4px 15px rgba(255, 149, 0, 0.3)' }}
                                >
                                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Hold
                                  </span>
                                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </button>
                              )}

                              {s.status === "hold" && (
                                <button
                                  onClick={() => resumeSub(s._id)}
                                  className="group/btn relative overflow-hidden rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 font-medium transition-all duration-300 hover:scale-105 text-xs sm:text-sm text-white"
                                  style={{ background: gradients.green, boxShadow: '0 4px 15px rgba(52, 199, 89, 0.3)' }}
                                >
                                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Resume
                                  </span>
                                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </button>
                              )}

                              {s.status === "expired" && (
                                <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  Expired
                                </span>
                              )}
                             </td>
                           </tr>
                         );
                       })}
                    </tbody>
                   </table>
                  
                  {filteredSubscriptions.length === 0 && (
                    <div className="text-center py-16">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl animate-pulse" />
                        <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <svg className={`w-12 h-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                      <p className={`text-base font-medium mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No {filter !== "all" ? filter : ""} subscriptions found
                      </p>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                        Subscribe members to see them here
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Premium Quick Tips Card */}
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl group/tips" style={{ background: gradients.dark, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="absolute inset-0 opacity-0 group-hover/tips:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(40px)' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/tips:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl animate-bounce">💡</div>
                  <div>
                    <p className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'} uppercase tracking-wider`}>Quick Tips</p>
                    <p className={`text-sm sm:text-base mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Monitor expiring subscriptions and take action
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>On Hold</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expired</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expiring Soon</span>
                  </div>
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
                <span>Last updated: {new Date().toLocaleString()}</span>
              </div>
              <div className={`w-px h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>✅ {stats.active} Active • ⏸️ {stats.hold} Hold • ⛔ {stats.expired} Expired</span>
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

export default SubscriptionList;
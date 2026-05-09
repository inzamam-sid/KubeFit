
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
  yellow: isDarkMode 
    ? 'linear-gradient(135deg, #feca57 0%, #ff9f43 100%)'
    : 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
  cyan: isDarkMode
    ? 'linear-gradient(135deg, #00E5FF 0%, #00B4D8 100%)'
    : 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
});

const Alerts = () => {
  const [expiring, setExpiring] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [hoveredOverdueRow, setHoveredOverdueRow] = useState(null);
  const [hoveredExpiringRow, setHoveredExpiringRow] = useState(null);

  const gradients = getGradients(isDarkMode);
  const bgGradient = isDarkMode 
    ? 'radial-gradient(ellipse at 20% 30%, #1a1a2e 0%, #0a0a0f 100%)'
    : 'radial-gradient(ellipse at 20% 30%, #f5f0ff 0%, #e8eaff 100%)';

  const fetchData = async () => {
    try {
      const exp = await API.get("/subscriptions/expiring-today");
      const over = await API.get("/subscriptions/overdue");

      setExpiring(exp.data.subscriptions);
      setOverdue(over.data.subscriptions);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
  };

  const totalAlerts = overdue.length + expiring.length;

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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="relative">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute" />
                          <div className="w-2 h-2 bg-red-500 rounded-full relative" />
                        </div>
                        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>
                          ALERT MANAGEMENT SYSTEM
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                          Alerts
                        </span>
                        <br className="block sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                          & Notifications
                        </span>
                      </h1>
                      <p className={`text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Monitor expiring and overdue subscriptions • Real-time alerts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-red-500/30">
                        <div className="relative">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute" />
                          <div className="w-2 h-2 bg-red-500 rounded-full relative" />
                        </div>
                        <span className="text-xs font-semibold text-red-400">{totalAlerts} Total Alerts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Alert Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {[
              { label: "Total Alerts", value: totalAlerts, icon: "⚠️", color: "brand", sub: "Require attention", gradient: gradients.brand },
              { label: "Overdue", value: overdue.length, icon: "🔴", color: "red", sub: "Payment pending", gradient: gradients.red },
              { label: "Expiring Today", value: expiring.length, icon: "🟡", color: "orange", sub: "Ending today", gradient: gradients.orange },
            ].map((stat, idx) => (
              <div key={idx} className="group/stat relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-slideUp" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'backwards' }}>
                <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700" style={{ background: stat.gradient, filter: 'blur(20px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover/stat:h-1" style={{ background: stat.gradient }} />
                
                <div className="relative p-5 sm:p-6 text-center">
                  <div className="text-4xl sm:text-5xl mb-3 group-hover/stat:animate-bounce">{stat.icon}</div>
                  <p className={`text-xs sm:text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                  <p className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-1 ${
                    stat.color === 'red' ? 'text-red-400' : 
                    stat.color === 'orange' ? 'text-orange-400' : 
                    (isDarkMode ? 'text-white' : 'text-gray-900')
                  }`}>{stat.value}</p>
                  <p className={`text-[10px] mt-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>{stat.sub}</p>
                </div>
                
                <div className="absolute inset-0 -translate-x-full group-hover/stat:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* 🔴 Overdue Members Section - Ultra Premium */}
          <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.red, filter: 'blur(30px)' }} />
            <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
            <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.red }} />
            
            <div className="relative p-5 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur-lg animate-pulse" />
                    <div className="relative p-2 rounded-xl" style={{ background: gradients.red }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      🔴 Overdue Members
                    </h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Critical attention required</p>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border border-red-500/30" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping absolute" />
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 relative" />
                  </div>
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{overdue.length} Critical Alerts</span>
                </div>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl animate-pulse" />
                    <div className="relative inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent" />
                  </div>
                </div>
              ) : overdue.length === 0 ? (
                <div className="text-center py-16">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-2xl animate-pulse" />
                    <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className={`text-base font-medium mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No overdue members</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>All subscriptions are up to date</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`px-3 sm:px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Member</th>
                        <th className={`px-3 sm:px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Package</th>
                        <th className={`px-3 sm:px-4 py-3 text-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>End Date</th>
                        <th className={`px-3 sm:px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Contact</th>
                        <th className={`px-3 sm:px-4 py-3 text-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Status</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
                      {overdue.map((s, index) => (
                        <tr 
                          key={s._id} 
                          onMouseEnter={() => setHoveredOverdueRow(index)}
                          onMouseLeave={() => setHoveredOverdueRow(null)}
                          className="transition-all duration-300 cursor-pointer group/row animate-slideUp"
                          style={{ 
                            animationDelay: `${index * 50}ms`, 
                            animationFillMode: 'backwards',
                            background: hoveredOverdueRow === index 
                              ? (isDarkMode 
                                  ? 'linear-gradient(90deg, rgba(255,59,48,0.15) 0%, rgba(255,59,48,0.05) 100%)'
                                  : 'linear-gradient(90deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.04) 100%)')
                              : 'transparent'
                          }}
                        >
                          <td className="px-3 sm:px-4 py-3 sm:py-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur group-hover/row:opacity-100 opacity-0 transition-opacity" />
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: gradients.red }}>
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
                            <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-orange-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                              {s.packageId?.name || "Unknown"}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                            <div className="relative inline-block">
                              <div className="text-red-400 font-bold text-sm sm:text-base">
                                {new Date(s.endDate).toLocaleDateString()}
                              </div>
                              <div className="absolute -top-1 -right-2 w-2 h-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-red-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{s.memberId?.mobile || "N/A"}</span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                            <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs sm:text-sm font-semibold animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              Overdue
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* 🟡 Expiring Today Section - Ultra Premium */}
          <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.orange, filter: 'blur(30px)' }} />
            <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
            <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.orange }} />
            
            <div className="relative p-5 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur-lg animate-pulse" />
                    <div className="relative p-2 rounded-xl" style={{ background: gradients.orange }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      🟡 Expiring Today
                    </h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Warning - Action needed</p>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border border-orange-500/30" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping absolute" />
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 relative" />
                  </div>
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>{expiring.length} Expiring Today</span>
                </div>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-2xl animate-pulse" />
                    <div className="relative inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
                  </div>
                </div>
              ) : expiring.length === 0 ? (
                <div className="text-center py-16">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-2xl animate-pulse" />
                    <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className={`text-base font-medium mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No members expiring today</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>All subscriptions are active</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`px-3 sm:px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Member</th>
                        <th className={`px-3 sm:px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Package</th>
                        <th className={`px-3 sm:px-4 py-3 text-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>End Date</th>
                        <th className={`px-3 sm:px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Contact</th>
                        <th className={`px-3 sm:px-4 py-3 text-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Status</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
                      {expiring.map((s, index) => (
                        <tr 
                          key={s._id} 
                          onMouseEnter={() => setHoveredExpiringRow(index)}
                          onMouseLeave={() => setHoveredExpiringRow(null)}
                          className="transition-all duration-300 cursor-pointer group/row animate-slideUp"
                          style={{ 
                            animationDelay: `${index * 50}ms`, 
                            animationFillMode: 'backwards',
                            background: hoveredExpiringRow === index 
                              ? (isDarkMode 
                                  ? 'linear-gradient(90deg, rgba(255,149,0,0.15) 0%, rgba(255,149,0,0.05) 100%)'
                                  : 'linear-gradient(90deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.04) 100%)')
                              : 'transparent'
                          }}
                        >
                          <td className="px-3 sm:px-4 py-3 sm:py-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur group-hover/row:opacity-100 opacity-0 transition-opacity" />
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: gradients.orange }}>
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
                            <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-orange-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                              {s.packageId?.name || "Unknown"}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                            <div className="relative inline-block">
                              <div className="text-orange-400 font-bold text-sm sm:text-base">
                                {new Date(s.endDate).toLocaleDateString()}
                              </div>
                              <div className="absolute -top-1 -right-2 w-2 h-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-orange-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{s.memberId?.mobile || "N/A"}</span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                            <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs sm:text-sm font-semibold animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                              Expiring Soon
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Premium Quick Actions Card */}
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl group/actions" style={{ background: gradients.dark, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="absolute inset-0 opacity-0 group-hover/actions:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(40px)' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/actions:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl animate-bounce">💡</div>
                  <div>
                    <p className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'} uppercase tracking-wider`}>Need Help?</p>
                    <p className={`text-sm sm:text-base mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contact members to renew their subscriptions
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base text-white"
                  style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {refreshing ? "Refreshing..." : "Refresh Alerts"}
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              </div>
            </div>
          </div>

          {/* Premium Footer */}
          <div className="text-center pt-6 pb-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>⚠️ Elite Alert Management</span>
              </div>
              <div className={`w-px h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Real-time Monitoring</span>
              </div>
              <div className={`w-px h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{totalAlerts} alerts requiring attention</span>
              </div>
              <div className={`w-px h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>🔴 {overdue.length} Overdue • 🟡 {expiring.length} Expiring</span>
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

export default Alerts;
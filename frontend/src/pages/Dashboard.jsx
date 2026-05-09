import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import RevenueChart from "../components/RevenueChart";
import MemberChart from "../components/MemberChart";

// Ultra-premium glass morphism gradients
const premiumGradients = {
  light: {
    hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    card: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 100%)',
    accent: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B6B 100%)',
    success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    warning: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    danger: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  dark: {
    hero: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 25%, #FF2A54 50%, #5856D6 75%, #5E5CE6 100%)',
    card: 'linear-gradient(135deg, rgba(20, 20, 25, 0.95) 0%, rgba(15, 15, 20, 0.88) 100%)',
    accent: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)',
    gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
    success: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
    warning: 'linear-gradient(135deg, #FF9500 0%, #FF9F0A 100%)',
    danger: 'linear-gradient(135deg, #FF3B30 0%, #FF453A 100%)',
    info: 'linear-gradient(135deg, #007AFF 0%, #0A84FF 100%)',
  }
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState("30d");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [hoveredCard, setHoveredCard] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchChart = async (selectedRange = "30d") => {
    const res = await API.get(`/dashboard/revenue-chart?range=${selectedRange}`);
    setChartData(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      fetchStats();
      fetchChart(range);
    }
  }, [range]);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const theme = isDarkMode ? premiumGradients.dark : premiumGradients.light;
  const bgGradient = isDarkMode 
    ? 'radial-gradient(ellipse at 20% 30%, #1a1a2e 0%, #0a0a0f 100%)'
    : 'radial-gradient(ellipse at 20% 30%, #f5f0ff 0%, #e8eaff 100%)';

  if (!stats) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: bgGradient }}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="relative backdrop-blur-3xl rounded-3xl p-12 shadow-2xl border border-white/20" style={{ background: theme.card }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl animate-ping bg-gradient-to-r from-purple-500 to-pink-500 opacity-30" />
            <div className="relative">
              <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-t-transparent" style={{ borderImage: theme.accent, borderImageSlice: 1 }} />
            </div>
          </div>
          <p className="mt-6 font-medium text-lg bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Loading premium dashboard...
          </p>
        </div>
      </div>
    </div>
  );

  const statsData = [
    { title: "Total Members", value: stats.totalMembers, gradient: theme.info, icon: "👥", subtitle: "All registered members", desc: "+12% this month", trend: "up", color: "blue" },
    { title: "Active Members", value: stats.activeMembers, gradient: theme.success, icon: "💪", subtitle: "Currently active", desc: "+8% vs last month", trend: "up", color: "green" },
    { title: "Hold Members", value: stats.holdMembers, gradient: theme.warning, icon: "⏸️", subtitle: "On temporary hold", desc: "2 new this week", trend: "neutral", color: "orange" },
    { title: "Expiring Today", value: stats.expiringToday, gradient: theme.danger, icon: "⚠️", subtitle: "Memberships ending today", desc: "Renewal needed", trend: "down", color: "red" },
    { title: "Overdue Members", value: stats.overdueMembers, gradient: theme.danger, icon: "🔴", subtitle: "Payment overdue", desc: "Action required", trend: "down", color: "crimson" },
    { title: "Monthly Revenue", value: `₹${stats.monthlyRevenue}`, gradient: theme.gold, icon: "💰", subtitle: "This month's revenue", desc: "+23% growth", trend: "up", color: "gold" },
  ];

  return (
    <Layout isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode}>
      <div className="min-h-screen transition-all duration-700 relative overflow-hidden" style={{ background: bgGradient }}>
        
        {/* Animated Orbs - Ultra Premium Background Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-spin-slow" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12 space-y-8 lg:space-y-12">
          
          {/* Hero Section - Ultra Premium */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-700 animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500" />
            
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-2xl border border-white/20" style={{ background: theme.card }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl animate-pulse" />
                      <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {isDarkMode ? 'ELITE GYM MANAGEMENT' : 'PREMIUM ANALYTICS SUITE'}
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                          Welcome Back,
                        </span>
                        <br className="block sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                          Elite Admin
                        </span>
                      </h1>
                      <p className={`text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Your gym empire at a glance • Real-time intelligence
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-green-500/30">
                        <div className="relative">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute" />
                          <div className="w-2 h-2 bg-green-500 rounded-full relative" />
                        </div>
                        <span className="text-xs font-semibold text-green-400">LIVE SYSTEM</span>
                      </div>
                    </div>
                    
                    <div className={`hidden sm:flex items-center gap-2 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Updated just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Fixed number visibility for light mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 xl:gap-7">
            {statsData.map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-slideUp"
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'backwards' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: stat.gradient, filter: 'blur(30px)' }} />
                
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: theme.card, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2 rounded-t-2xl" style={{ background: stat.gradient }} />
                
                <div className="relative p-5 sm:p-6 lg:p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="relative">
                      <div className={`absolute inset-0 blur-2xl transition-opacity duration-500 ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'}`} style={{ background: stat.gradient }} />
                      <div className="relative p-3 sm:p-4 rounded-xl text-3xl sm:text-4xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: stat.gradient, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' }}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md border ${
                        stat.trend === 'up' ? (isDarkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-600 border-green-200') :
                        stat.trend === 'down' ? (isDarkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-600 border-red-200') :
                        (isDarkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-600 border-yellow-200')
                      }`}>
                        {stat.trend === 'up' && '↗ '} {stat.trend === 'down' && '↘ '} {stat.desc}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</h3>
                  {/* FIXED: Number color based on theme - dark for light mode, white for dark mode */}
                  <p className={`font-black text-3xl sm:text-4xl lg:text-5xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <p className={`text-[11px] sm:text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.subtitle}</p>
                  
                  <div className="mt-5">
                    <div className="w-full h-1 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: '65%', background: stat.gradient }} />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mt-4">
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: theme.accent, filter: 'blur(30px)' }} />
              <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: theme.card }} />
              <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: theme.accent }} />
              
              <div className="relative p-5 sm:p-6 lg:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: theme.info, boxShadow: '0 8px 20px -8px rgba(79,172,254,0.5)' }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg sm:text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Revenue Analytics
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Track earnings & financial trends</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select 
                      value={range} 
                      onChange={(e) => setRange(e.target.value)}
                      className={`text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer backdrop-blur-sm border ${
                        isDarkMode 
                          ? 'bg-gray-800/50 text-white border-gray-700 hover:border-purple-500/50'
                          : 'bg-white/50 text-gray-900 border-gray-200 hover:border-purple-500/50'
                      }`}
                    >
                      <option value="7d">📊 Last 7 Days</option>
                      <option value="30d">📈 Last 30 Days</option>
                      <option value="90d">📉 Last 90 Days</option>
                    </select>
                  </div>
                </div>
                
                <div className="min-h-[340px]">
                  <RevenueChart data={chartData} />
                </div>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: theme.info, filter: 'blur(30px)' }} />
              <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: theme.card }} />
              <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: theme.info }} />
              
              <div className="relative p-5 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: theme.success, boxShadow: '0 8px 20px -8px rgba(52,199,89,0.5)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg sm:text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Member Insights
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Demographics & engagement metrics</p>
                  </div>
                </div>
                
                <div className="min-h-[340px]">
                  <MemberChart stats={stats} />
                </div>
              </div>
            </div>
          </div>

          {/* Premium Stats Dashboard */}
          <div className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: theme.gold, filter: 'blur(40px)' }} />
            <div className="relative rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm border border-white/10" style={{ background: theme.card }}>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl animate-float" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-500 to-red-500 rounded-full blur-3xl animate-float-delayed" />
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
                    <div className="relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping absolute" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 relative" />
                    </div>
                    <span className={`text-xs font-bold tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>LIVE DASHBOARD METRICS</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Performance Overview
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-sm`}>Real-time insights at your fingertips</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
                  {[
                    { icon: "🎯", label: "Total Members", value: stats.totalMembers, gradient: theme.info },
                    { icon: "💪", label: "Active Now", value: stats.activeMembers, gradient: theme.success },
                    { icon: "💰", label: "Monthly Revenue", value: `₹${stats.monthlyRevenue}`, gradient: theme.gold },
                    { icon: "⚠️", label: "Expiring Today", value: stats.expiringToday, gradient: theme.warning },
                  ].map((item, idx) => (
                    <div key={idx} className="group/metric text-center transition-all duration-500 hover:scale-105 cursor-pointer">
                      <div className="relative inline-block mb-3">
                        <div className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover/metric:opacity-100 transition-opacity" style={{ background: item.gradient }} />
                        <div className="relative text-4xl sm:text-5xl transition-all duration-500 group-hover/metric:scale-110 group-hover/metric:rotate-6">
                          {item.icon}
                        </div>
                      </div>
                      <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs uppercase tracking-wider font-bold mb-1`}>{item.label}</p>
                      <p className={`text-xl sm:text-2xl lg:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Footer */}
          <div className="text-center pt-6 pb-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" />
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>💪 Elite Dashboard</span>
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

export default Dashboard;
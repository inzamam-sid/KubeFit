import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";

const MemberChart = ({ stats }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      setIsDarkMode(saved ? saved === "dark" : true);
    };
    
    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  const totalMembers = stats.activeMembers + stats.holdMembers + stats.overdueMembers;
  
  const data = [
    { name: "Active Subscriptions", value: stats.activeMembers, status: "active", icon: "💪", color: "#22c55e", lightColor: "#10B981" },
    { name: "On Hold", value: stats.holdMembers, status: "hold", icon: "⏸️", color: "#f59e0b", lightColor: "#F59E0B" },
    { name: "Overdue", value: stats.overdueMembers, status: "overdue", icon: "⚠️", color: "#ef4444", lightColor: "#EF4444" },
  ].filter(item => item.value > 0);

  // Chart colors based on theme
  const getChartColors = () => {
    if (isDarkMode) {
      return {
        active: "#34C759",
        hold: "#FF9500",
        overdue: "#FF3B30",
      };
    } else {
      return {
        active: "#10B981",
        hold: "#F59E0B",
        overdue: "#EF4444",
      };
    }
  };

  const chartColors = getChartColors();
  const colors = [chartColors.active, chartColors.hold, chartColors.overdue];
  const statusColors = {
    active: chartColors.active,
    hold: chartColors.hold,
    overdue: chartColors.overdue,
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalMembers) * 100).toFixed(1);
      return (
        <div className="rounded-xl shadow-2xl p-4 backdrop-blur-sm animate-slideIn" style={{ 
          background: isDarkMode ? 'rgba(28, 28, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          border: `1px solid ${statusColors[data.status]}`,
        }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ background: statusColors[data.status] }} />
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {data.name}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold" style={{ color: statusColors[data.status] }}>
              {data.value}
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              subscriptions ({percentage}%)
            </span>
          </div>
          <div className="mt-2 pt-2 border-t" style={{ borderColor: isDarkMode ? '#2C2C2E' : '#F3F4F6' }}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Current status
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Legend
  const renderLegend = () => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, index) => {
          const percentage = ((entry.value / totalMembers) * 100).toFixed(1);
          const isActive = hoveredSegment === index || activeIndex === index;
          return (
            <div
              key={index}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105"
              style={{ 
                background: isActive ? `${colors[index]}20` : 'transparent',
                border: `1px solid ${isActive ? colors[index] : (isDarkMode ? '#2C2C2E' : '#E5E7EB')}`
              }}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full" style={{ background: colors[index] }} />
                {isActive && (
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ background: colors[index], opacity: 0.5 }} />
                )}
              </div>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {entry.name.split(' ')[0]}
              </span>
              <span className={`text-xs font-bold`} style={{ color: colors[index] }}>
                {entry.value}
              </span>
              <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // Donut chart with center text
  const renderCenterText = () => {
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="select-none"
      >
        <tspan
          x="50%"
          dy="-8"
          fontSize="28"
          fontWeight="bold"
          fill={isDarkMode ? '#FFFFFF' : '#1F2937'}
        >
          {totalMembers}
        </tspan>
        <tspan
          x="50%"
          dy="24"
          fontSize="11"
          fill={isDarkMode ? '#9CA3AF' : '#6B7280'}
        >
          Total Subscriptions
        </tspan>
      </text>
    );
  };

  if (!stats || totalMembers === 0) {
    return (
      <div className="flex items-center justify-center h-[340px]">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gray-800">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No subscriptions data available</p>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Add  Subscriptions to see statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-50 animate-pulse" />
            <div className="relative p-1.5 rounded-lg" style={{ background: chartColors.active }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className={`font-bold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
               Subscription Distribution
            </h3>
            <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Active vs Hold vs Overdue
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Live data
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <defs>
              {data.map((entry, index) => (
                <filter key={`glow-${index}`} id={`glow-${index}`}>
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              ))}
              {/* Gradients for each segment */}
              <radialGradient id="gradientActive" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#34C759" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#34C759" stopOpacity="0.3"/>
              </radialGradient>
              <radialGradient id="gradientHold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF9500" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#FF9500" stopOpacity="0.3"/>
              </radialGradient>
              <radialGradient id="gradientOverdue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#FF3B30" stopOpacity="0.3"/>
              </radialGradient>
            </defs>
            
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              cornerRadius={8}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index]}
                  stroke={isDarkMode ? '#1a1a1a' : '#ffffff'}
                  strokeWidth={2}
                  style={{ 
                    cursor: 'pointer',
                    filter: activeIndex === index ? `url(#glow-${index})` : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  className="transition-all duration-300"
                />
              ))}
            </Pie>
            
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={78}
              fill="transparent"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`border-${index}`} fill="transparent" stroke="none" />
              ))}
            </Pie>
            
            <Tooltip content={<CustomTooltip />} cursor={false} />
            
            {/* Center Text */}
            {renderCenterText()}
          </PieChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        {renderLegend()}

        {/* Chart Insights */}
        <div className="mt-4 pt-3 border-t" style={{ borderColor: isDarkMode ? '#2C2C2E' : '#F3F4F6' }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: chartColors.active }} />
                <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {((stats.activeMembers / totalMembers) * 100).toFixed(1)}% Active
                </span>
              </div>
              <div className="w-px h-3" style={{ background: isDarkMode ? '#2C2C2E' : '#E5E7EB' }} />
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: chartColors.hold }} />
                <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {((stats.holdMembers / totalMembers) * 100).toFixed(1)}% Hold
                </span>
              </div>
              <div className="w-px h-3" style={{ background: isDarkMode ? '#2C2C2E' : '#E5E7EB' }} />
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: chartColors.overdue }} />
                <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {((stats.overdueMembers / totalMembers) * 100).toFixed(1)}% Overdue
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Retention rate: {((stats.activeMembers / totalMembers) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MemberChart;
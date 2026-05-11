import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
} from "recharts";
import { useState, useEffect } from "react";

const RevenueChart = ({ data }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      setIsDarkMode(saved ? saved === "dark" : true);
    };
    
    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[340px]">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gray-800">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No revenue data available</p>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Check back later for updates</p>
        </div>
      </div>
    );
  }

  const xKey = data.length > 0 && data[0].month ? "month" : "day";
  
  // Chart theme colors
  const chartColors = {
    dark: {
      stroke: '#FF3B30',
      area: 'url(#colorRevenueDark)',
      grid: '#2C2C2E',
      text: '#9CA3AF',
      tooltipBg: '#1C1C1E',
      tooltipBorder: '#FF3B30',
    },
    light: {
      stroke: '#8B5CF6',
      area: 'url(#colorRevenueLight)',
      grid: '#E5E7EB',
      text: '#6B7280',
      tooltipBg: '#FFFFFF',
      tooltipBorder: '#8B5CF6',
    }
  };

  const colors = isDarkMode ? chartColors.dark : chartColors.light;
  const maxRevenue = Math.max(...data.map(item => item.revenue));
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = totalRevenue / data.length;

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl shadow-2xl p-4 border backdrop-blur-sm animate-slideIn" style={{ 
          background: isDarkMode ? 'rgba(28, 28, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          borderColor: colors.tooltipBorder,
          borderWidth: '1px'
        }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ background: colors.stroke }} />
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold" style={{ color: colors.stroke }}>₹{payload[0].value}</span>
            <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>revenue</span>
          </div>
          <div className="mt-2 pt-2 border-t" style={{ borderColor: isDarkMode ? '#2C2C2E' : '#F3F4F6' }}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Live data</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      {/* Chart Header with Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-50 animate-pulse" />
            <div className="relative p-1.5 rounded-lg" style={{ background: colors.stroke }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className={`font-bold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Revenue Analytics
            </h3>
            <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Track earnings and financial trends
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="text-right">
            <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total Revenue</p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              ₹{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="w-px" style={{ background: isDarkMode ? '#2C2C2E' : '#E5E7EB' }} />
          <div className="text-right">
            <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Average</p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}>
              ₹{Math.round(avgRevenue).toLocaleString()}
            </p>
          </div>
          <div className="w-px" style={{ background: isDarkMode ? '#2C2C2E' : '#E5E7EB' }} />
          <div className="text-right">
            <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Peak</p>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              ₹{maxRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Gradient Definitions */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="colorRevenueDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FF3B30" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRevenueLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart 
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            onMouseMove={(e) => {
              if (e && e.activeTooltipIndex !== undefined) {
                setHoveredPoint(e.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDarkMode ? "#FF3B30" : "#8B5CF6"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isDarkMode ? "#FF3B30" : "#8B5CF6"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="5 5" 
              stroke={colors.grid} 
              strokeOpacity={0.5}
              vertical={false}
            />
            
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: colors.text, fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: colors.grid, strokeWidth: 1 }}
              tickLine={false}
              dy={5}
            />
            
            <YAxis 
              tickFormatter={(value) => `₹${value / 1000}k`}
              tick={{ fill: colors.text, fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dx={-5}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={false} />
            
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="none"
              fill="url(#colorRevenue)"
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={colors.stroke}
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload, index } = props;
                const isHovered = hoveredPoint === index;
                return (
                  <g key={`dot-${index}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 8 : 4}
                      fill={colors.stroke}
                      stroke={isDarkMode ? '#1a1a1a' : '#ffffff'}
                      strokeWidth={2}
                      className="transition-all duration-300 cursor-pointer"
                      style={{ filter: isHovered ? 'url(#glow)' : 'none' }}
                    />
                    {isHovered && (
                      <>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={12}
                          fill={colors.stroke}
                          fillOpacity={0.2}
                          className="animate-ping"
                        />
                        <text
                          x={cx}
                          y={cy - 12}
                          textAnchor="middle"
                          fill={colors.stroke}
                          fontSize={10}
                          fontWeight="bold"
                          className="select-none"
                        >
                          ₹{payload.revenue}
                        </text>
                      </>
                    )}
                  </g>
                );
              }}
              activeDot={{ r: 8, strokeWidth: 2, stroke: isDarkMode ? '#1a1a1a' : '#ffffff' }}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Chart Insights */}
        <div className="mt-4 pt-3 border-t" style={{ borderColor: isDarkMode ? '#2C2C2E' : '#F3F4F6' }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: colors.stroke }} />
                <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Revenue Trend</span>
              </div>
              <div className="w-px h-3" style={{ background: isDarkMode ? '#2C2C2E' : '#E5E7EB' }} />
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {data[data.length - 1]?.revenue > data[0]?.revenue ? '+12% vs last period' : 'Stable growth'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Real-time updates</span>
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
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RevenueChart;
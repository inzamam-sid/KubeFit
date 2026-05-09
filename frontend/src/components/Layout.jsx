
// import { useNavigate, useLocation } from "react-router-dom";

// const Layout = ({ children }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menu = [
//     { name: "Dashboard", path: "/dashboard", icon: "📊" },
//     { name: "Members", path: "/members", icon: "👥" },
//     { name: "Packages", path: "/packages", icon: "📦" },
//     { name: "Subscriptions", path: "/subscriptions", icon: "🧾" },
//     { name: "Subscriptions List", path: "/subscriptions-list", icon: "📋" },
//     { name: "Alerts", path: "/alerts", icon: "🚨" },
//   ];

//   return (
//     <div className="flex min-h-screen" style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 50%, #0D0D0D 100%)' }}>
      
//       {/* Premium Dark Sidebar */}
//       <div className="w-64 lg:w-72 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0D0D0D 100%)', boxShadow: '5px 0 30px rgba(0,0,0,0.5)' }}>
//         <div className="h-full flex flex-col p-6">
          
//           {/* Logo with Gym Theme */}
//           <div className="mb-8 text-center">
//             <div className="relative inline-block">
//               <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-xl animate-pulse" />
//               <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
//                 <span className="text-3xl">💪</span>
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
//               KubeFit
//             </h1>
//             <p className="text-xs text-gray-500 mt-1">Gym Management System</p>
//           </div>

//           {/* Premium Menu */}
//           <div className="space-y-2 flex-1">
//             {menu.map((item) => {
//               const active = location.pathname === item.path;

//               return (
//                 <div
//                   key={item.path}
//                   onClick={() => navigate(item.path)}
//                   className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
//                     active
//                       ? "bg-gradient-to-r from-red-600 to-orange-600 shadow-lg shadow-red-500/30"
//                       : "hover:bg-gray-800/50"
//                   }`}
//                 >
//                   <div className={`flex items-center gap-3 px-4 py-3 relative z-10 ${
//                     active ? "text-white" : "text-gray-300 group-hover:text-white"
//                   }`}>
//                     <span className="text-xl">{item.icon}</span>
//                     <span className="font-medium">{item.name}</span>
//                     {active && (
//                       <div className="ml-auto">
//                         <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
//                       </div>
//                     )}
//                   </div>
                  
//                   {!active && (
//                     <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-red-600/20 to-orange-600/20" />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Footer Stats */}
//           <div className="mt-6 pt-6 border-t border-gray-800">
//             <div className="text-center">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm mb-3">
//                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
//                 <span className="text-[10px] text-gray-400">System Online</span>
//               </div>
//               <p className="text-[10px] text-gray-600">
//                 © 2026 KubeFit<br />
//                 All rights reserved
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area - No White Space */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
//         {/* Premium Glass Header */}
//         <div className="sticky top-0 z-20 backdrop-blur-xl border-b" style={{ background: 'rgba(28, 28, 30, 0.95)', borderColor: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
//           <div className="flex items-center justify-between px-6 py-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)' }}>
//                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className="text-lg font-semibold text-white">
//                   Admin Dashboard
//                 </h2>
//                 <p className="text-xs text-gray-400">Welcome back, Administrator</p>
//               </div>
//             </div>
            
//             <button
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 navigate("/");
//               }}
//               className="group relative overflow-hidden rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
//               style={{ background: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)', boxShadow: '0 4px 15px rgba(255, 59, 48, 0.3)' }}
//             >
//               <span className="relative z-10 flex items-center gap-2 text-white text-sm">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 Logout
//               </span>
//               <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//             </button>
//           </div>
//         </div>

//         {/* Dynamic Content - No Padding/Margin Issues */}
//         <div className="flex-1">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;








import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = ({ children, isDarkMode = true, onThemeToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Members", path: "/members", icon: "👥" },
    { name: "Packages", path: "/packages", icon: "📦" },
    { name: "Subscriptions", path: "/subscriptions", icon: "🧾" },
    { name: "Subscriptions List", path: "/subscriptions-list", icon: "📋" },
    { name: "Alerts", path: "/alerts", icon: "🚨" },
  ];

  // Check if mobile on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ 
      background: isDarkMode 
        ? 'linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 50%, #0D0D0D 100%)'
        : 'linear-gradient(135deg, #f5f0ff 0%, #e8eaff 50%, #f5f0ff 100%)'
    }}>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Ultra Premium Sidebar - FIXED position, doesn't scroll */}
      <div 
        className={`
          fixed md:relative z-40 flex-shrink-0 transition-all duration-500 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          w-72 lg:w-80
          h-full
        `}
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(245,240,255,0.98) 100%)',
          boxShadow: isDarkMode 
            ? '5px 0 30px rgba(0,0,0,0.5)'
            : '5px 0 30px rgba(0,0,0,0.08)'
        }}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          
          {/* Ultra Premium Logo */}
          <div className="mb-10 text-center group flex-shrink-0">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-2xl animate-pulse opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <span className="text-4xl group-hover:animate-bounce">💪</span>
              </div>
            </div>
            <h1 className="text-3xl font-black">
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                KubeFit
              </span>
            </h1>
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} font-medium`}>
              POWERED BY ScaleDevX
            </p>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 md:hidden p-2 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white backdrop-blur-sm transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Premium Menu Items - Scrollable if needed */}
          <div className="space-y-2 flex-1 mt-4 overflow-y-auto">
            {menu.map((item) => {
              const active = location.pathname === item.path;

              return (
                <div
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-red-600 to-orange-600 shadow-lg shadow-red-500/40"
                      : `hover:${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`
                  }`}
                >
                  <div className={`flex items-center gap-3 px-5 py-3.5 relative z-10 transition-all duration-300 ${
                    active ? "text-white" : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'} group-hover:${isDarkMode ? 'text-white' : 'text-gray-900'}`
                  }`}>
                    <span className="text-xl transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                    <span className="font-semibold">{item.name}</span>
                    {active && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-lg shadow-white/50" />
                      </div>
                    )}
                  </div>
                  
                  {!active && (
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-red-600/20 to-orange-600/20" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Theme Toggle & Footer - Fixed at bottom */}
          <div className="flex-shrink-0 pt-6 mt-auto border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            
            {/* Premium Toggle Switch - Modern iOS Style */}
            <div className="mb-6 px-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50" />
                <div className="relative backdrop-blur-xl rounded-full p-1" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 transition-all duration-300 ${!isDarkMode ? 'text-yellow-500' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                      </span>
                    </div>
                    
                    {/* Toggle Switch */}
                    <button
                      onClick={() => onThemeToggle && onThemeToggle(!isDarkMode)}
                      className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      style={{ background: isDarkMode ? 'linear-gradient(135deg, #FF3B30, #FF9500)' : 'linear-gradient(135deg, #667eea, #764ba2)' }}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                          isDarkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping absolute" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 relative" />
                </div>
                <span className={`text-[10px] font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>System Online</span>
              </div>
            </div>
            
            <p className={`text-[10px] text-center ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              © 2026 KubeFit Elite<br />
              POWERED BY ScaleDevX
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Premium Glass Header - Sticky */}
        <div className="sticky top-0 z-20 backdrop-blur-2xl border-b flex-shrink-0" style={{ 
          background: isDarkMode ? 'rgba(20, 20, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)' }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Admin Dashboard
                </h2>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Welcome back, Administrator</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="group relative overflow-hidden rounded-xl px-3 sm:px-5 py-2 font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)', boxShadow: '0 4px 15px rgba(255, 59, 48, 0.4)' }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white text-xs sm:text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </div>
        </div>

        {/* Dynamic Content - Scrollable area */}
        <div className="flex-1">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        
        /* Custom scrollbar styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
        }
      `}</style>
    </div>
  );
};

export default Layout;
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const PublicNavbar = ({ isDarkMode = true, onThemeToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    red: isDarkMode 
      ? 'linear-gradient(135deg, #FF3B30 0%, #FF453A 100%)'
      : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    orange: isDarkMode 
      ? 'linear-gradient(135deg, #FF9500 0%, #FF9F0A 100%)'
      : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  });

  const gradients = getGradients(isDarkMode);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "About", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📞" },
    { name: "FAQ", path: "/faq", icon: "❓" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-2xl border-b ${
          isScrolled ? "py-2 shadow-2xl" : "py-4"
        }`}
        style={{
          background: isScrolled 
            ? (isDarkMode ? 'rgba(20, 20, 25, 0.98)' : 'rgba(255, 255, 255, 0.98)')
            : (isDarkMode ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)'),
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: isScrolled ? (isDarkMode ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)') : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section - Ultra Premium */}
            <div 
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                {/* Animated gradient orb */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-lg group-hover:scale-110 transition-transform duration-500" />
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <span className="text-xl sm:text-2xl group-hover:animate-bounce">💪</span>
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-black">
                  <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                    KubeFit
                  </span>
                </h1>
                <p className={`text-[8px] sm:text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} -mt-1 font-medium`}>
                  ELITE GYM
                </p>
              </div>
            </div>

            {/* Desktop Menu - Premium Design */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group relative px-4 lg:px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-white"
                      : `${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                    <span className="text-sm lg:text-base">{item.name}</span>
                  </span>
                  
                  {/* Active indicator with gradient */}
                  {isActive(item.path) && (
                    <>
                      <div className="absolute inset-0 rounded-xl" style={{ background: gradients.brand, opacity: 0.15 }} />
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full" style={{ background: gradients.brand }} />
                    </>
                  )}
                  
                  {/* Hover shine effect */}
                  {!isActive(item.path) && (
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 rounded-xl bg-gradient-to-r from-red-600/10 to-orange-600/10" />
                  )}
                </button>
              ))}
            </div>

            {/* Right Section - Login & Theme Toggle */}
            <div className="flex items-center gap-3">
              {/* Ultra Premium Theme Toggle */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50" />
                <div className="relative flex items-center gap-1 p-1 rounded-full backdrop-blur-xl" style={{ 
                  background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)', 
                  border: '1px solid rgba(255,255,255,0.2)' 
                }}>
                  <button
                    onClick={() => onThemeToggle && onThemeToggle(false)}
                    className={`relative z-10 p-1.5 sm:p-2 rounded-full transition-all duration-500 ${!isDarkMode ? 'bg-white shadow-2xl scale-110' : 'hover:scale-105'}`}
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onThemeToggle && onThemeToggle(true)}
                    className={`relative z-10 p-1.5 sm:p-2 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white/20 shadow-2xl scale-110' : 'hover:scale-105'}`}
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Login Button - Premium */}
              <button
                onClick={() => navigate("/login")}
                className="group relative overflow-hidden px-5 sm:px-6 py-2 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                style={{ background: gradients.brand, boxShadow: '0 4px 15px rgba(255, 59, 48, 0.3)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Login</span>
                  <span className="sm:hidden">Sign In</span>
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{ background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown - Premium Glass Morphism */}
      <div
        className={`fixed top-[68px] sm:top-[76px] left-0 right-0 z-40 md:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ 
          background: isDarkMode ? 'rgba(28, 28, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)', 
          backdropFilter: 'blur(20px)', 
          borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
      >
        <div className="p-4 sm:p-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive(item.path)
                  ? "text-white"
                  : `${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:bg-gray-800/50`
              }`}
              style={isActive(item.path) ? { background: 'rgba(255, 59, 48, 0.15)' } : {}}
            >
              <span className="text-xl transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
              <span className="font-semibold">{item.name}</span>
              {isActive(item.path) && (
                <>
                  <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse" />
                  <div className="absolute right-4 w-1 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
                </>
              )}
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <button
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className="w-full group relative overflow-hidden px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 text-sm"
              style={{ background: gradients.brand, boxShadow: '0 4px 15px rgba(255, 59, 48, 0.3)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Access Dashboard
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-[68px] sm:h-[76px]" />

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;
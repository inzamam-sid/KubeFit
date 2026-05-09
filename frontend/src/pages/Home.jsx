import PublicNavbar from "../components/PublicNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  // Ultra-Premium Gradients for both themes
  const getGradients = (isDarkMode) => ({
    brand: isDarkMode 
      ? 'linear-gradient(135deg, #FF3B30 0%, #FF9500 50%, #FF3B30 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    card: isDarkMode 
      ? 'linear-gradient(135deg, rgba(28, 28, 30, 0.98) 0%, rgba(28, 28, 30, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 240, 255, 0.95) 100%)',
    cardPremium: isDarkMode 
      ? 'linear-gradient(135deg, rgba(35, 35, 40, 0.98) 0%, rgba(25, 25, 30, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 245, 255, 0.95) 100%)',
    dark: isDarkMode 
      ? 'linear-gradient(135deg, #1a1a1a 0%, #0D0D0D 50%, #1a1a1a 100%)'
      : 'linear-gradient(135deg, #f5f0ff 0%, #e8eaff 50%, #f5f0ff 100%)',
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
    purple: isDarkMode 
      ? 'linear-gradient(135deg, #5856D6 0%, #5E5CE6 100%)'
      : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
  });

  const gradients = getGradients(isDarkMode);
  const bgGradient = isDarkMode 
    ? 'radial-gradient(ellipse at 20% 30%, #1a1a2e 0%, #0a0a0f 100%)'
    : 'radial-gradient(ellipse at 20% 30%, #f5f0ff 0%, #e8eaff 100%)';

  const gymFeatures = [
    {
      icon: "💪",
      title: "World-Class Equipment",
      description: "Premium machines from top brands including Technogym, Life Fitness, and Hammer Strength.",
      color: gradients.red,
      stats: "200+ Machines"
    },
    {
      icon: "🏋️",
      title: "Expert Trainers",
      description: "Certified personal trainers with 10+ years of experience to guide your fitness journey.",
      color: gradients.orange,
      stats: "25+ Trainers"
    },
    {
      icon: "🧘",
      title: "Group Classes",
      description: "Yoga, Zumba, CrossFit, Pilates, and HIIT sessions daily with professional instructors.",
      color: gradients.green,
      stats: "40+ Weekly Classes"
    },
    {
      icon: "🏊",
      title: "Premium Amenities",
      description: "Steam room, sauna, swimming pool, and recovery zone for complete wellness.",
      color: gradients.blue,
      stats: "5 Star Amenities"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "State-of-the-art body composition analyzers and fitness tracking technology.",
      color: gradients.purple,
      stats: "Smart Tracking"
    },
    {
      icon: "🕐",
      title: "24/7 Access",
      description: "Round-the-clock gym access with secure entry system for members.",
      color: gradients.brand,
      stats: "24/7 Available"
    }
  ];

  const gymStats = [
    { value: "3000+", label: "Active Members", icon: "👥", color: gradients.red },
    { value: "200+", label: "Equipment Machines", icon: "🏋️", color: gradients.orange },
    { value: "25+", label: "Expert Trainers", icon: "💪", color: gradients.green },
    { value: "98%", label: "Member Satisfaction", icon: "⭐", color: gradients.blue },
    { value: "40+", label: "Weekly Classes", icon: "🧘", color: gradients.purple },
    { value: "24/7", label: "Gym Access", icon: "🕐", color: gradients.brand },
  ];

  const facilities = [
    { name: "Cardio Zone", icon: "🏃", equipment: "50+ Treadmills, Bikes, Ellipticals" },
    { name: "Strength Training", icon: "🏋️", equipment: "100+ Free Weights & Machines" },
    { name: "Functional Area", icon: "⚡", equipment: "TRX, Battle Ropes, Kettlebells" },
    { name: "Swimming Pool", icon: "🏊", equipment: "25m Heated Lap Pool" },
    { name: "Spa & Recovery", icon: "🧖", equipment: "Sauna, Steam, Massage Chairs" },
    { name: "Group Studios", icon: "🎯", equipment: "2 Large Studios for Classes" },
  ];

  // Rotate features for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % gymFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-700" style={{ background: bgGradient }}>
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <PublicNavbar isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode} />

      {/* Hero Section - Ultra Premium */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 mb-6 animate-pulse" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>PREMIUM FITNESS CENTER</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              KubeFit
            </span>
            <br />
            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Elite Gym</span>
          </h1>

          {/* Subheading */}
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Experience the pinnacle of fitness with state-of-the-art equipment, 
            expert trainers, and premium facilities designed for champions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => navigate("/login")}
              className="group relative overflow-hidden px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 text-base sm:text-lg"
              style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Join Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            <button
              onClick={() => navigate("/login")}
              className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 text-base sm:text-lg border ${
                isDarkMode 
                  ? 'border-gray-700 hover:border-red-500/50 text-white'
                  : 'border-gray-300 hover:border-purple-500/50 text-gray-900'
              }`}
              style={{ background: isDarkMode ? 'rgba(28, 28, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}
            >
              Tour Facilities
            </button>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {gymStats.map((stat, index) => (
              <div key={index} className="text-center group animate-slideUp" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}>
                <div className="relative inline-block mb-2">
                  <div className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: stat.color }} />
                  <div className="relative text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <p className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className={`text-[10px] sm:text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Showcase Section */}
      <div className="relative py-16 sm:py-20 md:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 mb-4" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-orange-400' : 'text-purple-600'}`}>PREMIUM FACILITIES</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              World-Class
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"> Facilities</span>
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need for an elite fitness experience under one roof
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-slideUp" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(20px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover:h-1" style={{ background: gradients.brand }} />
                
                <div className="relative p-6">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{facility.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{facility.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{facility.equipment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gym Features Grid */}
      <div className="relative py-16 sm:py-20 md:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 mb-4" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-green-400' : 'text-purple-600'}`}>WHY CHOOSE US</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Elite
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"> Gym Features</span>
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover what makes KubeFit the premier fitness destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gymFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-slideUp"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: feature.color, filter: 'blur(20px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover:h-1" style={{ background: feature.color }} />
                
                <div className="relative p-6 sm:p-8">
                  <div className="text-4xl sm:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                  <p className={`text-sm sm:text-base mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-sm" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>{feature.stats}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rotating Feature Showcase */}
      <div className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl" style={{ background: gradients.cardPremium }}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-600 to-orange-600 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
            
            <div className="relative p-8 sm:p-12 text-center">
              <div className="text-7xl sm:text-8xl mb-6 animate-bounce">
                {gymFeatures[currentFeature].icon}
              </div>
              <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {gymFeatures[currentFeature].title}
              </h3>
              <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {gymFeatures[currentFeature].description}
              </p>
              <div className="inline-flex items-center gap-1 px-4 py-2 rounded-full backdrop-blur-sm" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>{gymFeatures[currentFeature].stats}</span>
              </div>
              
              <div className="flex justify-center gap-2 mt-8">
                {gymFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentFeature === index 
                        ? "w-8 bg-gradient-to-r from-red-500 to-orange-500" 
                        : `w-2 ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership CTA Section */}
      <div className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl group" style={{ background: gradients.dark, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(40px)' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative p-8 sm:p-12 text-center">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Ready to Transform Your Fitness Journey?
              </h2>
              <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join the premier fitness community and experience the KubeFit difference
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/login")}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 overflow-hidden text-lg"
                  style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Membership
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 text-lg border ${
                    isDarkMode 
                      ? 'border-gray-700 hover:border-red-500/50 text-white'
                      : 'border-gray-300 hover:border-purple-500/50 text-gray-900'
                  }`}
                  style={{ background: isDarkMode ? 'rgba(28, 28, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}
                >
                  Schedule Visit
                </button>
              </div>
              <p className={`text-xs sm:text-sm mt-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                Limited time offer • First month free • No commitment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 px-4">
        <div className="inline-flex items-center gap-2 text-xs">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
          <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>💪 KubeFit Elite Gym - POWERED BY ScaleDevX</span>
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
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
      `}</style>
    </div>
  );
};

export default Home;
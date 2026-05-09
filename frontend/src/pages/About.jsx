
import PublicNavbar from "../components/PublicNavbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const About = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const gymStats = [
    { value: "3000+", label: "Active Members", icon: "👥", color: gradients.red, description: "Strong & Growing Community" },
    { value: "200+", label: "Equipment Machines", icon: "🏋️", color: gradients.orange, description: "State-of-the-art Equipment" },
    { value: "25+", label: "Expert Trainers", icon: "💪", color: gradients.green, description: "Certified Professionals" },
    { value: "98%", label: "Member Satisfaction", icon: "⭐", color: gradients.blue, description: "Happy Members" },
    { value: "40+", label: "Weekly Classes", icon: "🧘", color: gradients.purple, description: "Diverse Training Options" },
    { value: "24/7", label: "Gym Access", icon: "🕐", color: gradients.brand, description: "Round-the-clock Availability" },
  ];

  const facilities = [
    { name: "Cardio Zone", icon: "🏃", equipment: "50+ Treadmills, Bikes, Ellipticals", color: gradients.red },
    { name: "Strength Training", icon: "🏋️", equipment: "100+ Free Weights & Machines", color: gradients.orange },
    { name: "Functional Area", icon: "⚡", equipment: "TRX, Battle Ropes, Kettlebells", color: gradients.green },
    { name: "Swimming Pool", icon: "🏊", equipment: "25m Heated Lap Pool", color: gradients.blue },
    { name: "Spa & Recovery", icon: "🧖", equipment: "Sauna, Steam, Massage Chairs", color: gradients.purple },
    { name: "Group Studios", icon: "🎯", equipment: "2 Large Studios for Classes", color: gradients.brand },
  ];

  const gymHighlights = [
    { icon: "🏆", title: "Premier Location", description: "Centrally located with easy access and ample parking" },
    { icon: "🎓", title: "Expert Trainers", description: "Internationally certified trainers with 10+ years experience" },
    { icon: "🏥", title: "Injury Prevention", description: "Specialized programs for injury prevention and recovery" },
    { icon: "📱", title: "Smart Tracking", description: "Advanced body composition analysis and progress tracking" },
    { icon: "🍎", title: "Nutrition Guidance", description: "Personalized nutrition plans from certified experts" },
    { icon: "🎯", title: "Goal-Oriented", description: "Customized training programs for your fitness goals" },
  ];

  const trainers = [
    { name: "MOHD Sahil", specialty: "Strength & Conditioning", experience: "12 years", icon: "💪", color: gradients.red },
    { name: "Sarah Johnson", specialty: "Yoga & Pilates", experience: "10 years", icon: "🧘", color: gradients.orange },
    { name: "MOHD Zaid", specialty: "CrossFit & HIIT", experience: "8 years", icon: "⚡", color: gradients.green },
    { name: "Lisa Martinez", specialty: "Nutrition & Wellness", experience: "15 years", icon: "🥗", color: gradients.blue },
  ];

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
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>KUBEFIT ELITE GYM</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              Where Champions
            </span>
            <br />
            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Are Made</span>
          </h1>

          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Welcome to KubeFit Elite Gym - the premier fitness destination equipped with 
            world-class facilities, expert trainers, and a community dedicated to excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </div>

      {/* Gym Stats Section */}
      <div className="relative py-16 sm:py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 mb-4" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-green-400' : 'text-purple-600'}`}>BY THE NUMBERS</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              KubeFit in
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"> Numbers</span>
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              The numbers that speak for our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {gymStats.map((stat, index) => (
              <div key={index} className="group/stat relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-slideUp" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}>
                <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700" style={{ background: stat.color, filter: 'blur(15px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover/stat:h-1" style={{ background: stat.color }} />
                
                <div className="relative p-4 text-center">
                  <div className="text-3xl sm:text-4xl mb-2 group-hover/stat:animate-bounce">{stat.icon}</div>
                  <p className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                  <p className={`text-xs font-semibold mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                  <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Showcase */}
      <div className="relative py-16 sm:py-20">
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
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: facility.color, filter: 'blur(20px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover:h-1" style={{ background: facility.color }} />
                
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

      {/* Gym Highlights */}
      <div className="relative py-16 sm:py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 mb-4" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-blue-400' : 'text-purple-600'}`}>WHY US</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              What Makes
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"> Us Elite</span>
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover what sets KubeFit apart from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gymHighlights.map((highlight, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-slideUp" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(20px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover:h-1" style={{ background: gradients.brand }} />
                
                <div className="relative p-6 text-center">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{highlight.icon}</div>
                  <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{highlight.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expert Trainers Section */}
      <div className="relative py-16 sm:py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 mb-4" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>EXPERT TEAM</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Meet Our
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"> Expert Trainers</span>
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Learn from the best in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((trainer, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-slideUp" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: trainer.color, filter: 'blur(20px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover:h-1" style={{ background: trainer.color }} />
                
                <div className="relative p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: trainer.color }} />
                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-4xl mx-auto" style={{ background: trainer.color }}>
                      {trainer.icon}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{trainer.name}</h3>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>{trainer.specialty}</p>
                  <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{trainer.experience} Experience</p>
                </div>
              </div>
            ))}
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

export default About;
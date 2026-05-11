import { useState, useEffect } from "react";
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

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const gradients = getGradients(isDarkMode);
  const bgGradient = isDarkMode 
    ? 'radial-gradient(ellipse at 20% 30%, #1a1a2e 0%, #0a0a0f 100%)'
    : 'radial-gradient(ellipse at 20% 30%, #f5f0ff 0%, #e8eaff 100%)';

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleChangePassword = async () => {
    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      return alert("⚠️ All fields are required");
    }

    if (form.newPassword !== form.confirmPassword) {
      return alert("❌ Passwords do not match");
    }

    if (form.newPassword.length < 6) {
      return alert("⚠️ Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      const res = await API.put("/auth/change-password", form);
      alert(res.data.message);
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode}>
      <div className="min-h-screen relative overflow-hidden transition-all duration-700" style={{ background: bgGradient }}>
        
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
          
          {/* Hero Section */}
          <div className="relative group mb-8">
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>
                          SECURITY SETTINGS
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                          Change
                        </span>
                        <br className="block sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                          Password
                        </span>
                      </h1>
                      <p className={`text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Update your account password • Keep your account secure
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
                        <span className="text-xs font-semibold text-green-400">Secure Connection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Form Card */}
          <div className="max-w-2xl mx-auto">
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(30px)' }} />
              <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} />
              <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.brand }} />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg animate-pulse" />
                    <div className="relative p-2 rounded-xl" style={{ background: gradients.purple }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Update Password
                    </h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Choose a strong password to protect your account
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Current Password */}
                  <div className="relative group/input">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                    <div className="relative">
                      <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Current Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          value={form.currentPassword}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              currentPassword: e.target.value,
                            })
                          }
                          className={`relative w-full pl-10 pr-10 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                            isDarkMode 
                              ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                              : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                          } focus:outline-none focus:ring-2 focus:border-transparent`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showCurrentPassword ? (
                            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="relative group/input">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                    <div className="relative">
                      <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={form.newPassword}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              newPassword: e.target.value,
                            })
                          }
                          className={`relative w-full pl-10 pr-10 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                            isDarkMode 
                              ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                              : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                          } focus:outline-none focus:ring-2 focus:border-transparent`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showNewPassword ? (
                            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {form.newPassword && form.newPassword.length < 6 && (
                        <p className="text-yellow-500 text-xs mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Password must be at least 6 characters
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative group/input">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                    <div className="relative">
                      <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter new password"
                          value={form.confirmPassword}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              confirmPassword: e.target.value,
                            })
                          }
                          className={`relative w-full pl-10 pr-10 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                            isDarkMode 
                              ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                              : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                          } focus:outline-none focus:ring-2 focus:border-transparent`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {form.confirmPassword && form.newPassword !== form.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Passwords do not match
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Update Button */}
                  <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="group relative w-full overflow-hidden py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-6 text-base sm:text-lg"
                    style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Updating Password...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Update Password
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </button>
                </div>
              </div>
            </div>

            {/* Security Tips Card */}
            <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 mt-6 transition-all duration-500 hover:shadow-2xl group/tips" style={{ background: gradients.dark, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="absolute inset-0 opacity-0 group-hover/tips:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(40px)' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/tips:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl sm:text-4xl animate-bounce">🔒</div>
                    <div>
                      <p className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'} uppercase tracking-wider`}>Security Tips</p>
                      <p className={`text-sm sm:text-base mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Use a strong password that you don't use elsewhere
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Min 6 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Use mix of letters & numbers</span>
                    </div>
                  </div>
                </div>
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
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </Layout>
  );
};

export default ChangePassword;
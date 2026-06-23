import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Premium Dark Gym Gradients
  const gradients = {
    brand: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 50%, #FF3B30 100%)',
    card: 'linear-gradient(135deg, rgba(28, 28, 30, 0.98) 0%, rgba(28, 28, 30, 0.95) 100%)',
    dark: 'linear-gradient(135deg, #1a1a1a 0%, #0D0D0D 50%, #1a1a1a 100%)',
    red: 'linear-gradient(135deg, #FF3B30 0%, #FF453A 100%)',
    orange: 'linear-gradient(135deg, #FF9500 0%, #FF9F0A 100%)',
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);
      // localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem(
        "token",
        res.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );
      alert("Login successful");
      window.location.href = "/dashboard";
    } catch (err) {
      // setError("Invalid email or password. Please try again.");
      // alert("Invalid credentials");
      console.log(err);

  alert(
    JSON.stringify(
      err.response?.data || err.message
    )
  );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 50%, #0D0D0D 100%)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl animate-pulse delay-1000 opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-2000 opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        {/* Back to Home Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <button
            onClick={() => navigate("/")}
            className="group relative overflow-hidden px-3 sm:px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
            style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </button>
        </div>

        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-xl animate-pulse" />
            <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center">
              <span className="text-3xl">💪</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            KubeFit
          </h1>
          <p className="text-gray-500 text-sm mt-2">Gym Management System</p>
        </div>

        {/* Login Card */}
        <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: gradients.brand, filter: 'blur(20px)' }} />
          <div className="absolute inset-px rounded-2xl" style={{ background: gradients.card }} />
          <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: gradients.brand }} />
          
          <div className="relative p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Admin Login</h2>
              <p className="text-gray-400 text-sm mt-1">Access your gym management dashboard</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 animate-slide-in">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="admin@kubefit.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-700 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-500 hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500 hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="group relative w-full overflow-hidden py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.3)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login to Dashboard
                  </>
                )}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            {/* Demo Credentials Hint */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {/* <span>Demo: admin@kubefit.com / admin123</span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-red-600" />
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
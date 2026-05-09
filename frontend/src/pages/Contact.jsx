import PublicNavbar from "../components/PublicNavbar";
import { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["123 Fitness Street", "Gym District", "Mumbai, India 400001"],
      color: gradients.red
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
      color: gradients.orange
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["info@kubefit.com", "support@kubefit.com"],
      color: gradients.green
    },
    {
      icon: "⏰",
      title: "Working Hours",
      details: ["Monday - Friday: 6 AM - 10 PM", "Saturday - Sunday: 8 AM - 8 PM"],
      color: gradients.blue
    }
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
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-28">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 mb-6 animate-pulse" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>GET IN TOUCH</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              Contact Us
            </span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have questions about memberships or facilities? We'd love to hear from you. 
            Send us a message and our team will respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="relative py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Info Grid - Ultra Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-slideUp"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: info.color, filter: 'blur(20px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 group-hover:h-1" style={{ background: info.color }} />
                
                <div className="relative p-6 text-center">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{detail}</p>
                  ))}
                </div>
                
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Contact Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Form - Premium Glass Morphism */}
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(30px)' }} />
              <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
              <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.brand }} />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur-lg animate-pulse" />
                    <div className="relative p-2 rounded-xl" style={{ background: gradients.red }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Send us a Message</h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>We'll respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div className="relative group/input">
                      <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                      <div className="relative">
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                            isDarkMode 
                              ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                              : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                          } focus:outline-none focus:ring-2 focus:border-transparent`}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div className="relative group/input">
                      <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                      <div className="relative">
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base ${
                            isDarkMode 
                              ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                              : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                          } focus:outline-none focus:ring-2 focus:border-transparent`}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="relative group/input">
                      <div className="absolute -inset-px bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover/input:opacity-50 transition-all duration-500" />
                      <div className="relative">
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base resize-none ${
                            isDarkMode 
                              ? 'border-gray-700 bg-black/60 text-white placeholder-gray-500 focus:ring-red-500'
                              : 'border-gray-300 bg-white/60 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
                          } focus:outline-none focus:ring-2 focus:border-transparent`}
                          placeholder="Tell us how we can help..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full overflow-hidden px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
                      style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Message
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>

                    {submitted && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 animate-slideIn">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-500 text-sm font-semibold">Message Sent Successfully!</p>
                          <p className={`text-xs ${isDarkMode ? 'text-green-400/70' : 'text-green-600/70'}`}>We'll get back to you soon.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Map Section - Premium Glass Morphism */}
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.orange, filter: 'blur(30px)' }} />
              <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
              <div className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: gradients.orange }} />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur-lg animate-pulse" />
                    <div className="relative p-2 rounded-xl" style={{ background: gradients.orange }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Find Our Gym</h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Come visit us at our premium location</p>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl">
                  <iframe
                    title="KubeFit Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.64332512328!2d72.74110168468676!3d19.08219798560398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
                
                <div className="mt-6 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 rounded-lg" style={{ background: gradients.red }}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📍 State-of-the-art Facility</p>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        123 Fitness Street, Gym District, Mumbai, Maharashtra 400001, India
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>🚗 Free Parking Available</span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>♿ Wheelchair Accessible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Quick Links */}
          <div className="relative mt-8 sm:mt-12">
            <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl group" style={{ background: gradients.dark, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(40px)' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative p-6 sm:p-8 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Follow Us on Social Media</h4>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Stay updated with our latest news and offers</p>
                  </div>
                  <div className="flex gap-3">
                    {["📘", "📸", "🎥", "💬"].map((social, idx) => (
                      <button
                        key={idx}
                        className="group/social relative w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-xl"
                        style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}
                      >
                        <span className="relative z-10">{social}</span>
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" style={{ background: gradients.brand }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section Link */}
          <div className="relative mt-8 sm:mt-12">
            <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl group" style={{ background: gradients.cardPremium, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(30px)' }} />
              
              <div className="relative p-6 sm:p-8 text-center">
                <p className={`mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Have more questions about memberships or facilities?</p>
                <button
                  onClick={() => window.location.href = "/faq"}
                  className="group/faq inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3"
                  style={{ color: isDarkMode ? '#FF9500' : '#F59E0B' }}
                >
                  <span>Visit our FAQ page</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/faq:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center py-8 px-4">
        <div className="inline-flex items-center gap-2 text-xs">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
          <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>📧 We typically respond within 24 hours</span>
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
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;
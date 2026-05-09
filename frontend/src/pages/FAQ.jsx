import PublicNavbar from "../components/PublicNavbar";
import { useState, useEffect } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
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

  const faqs = [
    {
      question: "What makes KubeFit Gym different?",
      answer: "KubeFit Elite Gym offers world-class equipment from top brands, internationally certified trainers with 10+ years experience, 40+ weekly classes including Yoga, Zumba, CrossFit, and 24/7 gym access with premium amenities like swimming pool, steam room, and sauna.",
      category: "Facilities"
    },
    {
      question: "What are the membership options?",
      answer: "We offer flexible membership packages including monthly, quarterly, half-yearly, and annual plans. Each package includes full access to all gym facilities, group classes, and basic training guidance.",
      category: "Membership"
    },
    {
      question: "Do you have certified personal trainers?",
      answer: "Yes! We have 25+ internationally certified personal trainers specializing in strength training, weight loss, bodybuilding, yoga, CrossFit, and rehabilitation. All trainers have 10+ years of experience.",
      category: "Training"
    },
    {
      question: "What facilities are available?",
      answer: "Our 5000+ sq. ft. facility includes: Cardio zone (50+ machines), Strength training area (100+ equipment), Functional training zone, 25m heated swimming pool, Steam & sauna rooms, Group class studios, Recovery zone with massage chairs, and VIP changing rooms.",
      category: "Facilities"
    },
    {
      question: "What are the gym operating hours?",
      answer: "KubeFit is open 24/7, 365 days a year! You can access the gym anytime using your secure RFID card or mobile app. Staffed hours are 6 AM - 10 PM on weekdays and 8 AM - 8 PM on weekends.",
      category: "Timings"
    },
    {
      question: "Do you offer group fitness classes?",
      answer: "Yes! We offer 40+ weekly classes including Yoga, Zumba, CrossFit, HIIT, Pilates, Spin/Cycling, Kickboxing, and Senior Fitness. All classes are led by certified instructors and included in membership.",
      category: "Classes"
    },
    {
      question: "Is there parking available?",
      answer: "Yes, we have a dedicated parking area with 100+ spots, including 2-wheeler and 4-wheeler parking. Parking is free for all members during gym hours.",
      category: "Facilities"
    },
    {
      question: "Do you provide nutritional guidance?",
      answer: "Absolutely! We have certified nutritionists who provide personalized meal plans, diet consultations, and supplement guidance. Basic nutrition guidance is included in all memberships.",
      category: "Wellness"
    },
    {
      question: "Can I freeze my membership?",
      answer: "Yes, memberships can be put on hold for medical reasons, travel, or personal emergencies for up to 3 months per year. A valid reason/documentation may be required.",
      category: "Membership"
    },
    {
      question: "What safety measures are in place?",
      answer: "We maintain strict hygiene standards with daily deep cleaning, sanitization stations throughout the gym, air purification systems, and first-aid trained staff on duty.",
      category: "Safety"
    },
    {
      question: "Do you have a swimming pool?",
      answer: "Yes! We have a temperature-controlled 25-meter lap pool with separate lanes for training and leisure. Professional swimming coaches are available for lessons.",
      category: "Facilities"
    },
    {
      question: "How do I book a trial session?",
      answer: "Contact us via phone, email, or visit our gym for a free trial session. Our team will give you a complete facility tour and one complimentary training session.",
      category: "Membership"
    }
  ];

  const categories = ["All", ...new Set(faqs.map(faq => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Facilities: "🏋️",
      Membership: "💳",
      Training: "💪",
      Timings: "⏰",
      Classes: "🧘",
      Wellness: "🥗",
      Safety: "🛡️"
    };
    return icons[category] || "❓";
  };

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
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>KNOWLEDGE BASE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              Frequently Asked
            </span>
            <br />
            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Questions</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Everything you need to know about KubeFit Elite Gym - from facilities and memberships to classes and amenities
          </p>
        </div>
      </div>

      <div className="relative py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filters - Premium Design */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group relative px-4 sm:px-5 py-2 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm overflow-hidden ${
                  selectedCategory === category
                    ? "text-white shadow-lg"
                    : `${isDarkMode ? 'text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-200'}`
                }`}
                style={selectedCategory === category ? { background: gradients.brand } : {}}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category !== "All" && getCategoryIcon(category)}
                  {category}
                </span>
                {selectedCategory === category && (
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                )}
              </button>
            ))}
          </div>

          {/* FAQ Count */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm" style={{ background: isDarkMode ? 'rgba(30,30,35,0.5)' : 'rgba(255,255,255,0.5)' }}>
              <svg className={`w-4 h-4 ${isDarkMode ? 'text-red-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{filteredFaqs.length} FAQs found</span>
            </div>
          </div>
          
          {/* FAQ Accordion - Premium Glass Morphism */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl animate-slideUp"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(20px)' }} />
                <div className="absolute inset-px rounded-2xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
                <div className={`absolute inset-x-0 top-0 h-0.5 transition-all duration-500 ${openIndex === index ? 'h-1' : 'group-hover:h-1'}`} style={{ background: gradients.brand }} />
                
                <div className="relative">
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-4 pr-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          openIndex === index ? 'scale-110' : 'group-hover:scale-105'
                        }`} style={{ background: openIndex === index ? gradients.brand : 'rgba(255,255,255,0.1)' }}>
                          <span className="text-white text-sm sm:text-base font-bold">?</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] sm:text-xs px-3 py-1 rounded-full font-semibold ${
                            isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {faq.category}
                          </span>
                        </div>
                        <h3 className={`font-bold text-sm sm:text-base md:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 ml-4">
                      <svg
                        className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Answer Panel */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="p-5 sm:p-6 pt-0 pl-11 sm:pl-14">
                      <div className="flex gap-3">
                        <div className="w-0.5 rounded-full" style={{ background: gradients.brand }} />
                        <div>
                          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {faq.answer}
                          </p>
                          
                          {/* Related Actions */}
                          {(faq.question.includes("Contact") || faq.question.includes("trial") || faq.question.includes("book")) && (
                            <button
                              onClick={() => window.location.href = "/contact"}
                              className="mt-4 inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 text-sm font-semibold"
                              style={{ color: isDarkMode ? '#FF9500' : '#F59E0B' }}
                            >
                              Contact Us Today
                              <svg className="w-4 h-4 transition-transform duration-300 group-hover/faq:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Still Have Questions Card - Premium CTA */}
          <div className="relative mt-12">
            <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl group" style={{ background: gradients.dark, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: gradients.brand, filter: 'blur(40px)' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative p-8 sm:p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-6" style={{ background: gradients.red }}>
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Still Have Questions?
                </h3>
                <p className={`text-sm sm:text-base mb-6 max-w-md mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Can't find the answer you're looking for? Our support team is here to help!
                </p>
                <button
                  onClick={() => window.location.href = "/contact"}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 overflow-hidden text-base sm:text-lg"
                  style={{ background: gradients.brand, boxShadow: '0 10px 30px rgba(255, 59, 48, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Support
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats - Premium Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <div className="group relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-px rounded-xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
              <div className="relative p-5 text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📚</div>
                <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Total FAQs</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faqs.length}</p>
              </div>
            </div>
            <div className="group relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-px rounded-xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
              <div className="relative p-5 text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🏷️</div>
                <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Categories</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{categories.length - 1}</p>
              </div>
            </div>
            <div className="group relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-px rounded-xl backdrop-blur-sm" style={{ background: gradients.cardPremium }} />
              <div className="relative p-5 text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📅</div>
                <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-red-400' : 'text-purple-600'}`}>Last Updated</p>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center py-8 px-4">
        <div className="inline-flex items-center gap-2 text-xs">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
          <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>❓ Can't find your question? Visit our Contact page for personalized assistance</span>
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

export default FAQ;

// import { useNavigate } from "react-router-dom";

// const Layout = ({ children }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex min-h-screen bg-gray-100">
      
//       {/* Sidebar */}
//       <div className="w-64 bg-black text-white p-5 space-y-4">
//         <h1 className="text-2xl font-bold">KubeFit</h1>

//         <p onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-gray-300">Dashboard</p>
//         <p onClick={() => navigate("/members")} className="cursor-pointer hover:text-gray-300">Members</p>
//         <p onClick={() => navigate("/packages")} className="cursor-pointer hover:text-gray-300">Packages</p>
//         <p onClick={() => navigate("/subscriptions")} className="cursor-pointer hover:text-gray-300">Subscriptions</p>
//         <p onClick={() => navigate("/subscriptions-list")} className="cursor-pointer hover:text-gray-300">Subscriptions List</p>
//         <p onClick={() => navigate("/alerts")} className="cursor-pointer hover:text-gray-300">Alerts</p>
//       </div>

//       {/* Main */}
//       <div className="flex-1 p-6">
//         <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">Admin Dashboard</h2>
//           <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//         </div>

//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;




import { useNavigate, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Members", path: "/members", icon: "👥" },
    { name: "Packages", path: "/packages", icon: "📦" },
    { name: "Subscriptions", path: "/subscriptions", icon: "🧾" },
    { name: "Subscriptions List", path: "/subscriptions-list", icon: "📋" },
    { name: "Alerts", path: "/alerts", icon: "🚨" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-black to-gray-900 text-white p-6 flex flex-col">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-8 tracking-wide">
          KubeFit
        </h1>

        {/* Menu */}
        <div className="space-y-2 flex-1">
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
                  ${
                    active
                      ? "bg-white text-black font-semibold shadow"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 mt-6">
          © 2026 KubeFit
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow flex justify-between items-center mb-6 border">
          
          <h2 className="text-xl font-semibold text-gray-700">
            Admin Dashboard
          </h2>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="animate-fadeIn">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
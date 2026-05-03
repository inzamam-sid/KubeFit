// const Layout = ({ children }) => {
//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
      
//       {/* Sidebar */}
//       <div
//         style={{
//           width: "220px",
//           background: "#111",
//           color: "#fff",
//           padding: "20px",
//         }}
//       >
//         <h2>KubeFit</h2>
//         <p>Dashboard</p>
//         {/* <p>Members</p> */}
//         <p onClick={() => (window.location.href = "/members")}>Members</p>
//         <p>Packages</p>
//         <p onClick={() => (window.location.href = "/subscriptions")}>
//           Subscriptions
//         </p>
//         <p onClick={() => (window.location.href = "/subscriptions-list")}>
//           Subscriptions List
//         </p>
//         <p onClick={() => (window.location.href = "/alerts")}>
//           Alerts
//         </p>
//       </div>

//       {/* Main Content */}
//       <div style={{ flex: 1, background: "#f5f6fa" }}>
        
//         {/* Topbar */}
//         <div
//           style={{
//             padding: "15px",
//             background: "#fff",
//             borderBottom: "1px solid #ddd",
//           }}
//         >
//           <h3>Admin Dashboard</h3>
//         </div>
//         <button
//             onClick={() => {
//                 localStorage.removeItem("token");
//                 window.location.href = "/";
//             }}
//             >
//             Logout
//         </button>

//         {/* Page Content */}
//         <div style={{ padding: "20px" }}>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Layout;






import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5 space-y-4">
        <h1 className="text-2xl font-bold">KubeFit</h1>

        <p onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-gray-300">Dashboard</p>
        <p onClick={() => navigate("/members")} className="cursor-pointer hover:text-gray-300">Members</p>
        <p onClick={() => navigate("/packages")} className="cursor-pointer hover:text-gray-300">Packages</p>
        <p onClick={() => navigate("/subscriptions")} className="cursor-pointer hover:text-gray-300">Subscriptions</p>
        <p onClick={() => navigate("/subscriptions-list")} className="cursor-pointer hover:text-gray-300">Subscriptions List</p>
        <p onClick={() => navigate("/alerts")} className="cursor-pointer hover:text-gray-300">Alerts</p>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
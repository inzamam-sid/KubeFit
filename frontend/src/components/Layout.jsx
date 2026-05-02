const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>KubeFit</h2>
        <p>Dashboard</p>
        {/* <p>Members</p> */}
        <p onClick={() => (window.location.href = "/members")}>Members</p>
        <p>Packages</p>
        <p>Subscriptions</p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f5f6fa" }}>
        
        {/* Topbar */}
        <div
          style={{
            padding: "15px",
            background: "#fff",
            borderBottom: "1px solid #ddd",
          }}
        >
          <h3>Admin Dashboard</h3>
        </div>
        <button
            onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
            }}
            >
            Logout
        </button>

        {/* Page Content */}
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Packages from "./pages/Packages";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionList from "./pages/SubscriptionList";
import Alerts from "./pages/Alerts";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/subscriptions-list" element={<SubscriptionList />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
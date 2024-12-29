import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";
import CompanyOverview from "./pages/CompanyOverview";
import ManageCompany from "./pages/ManageCompany";
import ManageCommunicationMethods from "./pages/ManageCommunicationMethods";
import UserDashboard from "./pages/UserDashboard";
import NotificationsPage from "./pages/NotificationsPage";
import CalendarView from "./pages/CalendarView";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white text-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold">Welcome to the Communication Tracker</h1>
                <p className="text-xl">Choose an option to get started</p>
                <div className="flex justify-center gap-6">
                  <Link
                    to="/admin/overview"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-xl transition duration-200"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    to="/user/userdashboard"
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-xl transition duration-200"
                  >
                    User Dashboard
                  </Link>
                </div>
              </div>
            </div>
          }
          
        />

        {/* Admin Module */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="overview" element={<CompanyOverview />} />
          <Route path="manage-company" element={<ManageCompany />} />
          <Route path="manage-communication" element={<ManageCommunicationMethods />} />
        </Route>

        {/* User Module */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="userdashboard" element={<UserDashboard />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="calendar-view" element={<CalendarView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-1/4 bg-gray-800 text-white p-6">
        <ul className="space-y-6">
          <li>
            <Link to="/user/userdashboard" className="block px-4 py-2 text-lg hover:bg-gray-700 rounded">
              User Dashboard
            </Link>
          </li>
          <li>
            <Link to="/user/notifications" className="block px-4 py-2 text-lg hover:bg-gray-700 rounded">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/user/calendar-view" className="block px-4 py-2 text-lg hover:bg-gray-700 rounded">
              Calendar View
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

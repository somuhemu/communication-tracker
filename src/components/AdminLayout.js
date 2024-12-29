import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-1/4 bg-gray-800 text-white p-6">
        <ul className="space-y-6">
          <li>
            <Link
              to="/admin/overview"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              Company Overview
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-company"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              Manage Company
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-communication"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              Manage Communication Methods
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

export default AdminLayout;

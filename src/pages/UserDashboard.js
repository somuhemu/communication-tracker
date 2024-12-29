import React, { useState } from "react";
import { useCompanyContext } from "../context/CompanyContext";

const UserDashboard = () => {
  const { state, logCommunication, editSchedule } = useCompanyContext();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [logData, setLogData] = useState({ type: "", date: "", notes: "" });
  const [editData, setEditData] = useState({ id: "", date: "" });
  const [hoveredNote, setHoveredNote] = useState(null);

  const categorizedCompanies = state.companies.map((company) => {
    const nextCommunication = new Date(company.nextCommunication.date);
    const today = new Date();

    // Extracting local date strings in "YYYY-MM-DD" format
    const nextCommunicationDate = nextCommunication.toISOString().split("T")[0];
    const todayDate = today.toISOString().split("T")[0];

    if (nextCommunicationDate < todayDate) {
      return { ...company, status: "Overdue" };
    } else if (nextCommunicationDate === todayDate) {
      return { ...company, status: "Today" };
    } else {
      return { ...company, status: "Upcoming" };
    }
  });

  // Handle Log Communication
  const handleLogSubmit = () => {
    logCommunication(selectedCompany.id, logData);
    setShowLogModal(false);
  };

  // Handle Edit Schedule
  const handleEditSubmit = () => {
    editSchedule(selectedCompany.id, { methodId: editData.id, newDate: editData.date });
    setShowEditModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="p-2 text-left border border-gray-300">Company Name</th>
            <th className="p-2 text-left border border-gray-300">Last 5 Communications</th>
            <th className="p-2 text-left border border-gray-300">Next Scheduled Communication</th>
            <th className="p-2 text-center border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {categorizedCompanies.map((company) => (
            <tr key={company.id} className="border-b border-gray-300">
              <td className="p-2 border border-gray-300">{company.name}</td>
              <td className="p-2 border border-gray-300">
                {company.lastCommunications.slice(0, 5).map((comm, index) => (
                  <div
                    key={index}
                    className="relative "
                    onMouseEnter={() => setHoveredNote(comm.notes)} // Show notes on hover
                    onMouseLeave={() => setHoveredNote(null)} // Hide notes when mouse leaves
                  >
                    <div className="p-1 bg-gray-200 rounded mb-1 cursor-pointer">
                      {comm.type}: {comm.date}
                    </div>
                  </div>
                ))}
              </td>
              <td className="p-2 border border-gray-300">
                {company.nextCommunication.type}: {company.nextCommunication.date}
                <div className="mt-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowLogModal(true);
                    }}
                  >
                    Log Communication
                  </button>
                  {/* <button   REMOVED FOR NOW-fix need
                    className="px-2 py-1 bg-gray-500 text-white rounded"
                    onClick={() => {
                      setSelectedCompany(company);
                      setEditData({ id: company.nextCommunication.id, date: "" });
                      setShowEditModal(true);
                    }}
                  >
                    Edit Schedule
                  </button> */}
                </div>
              </td>
              <td
                className={`p-2 text-center border border-gray-300 ${
                  company.status === "Overdue"
                    ? "bg-red-200"
                    : company.status === "Today"
                    ? "bg-blue-200"
                    : "bg-green-200"
                }`}
              >
                {company.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tooltip/Message Box below the table */}
      {hoveredNote && (
  <div className="relative top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-gray-800 text-white text-sm p-3 rounded-md shadow-xl max-w-xs">
    {hoveredNote}
  </div>
)}


      {/* Log Communication Modal */}
      {showLogModal && (
        <div className="modal">
          <h3>Log Communication</h3>
          <input
            type="text"
            placeholder="Type"
            value={logData.type}
            onChange={(e) => setLogData({ ...logData, type: e.target.value })}
          />
          <input
            type="date"
            value={logData.date}
            onChange={(e) => setLogData({ ...logData, date: e.target.value })}
          />
          <textarea
            placeholder="Notes"
            value={logData.notes}
            onChange={(e) => setLogData({ ...logData, notes: e.target.value })}
          />
          <button onClick={handleLogSubmit}>Submit</button>
          <button onClick={() => setShowLogModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

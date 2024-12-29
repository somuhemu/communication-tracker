import React from "react";
import { useCompanyContext } from "../context/CompanyContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CompanyOverview = () => {
  const { state, deleteCompany, setSelectedCompany } = useCompanyContext(); // Extract necessary actions
  const navigate = useNavigate(); // Initialize navigate

  const handleEdit = (company) => {
    setSelectedCompany(company); // Set the selected company in context
    navigate("/admin/manage-company"); // Navigate to the ManageCompany page
  };
  

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(id); // Call the delete action from context
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="p-2 text-left border border-gray-300">Name</th>
            <th className="p-2 text-left border border-gray-300">Location</th>
            <th className="p-2 text-left border border-gray-300">Communication Periodicity</th>
            <th className="p-2 text-center border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.companies.map((company) => (
            <tr key={company.id} className="border-b border-gray-300">
              <td className="p-2 border border-gray-300">{company.name}</td>
              <td className="p-2 border border-gray-300">{company.location}</td>
              <td className="p-2 border border-gray-300">
                Every {company.communicationPeriodicity.value} {company.communicationPeriodicity.unit}
              </td>
              <td className="p-2 text-center border border-gray-300">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  onClick={() => handleEdit(company)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(company.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyOverview;

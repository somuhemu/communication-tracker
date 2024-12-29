import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyContext } from "../context/CompanyContext";

const ManageCompany = () => {
  const { state, addCompany, updateCompany, setSelectedCompany } = useCompanyContext();
  const navigate = useNavigate();
  
  // Local state for form fields
  const [companyData, setCompanyData] = useState({
    name: "",
    location: "",
    communicationPeriodicity: { value: 2, unit: "weeks" }, // Default periodicity
  });

  useEffect(() => {
    if (state.selectedCompany) {
      // If editing, pre-fill the form with selected company data
      setCompanyData({
        name: state.selectedCompany.name,
        location: state.selectedCompany.location,
        communicationPeriodicity: state.selectedCompany.communicationPeriodicity,
      });
    }
  }, [state.selectedCompany]); // Run on selectedCompany change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.selectedCompany) {
      // Edit Mode: Update the selected company
      updateCompany({
        ...state.selectedCompany,
        ...companyData, // Combine old data with updated
      });
    } else {
      // Add Mode: Add a new company
      addCompany({
        ...companyData,
        id: Date.now(), // Use timestamp as unique ID (or could be UUID)
      });
    }

    // Clear selected company and redirect back to overview
    setSelectedCompany(null); 
    navigate("/admin/overview"); // Go back to the company overview after submit
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        {state.selectedCompany ? "Edit Company" : "Add New Company"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={companyData.location}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Communication Periodicity</label>
          <div className="flex">
            <input
              type="number"
              name="communicationPeriodicityValue"
              value={companyData.communicationPeriodicity.value}
              onChange={(e) =>
                setCompanyData((prevData) => ({
                  ...prevData,
                  communicationPeriodicity: {
                    ...prevData.communicationPeriodicity,
                    value: e.target.value,
                  },
                }))
              }
              className="w-1/2 p-2 border border-gray-300 rounded"
              required
            />
            <select
              name="communicationPeriodicityUnit"
              value={companyData.communicationPeriodicity.unit}
              onChange={(e) =>
                setCompanyData((prevData) => ({
                  ...prevData,
                  communicationPeriodicity: {
                    ...prevData.communicationPeriodicity,
                    unit: e.target.value,
                  },
                }))
              }
              className="w-1/2 p-2 border border-gray-300 rounded ml-2"
              required
            >
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="days">Days</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {state.selectedCompany ? "Update Company" : "Add Company"}
        </button>
      </form>
    </div>
  );
};

export default ManageCompany;

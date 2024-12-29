import React, { useState, useEffect } from "react";
import { useCompanyContext } from "../context/CompanyContext";

const ManageCommunicationMethods = () => {
  const { state, setSelectedCompany, addCommunicationMethod, updateCommunicationMethod,updateCommunicationMethodsForCompany, deleteCommunicationMethod } = useCompanyContext();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });

  const selectedCompany = state.selectedCompany || state.companies[0]; // Default to first company if no selection

  // Load communication methods for the selected company
  useEffect(() => {
    if (selectedCompany) {
      setFormData({
        id: "",
        name: "",
        description: "",
        sequence: "",
        mandatory: false,
      });
    }
  }, [selectedCompany]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateCommunicationMethod(selectedCompany.id, formData); // Update method for selected company
    } else {
      addCommunicationMethod(selectedCompany.id, { ...formData, id: Date.now() }); // Add new method to selected company
    }
  };

  const handleEdit = (method) => {
    setFormData(method);
  };

  const handleDelete = (methodId) => {
    if (window.confirm("Are you sure you want to delete this communication method?")) {
      // Step 1: Delete the communication method from the context
      deleteCommunicationMethod(selectedCompany.id, methodId);
  
      // Step 2: Reorder the sequence numbers for the remaining communication methods
      const updatedMethods = selectedCompany.communicationMethods
        .filter((method) => method.id !== methodId) // Remove the deleted method
        .map((method, index) => ({
          ...method,
          sequence: index + 1, // Reassign sequence numbers starting from 1
        }));
  
      // Step 3: Update the communication methods for the specific company
      updateCommunicationMethodsForCompany(selectedCompany.id, updatedMethods);
    }
  };
  

  return (
    <div className="flex">
      {/* Sidebar with Company List */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h3 className="font-semibold text-lg mb-4">Companies</h3>
        <ul>
          {state.companies.map((company) => (
            <li
              key={company.id}
              className="mb-2 cursor-pointer text-blue-500"
              onClick={() => setSelectedCompany(company)}
            >
              {company.name}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Communication Methods Management */}
      <div className="w-3/4 p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Communication Methods for {selectedCompany.name}</h2>

        {/* Add/Edit Communication Method Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sequence</label>
            <input
              type="number"
              name="sequence"
              value={formData.sequence}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mandatory</label>
            <input
              type="checkbox"
              name="mandatory"
              checked={formData.mandatory}
              onChange={handleChange}
              className="mr-2"
            />
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {formData.id ? "Update" : "Add New"} Communication Method
          </button>
        </form>

        {/* Communication Methods Table */}
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-2 text-left border border-gray-300">Name</th>
              <th className="p-2 text-left border border-gray-300">Description</th>
              <th className="p-2 text-left border border-gray-300">Sequence</th>
              <th className="p-2 text-left border border-gray-300">Mandatory</th>
              <th className="p-2 text-center border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedCompany.communicationMethods.map((method) => (
              <tr key={method.id} className="border-b border-gray-300">
                <td className="p-2 border border-gray-300">{method.name}</td>
                <td className="p-2 border border-gray-300">{method.description}</td>
                <td className="p-2 border border-gray-300">{method.sequence}</td>
                <td className="p-2 border border-gray-300">{method.mandatory ? "Yes" : "No"}</td>
                <td className="p-2 text-center border border-gray-300">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                    onClick={() => handleEdit(method)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(method.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCommunicationMethods;

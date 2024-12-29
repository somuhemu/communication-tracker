import React, { createContext, useContext, useReducer } from "react";
import { companies as initialCompanies } from "../data/mockData";

// Create Context
const CompanyContext = createContext();

// Reducer Function to Handle Actions
const companyReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMPANY":
      return { ...state, companies: [...state.companies, action.payload] };

    case "UPDATE_COMPANY":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.id ? action.payload : company
        ),
      };

    case "DELETE_COMPANY":
      return {
        ...state,
        companies: state.companies.filter((company) => company.id !== action.payload),
      };

    case "SET_SELECTED_COMPANY":
      return {
        ...state,
        selectedCompany: action.payload, // Can be a company object or null to clear
      };

    case "ADD_COMMUNICATION_METHOD":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.companyId
            ? {
                ...company,
                communicationMethods: [
                  ...company.communicationMethods,
                  action.payload.method,
                ],
              }
            : company
        ),
      };
  
    case "UPDATE_COMMUNICATION_METHOD":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.companyId
            ? {
                ...company,
                communicationMethods: company.communicationMethods.map((method) =>
                  method.id === action.payload.method.id ? action.payload.method : method
                ),
              }
            : company
        ),
      };

    case "UPDATE_COMMUNICATION_METHODS_FOR_COMPANY":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.companyId
            ? {
                ...company,
                communicationMethods: action.payload.methods, // Update the communication methods
              }
            : company
        ),
      };
      
    case "DELETE_COMMUNICATION_METHOD":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.companyId
            ? {
                ...company,
                communicationMethods: company.communicationMethods.filter(
                  (method) => method.id !== action.payload.methodId
                ),
              }
            : company
        ),
      };
      
    case "LOG_COMMUNICATION":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.companyId
            ? {
                ...company,
                lastCommunications: [
                  action.payload.log,
                  ...company.lastCommunications,
                ].slice(0, 5), // Keep only the last 5 logs
                nextCommunication: action.payload.nextCommunication, // Update next communication
              }
            : company
        ),
      };
      

    case "EDIT_SCHEDULE":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.companyId
            ? {
                ...company,
                communicationMethods: company.communicationMethods.map((method, index) =>
                  method.id === action.payload.methodId
                    ? { ...method, date: action.payload.newDate }
                    : index > action.payload.index
                    ? {
                        ...method,
                        date: new Date(
                          new Date(action.payload.newDate).getTime() + company.nextCommunication.periodicity * (index - action.payload.index) * 86400000
                        ).toISOString().split("T")[0], // Update subsequent communication dates
                      }
                    : method
                ),
              }
            : company
        ),
      };
      
    default:
      return state;
  }
};

// Provider Component
export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, {
    companies: initialCompanies, // Initial Mock Data
    selectedCompany: null, // Initially no company selected
  });

  // Helper Functions for Dispatching Actions
  const addCompany = (company) => dispatch({ type: "ADD_COMPANY", payload: company });
  const updateCompany = (company) => dispatch({ type: "UPDATE_COMPANY", payload: company });
  const deleteCompany = (id) => dispatch({ type: "DELETE_COMPANY", payload: id });
  const setSelectedCompany = (company) =>
    dispatch({ type: "SET_SELECTED_COMPANY", payload: company });

  const addCommunicationMethod = (companyId, method) =>
    dispatch({
      type: "ADD_COMMUNICATION_METHOD",
      payload: { companyId, method },
    });

  const updateCommunicationMethod = (companyId, method) =>
    dispatch({
      type: "UPDATE_COMMUNICATION_METHOD",
      payload: { companyId, method },
    });

  const updateCommunicationMethodsForCompany = (companyId, methods) => {
      dispatch({
        type: "UPDATE_COMMUNICATION_METHODS_FOR_COMPANY",
        payload: { companyId, methods },
      });
    };
    
  const deleteCommunicationMethod = (companyId, methodId) =>
    dispatch({
      type: "DELETE_COMMUNICATION_METHOD",
      payload: { companyId, methodId },
    });

    const logCommunication = (companyId, log) => {
      const company = state.companies.find((company) => company.id === companyId);
    
      if (!company) return;
    
      // Find the current next communication method
      const currentMethodIndex = company.communicationMethods.findIndex(
        (method) => method.name === company.nextCommunication.type
      );
    
      // Calculate the next communication method
      const nextMethodIndex = (currentMethodIndex + 1) % company.communicationMethods.length;
      const nextMethod = company.communicationMethods[nextMethodIndex];
    
      // Calculate the new date for the next communication
      const nextDate = new Date(log.date);
      nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);
    
      dispatch({
        type: "LOG_COMMUNICATION",
        payload: {
          companyId,
          log: { type: log.type, date: log.date, notes: log.notes },
          nextCommunication: {
            type: nextMethod.name,
            date: nextDate.toISOString().split("T")[0],
          },
        },
      });
    };
    

  const editSchedule = (companyId, { methodId, newDate }) => {
    const company = state.companies.find((company) => company.id === companyId);
    const index = company.communicationMethods.findIndex((method) => method.id === methodId);

    dispatch({
      type: "EDIT_SCHEDULE",
      payload: {
        companyId,
        methodId,
        newDate,
        index,
      },
    });
  };

  return (
    <CompanyContext.Provider
      value={{
        state,
        addCompany,
        updateCompany,
        deleteCompany,
        setSelectedCompany,
        addCommunicationMethod,
        updateCommunicationMethod,
        updateCommunicationMethodsForCompany,
        deleteCommunicationMethod,
        logCommunication, editSchedule
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

// Custom Hook to Use the Context
export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};





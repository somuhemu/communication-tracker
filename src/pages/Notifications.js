import React from "react";
import { Link } from "react-router-dom";
import { useCompanyContext } from "../context/CompanyContext";



const getNotifications = (state) => {
  const today = new Date().toISOString().split("T")[0];

  const overdue = state.companies.filter(
    (company) => new Date(company.nextCommunication.date) < new Date(today)
  );

  const todayTasks = state.companies.filter(
    (company) => company.nextCommunication.date === today
  );

  return { overdue, todayTasks };
};


const Notifications = () => {
  const { state } = useCompanyContext();
  const { overdue, todayTasks } = getNotifications(state);

  return (
    <div style={{ padding: "1rem", background: "#f9f9f9", borderBottom: "1px solid #ddd" }}>
      <Link to="/user/notifications">
        <span style={{ marginRight: "1rem" }}>🔔</span>
        <span>Notifications</span>
        <span style={{ background: "red", color: "white", padding: "0.2rem 0.5rem", borderRadius: "50%", marginLeft: "0.5rem" }}>
          {overdue.length + todayTasks.length}
        </span>
      </Link>
    </div>
  );
};

export default Notifications;

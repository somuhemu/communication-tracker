import React from "react";
import { useCompanyContext } from "../context/CompanyContext";

const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };
  
  const getNotifications = (state) => {
    // Get today's date in YYYY-MM-DD format using local time
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  
    const overdue = state.companies.filter(
      (company) => formatDate(company.nextCommunication.date) < todayFormatted
    );
  
    const todayTasks = state.companies.filter(
      (company) => formatDate(company.nextCommunication.date) === todayFormatted
    );
  
    return { overdue, todayTasks };
  };
  

const NotificationsPage = () => {
  const { state } = useCompanyContext();

  if (!state.companies || !Array.isArray(state.companies)) {
    return <p>Error: Invalid company data</p>;
  }

  const { overdue, todayTasks } = getNotifications(state);
  const totalNotifications = overdue.length + todayTasks.length;

  return (
    <div style={{ padding: "1rem" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2>Notifications</h2>
        {/* Notification Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f44336",
            color: "#fff",
            borderRadius: "50%",
            width: "2.5rem",
            height: "2.5rem",
            justifyContent: "center",
            fontSize: "1.2rem",
          }}
        >
          {totalNotifications}
        </div>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Overdue Communications</h3>
        {overdue.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <th style={{ padding: "0.5rem", textAlign: "left" }}>Company</th>
                <th style={{ padding: "0.5rem", textAlign: "left" }}>Next Communication</th>
              </tr>
            </thead>
            <tbody>
              {overdue.map((company) => (
                <tr key={company.id}>
                  <td style={{ padding: "0.5rem" }}>{company.name}</td>
                  <td style={{ padding: "0.5rem" }}>{company.nextCommunication.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No overdue communications.</p>
        )}
      </section>

      <section>
        <h3>Today’s Communications</h3>
        {todayTasks.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <th style={{ padding: "0.5rem", textAlign: "left" }}>Company</th>
                <th style={{ padding: "0.5rem", textAlign: "left" }}>Next Communication</th>
              </tr>
            </thead>
            <tbody>
              {todayTasks.map((company) => (
                <tr key={company.id}>
                  <td style={{ padding: "0.5rem" }}>{company.name}</td>
                  <td style={{ padding: "0.5rem" }}>{company.nextCommunication.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No communications scheduled for today.</p>
        )}
      </section>
    </div>
  );
};

export default NotificationsPage;

import React, { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // For interactions like clicking
import { useCompanyContext } from "../context/CompanyContext";

const CalendarView = () => {
  const { state } = useCompanyContext();

  // Helper function to calculate the status dynamically
  const getStatus = (nextCommunicationDate) => {
    const today = new Date();
    const nextCommunication = new Date(nextCommunicationDate);

    const todayDate = today.toISOString().split("T")[0];
    const nextCommunicationDateString = nextCommunication.toISOString().split("T")[0];

    if (nextCommunicationDateString < todayDate) {
      return "Overdue";
    } else if (nextCommunicationDateString === todayDate) {
      return "Today";
    } else {
      return "Upcoming";
    }
  };

  // Helper function to determine event color based on status
  const getEventClass = (status) => {
    return status === "Overdue"
      ? "bg-red-500"
      : status === "Today"
      ? "bg-blue-500"
      : "bg-green-500";
  };

  // Create events for FullCalendar
  const events = state.companies.flatMap((company) => {
    const status = getStatus(company.nextCommunication.date);

    return [
      // Past communications
      ...company.lastCommunications.map((comm) => ({
        title: `${company.name}: ${comm.type}`,
        start: comm.date,
        extendedProps: {
          company: company.name,
          type: comm.type,
          notes: comm.notes,
          status: "Past",
        },
        color: "gray", // Static color for past events
      })),
      // Next scheduled communication
      {
        title: `${company.name}: ${company.nextCommunication.type}`,
        start: company.nextCommunication.date,
        extendedProps: {
          company: company.name,
          type: company.nextCommunication.type,
          description: company.communicationMethods.find(
            (method) => method.name === company.nextCommunication.type
          )?.description,
          status: status,
        },
        className: getEventClass(status), // Tailwind class
      },
    ];
  });

  return (
    <div className="calendar-view">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClassNames={(arg) => arg.event.extendedProps.status}
        height="80vh"
        eventClick={(info) => {
          alert(`Event: ${info.event.title}\nDetails: ${info.event.extendedProps.notes || "N/A"}`);
        }}
      />
    </div>
  );
};

export default CalendarView;

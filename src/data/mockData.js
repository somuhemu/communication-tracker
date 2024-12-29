// src/data/mockData.js

export const companies = [
    {
      id: "c1",
      name: "TechCorp",
      location: "New York, USA",
      linkedInProfile: "https://www.linkedin.com/company/techcorp",
      emails: ["contact@techcorp.com"],
      phoneNumbers: ["+1 555-1234"],
      comments: "Focus on AI and Cloud services.",
      communicationPeriodicity: 2, // in days
      lastCommunications: [
        { type: "LinkedIn Post", date: "2024-12-23", notes: "Shared proposal for Q1 project." },
        { type: "LinkedIn Message", date: "2024-12-25", notes: "Followed up on project requirements." },
      ],
      nextCommunication: { type: "Email", date: "2024-12-27" },
      communicationMethods: [
        {
          id: "cm1",
          name: "LinkedIn Post",
          description: "Share a post mentioning the company.",
          sequence: 1,
          mandatory: false,
        },
        {
          id: "cm2",
          name: "LinkedIn Message",
          description: "Send a personalized message via LinkedIn.",
          sequence: 2,
          mandatory: false,
        },
        {
          id: "cm3",
          name: "Email",
          description: "Send an email to the company's contact address.",
          sequence: 3,
          mandatory: false,
        },
        {
          id: "cm4",
          name: "Phone",
          description: "Call me via phone",
          sequence: 4,
          mandatory: false,
        },
      ],
    },
    {
      id: "c2",
      name: "HealthPlus",
      location: "London, UK",
      linkedInProfile: "https://www.linkedin.com/company/healthplus",
      emails: ["info@healthplus.co.uk", "support@healthplus.co.uk"],
      phoneNumbers: ["+44 20 7946 0958"],
      comments: "Specializes in healthcare software solutions.",
      communicationPeriodicity: 2, // in days
      lastCommunications: [
        { type: "Email", date: "2024-12-27", notes: "Demoed the latest application." },
      ],
      nextCommunication: { type: "Phone Call", date: "2024-12-29" },
      communicationMethods: [
        {
          id: "cm3",
          name: "Email",
          description: "Send an email to the company's contact address.",
          sequence: 1,
          mandatory: true,
        },
        {
          id: "cm4",
          name: "Phone Call",
          description: "Call the company's representative.",
          sequence: 2,
          mandatory: false,
        },
        {
          id: "cm5",
          name: "Visit",
          description: "Visit the company's premises for a meeting.",
          sequence: 3,
          mandatory: false,
        },
      ],
    },
  ];
  
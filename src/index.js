// src/index.js or src/App.js
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { CompanyProvider } from "./context/CompanyContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <CompanyProvider>
      <App />
    </CompanyProvider>
  // </React.StrictMode>
);


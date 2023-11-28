import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { WeatherProvider } from "./contexts/WeatherContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
);

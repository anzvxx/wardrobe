import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WardrobeProvider } from "./context/WardrobeContext";

// Initialize Tempo Devtools
try {
  if (import.meta.env.VITE_TEMPO === "true") {
    const { TempoDevtools } = await import("tempo-devtools");
    TempoDevtools.init();
  }
} catch (err) {
  console.error("Failed to initialize Tempo Devtools:", err);
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <WardrobeProvider>
        <App />
      </WardrobeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

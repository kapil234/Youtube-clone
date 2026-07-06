import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { VideoProvider } from "./context/VideoContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <VideoProvider>
        <Toaster />
        <App />
      </VideoProvider>
    </BrowserRouter>
 
);
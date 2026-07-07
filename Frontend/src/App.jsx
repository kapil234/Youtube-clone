import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  return (
    <>
      <Header
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <Sidebar open={sidebarOpen} />

      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen
            ? "md:ml-60"
            : "md:ml-20"
        }`}
      >
        <AppRoutes />
      </main>
    </>
  );
}

export default App;

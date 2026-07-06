import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar open={sidebarOpen} />

      <Routes>
        <Route
          path="/"
          element={<Home sidebarOpen={sidebarOpen} />}
        />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar open={sidebarOpen} />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home sidebarOpen={sidebarOpen} />}
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Route Example */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <div className="pt-20 ml-20 text-3xl">
                Upload Page
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

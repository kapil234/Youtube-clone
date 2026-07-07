import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadVideo from "./pages/UploadVideo";
import VideoPlayer from "./pages/VideoPlayer";
import CreateChannel from "./pages/CreateChannel";
import MyChannel from "./pages/MyChannel";
import Channel from "./pages/Channel";
import EditChannel from "./pages/EditChannel";
import EditVideo from "./pages/EditVideo";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
     <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

  <Sidebar open={sidebarOpen} />

  <main
    className={`pt-16 transition-all duration-300 ${
      sidebarOpen ? "md:ml-60" : "md:ml-20"
    }`}
  >
    <Routes>
      <Route
        path="/"
        element={<Home sidebarOpen={sidebarOpen} />}
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadVideo />
          </ProtectedRoute>
        }
      />

      <Route path="/video/:id" element={<VideoPlayer />} />

      <Route path="/edit-video/:id" element={<EditVideo />} />

      <Route
        path="/create-channel"
        element={
          <ProtectedRoute>
            <CreateChannel />
          </ProtectedRoute>
        }
      />

      <Route path="/edit-channel" element={<EditChannel />} />

      <Route
        path="/my-channel"
        element={
          <ProtectedRoute>
            <MyChannel />
          </ProtectedRoute>
        }
      />

      <Route path="/channel/:id" element={<Channel />} />
    </Routes>
  </main>
</>
  );
}

export default App;

import { useState, useEffect } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  return (
    <>
      <Header
        toggleSidebar={() =>
          setSidebarOpen((prev) => !prev)
        }
      />

      <Sidebar
        open={sidebarOpen}
        closeSidebar={() =>
          setSidebarOpen(false)
        }
      />

      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "md:ml-60" : "md:ml-20"
        }`}
      >
        <AppRoutes />
      </main>
    </>
  );
}

export default App;

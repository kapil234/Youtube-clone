import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { VideoProvider } from "./context/VideoContext";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>

    <AuthProvider>

      <VideoProvider>

        <Toaster position="top-right"/>

        <App/>

      </VideoProvider>

    </AuthProvider>

  </BrowserRouter>

);
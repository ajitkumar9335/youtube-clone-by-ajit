import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import VideoPlayer from "./pages/VideoPlayer.jsx";
import Auth from "./pages/Auth.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";



import { AuthProvider } from "./context/AuthContext.jsx";   // ✅ IMPORT THIS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>    {/* ✅ WRAP EVERYTHING */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="watch/:id" element={<VideoPlayer />} />
          <Route path="auth" element={<Auth />} />
          <Route path="channel/:id" element={<ChannelPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/channel/:id" element={<ChannelPage />} />



        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

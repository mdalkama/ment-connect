import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Mentors from "./components/Mentors/Mentors";
import Mentees from "./components/Mentees/Mentees";
import LoginPage from "./components/LoginPage/LoginPage";
import Message from "./components/Message/Message";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="bg-[#ffffff] text-[#131417]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentees" element={<Mentees />} />
          <Route path="/message" element={<Message />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
      
      {/* Add ToastContainer here to enable notifications globally */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;

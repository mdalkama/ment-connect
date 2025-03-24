import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Mentors from "./components/Mentors/Mentors";
import Mentees from "./components/Mentees/Mentees";
import Contact from "./components/Contact/Contact";
import LoginPage from "./components/LoginPage/LoginPage";
import Message from "./components/Message/Message";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";

function App() {
  const [user, setUser] = useState(null);

  // Check if user is logged in (session check)
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/protected_route", { withCredentials: true })
      .then((res) => {
        console.log("User Data:", res.data);
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error("Not logged in:", err);
      });
  }, []);

  return (
    <div className="bg-[#ffffff] text-[#131417]">
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentees" element={<Mentees />} />
          <Route path="/message" element={<Message />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

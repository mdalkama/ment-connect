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
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/data")
      .then((response) => setData(response.data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="bg-[#ffffff] text-[#131417]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentees" element={<Mentees />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import LoginPage from "./components/LoginPage/LoginPage";
import Mission from "./components/Mission/Mission";
import Developer from "./components/Developer/Developer";
import Profile from "./components/Profile/Profile";
import Verify from "./components/Verify/Verify";
// import Footer from "./components/Footer/Footer";

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
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;

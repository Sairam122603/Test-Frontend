import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sign from "./components/sign";
import VALIDOTP from "./components/VALIDOTP";
import INVALIDOTP from "./components/INVALIDOTP";
import ResendOTP from "./components/ResendOTP";
import Lastpage from "./components/Lastpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/validotp" element={<VALIDOTP />} />
        <Route path="/resendotp" element={<ResendOTP />} />
        <Route path="/invalidotp" element={<INVALIDOTP />} />
        <Route path="/dashboard" element={<Lastpage />} />
      </Routes>
    </Router>
  );
}

export default App;

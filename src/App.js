import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Sign from "./components/sign";
import VALIDOTP from "./components/VALIDOTP";
import INVALIDOTP from "./components/INVALIDOTP";
import ResendOTP from "./components/ResendOTP";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/validotp" element={<VALIDOTP />} />
        <Route path="/invalidotp" element={<INVALIDOTP />} />
        <Route path="/resendotp" element={<ResendOTP />} />
      </Routes>
    </Router>
  );
}

export default App;

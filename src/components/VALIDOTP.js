import React, { useState } from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';

const VALIDOTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const email = localStorage.getItem("email");

    const handleValidateOTP = async () => {
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://test-backend-8z4m.onrender.com/validate-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                alert("OTP Verified Successfully!");
                navigate("/dashboard"); // Redirect to the dashboard or home page
            } else {
                alert("Invalid OTP. Please try again.");
                navigate("/invalidotp");
            }
        } catch (error) {
            alert("Error verifying OTP. Check your internet connection.");
        }
        setLoading(false);
    };

    return (
        <>
            <div className="header">
                <h2>Analytics Dashboard</h2>
            </div>
            <div className="login-container">
                <div className="container">
                    <div className="left-section">
                        <div className="card">
                            <h2 className='title'>Enter OTP sent to {email}</h2>
                            <input 
                                type="text" 
                                placeholder="Enter OTP" 
                                className="input-field" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button className="btn" onClick={handleValidateOTP} disabled={loading}>
                                {loading ? "Validating..." : "Validate OTP"}
                            </button>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="text-center">
                            <h2>Web Application with Analytics Dashboard</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <h6>© 2025, Greendzine Technologies Pvt. Ltd. All Rights Reserved.</h6>
            </div>
        </>
    );
};

export default VALIDOTP;

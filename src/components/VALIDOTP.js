import React, { useState } from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';

const VALIDOTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const email = localStorage.getItem("email");
console.log("Retrieved email for OTP validation:", email);


    const handleValidateOTP = async () => {
        if (!otp.trim()) {
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

            const data = await response.json(); // Parse JSON response

            if (response.ok) {
                alert("✅ OTP Verified Successfully!");
                navigate("/dashboard"); // Redirect to Dashboard
            } else {
                alert(data.message || "❌ Invalid OTP. Please try again.");
                navigate("/resendotp");
            }
        } catch (error) {
            alert("⚠️ Error verifying OTP. Please check your internet connection.");
        }
        setLoading(false);
    };

    return (
        <>
            {/* Header */}
            <div className="header">
                <h2>Analytics Dashboard</h2>
            </div>

            {/* OTP Input Section */}
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

                    {/* Dashboard Information */}
                    <div className="right-section">
                        <div className="text-center">
                            <h2>Web Application with Analytics Dashboard</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <h6>© 2025, Greendzine Technologies Pvt. Ltd. All Rights Reserved.</h6>
            </div>
        </>
    );
};

export default VALIDOTP;

import React, { useState } from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';

const Sign = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://test-backend-8z4m.onrender.com/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                localStorage.setItem("email", email);
                alert("OTP has been sent to your email.");
                navigate("/validotp");
            } else {
                alert("Failed to send OTP. Please try again.");
            }
        } catch (error) {
            alert("Error sending OTP. Check your internet connection.");
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
                            <h2 className='title'>Sign In</h2>
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                className="input-field" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="btn" onClick={handleSignIn} disabled={loading}>
                                {loading ? "Sending..." : "Send OTP"}
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

export default Sign;

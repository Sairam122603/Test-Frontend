import React from "react";
import "../styles/Signin.css";
import { useNavigate } from "react-router-dom";

const INVALIDOTP = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="header">
                <h2>Analytics Dashboard</h2>
            </div>
            <div className="login-container">
                <div className="container">
                    <div className="left-section">
                        <div className="card">
                            <h2 className="title">Invalid OTP</h2>
                            <p className="error-message">The OTP you entered is incorrect. Please try again.</p>
                            <button className="btn" onClick={() => navigate("/resendotp")}>
                                Resend OTP
                            </button>
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

export default INVALIDOTP;

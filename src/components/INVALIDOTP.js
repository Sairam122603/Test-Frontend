import React from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';

const INVALIDOTP = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('./resendotp')
    }


    return (
        <>
            <div className="header">
                <h2>Analytics Dashboard</h2>
            </div>
            <div className="login-container">
                <div className="container">
                    <div className="left-section">
                        <div className="card">
                            <h2 className='title'>Enter Otp sent to email</h2>
                            <input type="OTP" placeholder="OTP" className="input-field" />
                            <div class="resend-time-container">
                                <span class="resend-otp">resend otp</span>
                                <span class="timer">00:30</span>
                            </div>
                            <button className="btn" onClick={handleClick()}>Validate</button>
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

export default INVALIDOTP;

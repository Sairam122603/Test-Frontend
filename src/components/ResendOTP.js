import React from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';

const ResendOTP = () => {
    const navigate = useNavigate()
    const resendOTP = () => {
        console.log("...hitting")
        navigate('./validotp')
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
                                <span class="resend" onclick={resendOTP}>resend otp</span>
                                <span class="time">00:00</span>
                            </div>

                            <button className="btn">Validate</button>
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

export default ResendOTP;

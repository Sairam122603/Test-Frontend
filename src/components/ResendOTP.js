import React, { useState, useEffect } from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';

const ResendOTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isOtpInvalid, setIsOtpInvalid] = useState(false);
    
    useEffect(() => {
        let countdown;
        if (isResendDisabled) {
            countdown = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(countdown);
                        setIsResendDisabled(false);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [isResendDisabled]);

    const handleResendOTP = async () => {
        setIsResendDisabled(true);
        setTimer(30);
        try {
            const response = await fetch('/api/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'user@example.com' }) // Replace with actual user email
            });
            if (response.ok) {
                console.log("OTP resent successfully!");
            } else {
                console.error("Failed to resend OTP");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
        }
        setIsOtpInvalid(false);
    };

    const handleValidateOTP = () => {
        const correctOtp = "123456"; // Replace with actual OTP validation logic
        if (otp === correctOtp) {
            navigate('/dashboard');
        } else {
            setIsOtpInvalid(true);
            setIsResendDisabled(false);
        }
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
                            <h2 className='title'>Enter OTP sent to email</h2>
                            <input 
                                type="text" 
                                placeholder="OTP" 
                                className="input-field" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                            />
                            {isOtpInvalid && <p className="error">Invalid OTP, please try again.</p>}
                            <div className="resend-time-container">
                                <button 
                                    className="resend" 
                                    onClick={handleResendOTP} 
                                    disabled={isResendDisabled}
                                >
                                    Re-send OTP
                                </button>
                                <span className="time">{isResendDisabled ? `00:${timer < 10 ? `0${timer}` : timer}` : ""}</span>
                            </div>
                            <button className="btn" onClick={handleValidateOTP}>Validate</button>
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
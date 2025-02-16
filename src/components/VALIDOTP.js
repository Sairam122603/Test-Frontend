import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ValidOTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
            setMessage("⚠️ No email found. Please sign in again.");
        }
        setEmail(storedEmail);
    }, []);

    const handleVerifyOTP = async () => {
        if (!otp) {
            setMessage("⚠️ Please enter the OTP.");
            return;
        }

        if (!email) {
            setMessage("⚠️ Email not found. Try signing in again.");
            return;
        }

        setIsVerifying(true);
        setMessage('');

        try {
            console.log("🔹 Sending OTP verification request...");
            const response = await fetch('http://localhost:3000/api/validate-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });

            console.log("🔹 Response received:", response);
            const data = await response.json();

            if (response.ok) {
                console.log("✅ OTP verified successfully!", data);
                setMessage("✅ OTP verified successfully!");
                navigate('/dashboard'); // Redirect
            } else {
                console.log("❌ OTP verification failed:", data);
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("❌ OTP Verification Error:", error);
            setMessage("⚠️ Error verifying OTP. Please check your internet connection.");
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <>
            <div className="header">
                <h2>OTP Verification</h2>
            </div>
            <div className="otp-container">
                <div className="card">
                    <h2>Enter OTP sent to</h2>
                    <p>{email || "⚠️ Email not found!"}</p>
                    {message && <p className="message">{message}</p>}
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="input-field"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="btn" onClick={handleVerifyOTP} disabled={isVerifying}>
                        {isVerifying ? "Validating..." : "Validate OTP"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ValidOTP;

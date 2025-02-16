import React, { useState } from 'react';

const ResendOTP = () => {
    const [message, setMessage] = useState('');
    const [isResending, setIsResending] = useState(false);

    const email = localStorage.getItem("email");

    const handleResendOTP = async () => {
        if (!email) {
            setMessage("⚠️ No email found. Please sign in again.");
            return;
        }

        setIsResending(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log("🔄 Resend OTP Response:", data);

            if (response.ok) {
                setMessage("✅ OTP resent successfully! Check your email.");
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("❌ Resend OTP Error:", error);
            setMessage("⚠️ Error resending OTP. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <>
            <div className="header">
                <h2>Resend OTP</h2>
            </div>
            <div className="otp-container">
                <div className="card">
                    <h2>Resend OTP to</h2>
                    <p>{email}</p>
                    {message && <p className="message">{message}</p>}
                    <button className="btn" onClick={handleResendOTP} disabled={isResending}>
                        {isResending ? "Resending..." : "Resend OTP"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ResendOTP;

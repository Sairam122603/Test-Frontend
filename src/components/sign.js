import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signin.css';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSendOTP = async () => {
        if (!email) {
            setMessage("⚠️ Please enter your email.");
            return;
        }

        setIsSending(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log("📩 OTP response:", data);

            if (response.ok) {
                localStorage.setItem("email", email);
                setMessage("✅ OTP sent! Check your email.");
                navigate('/validotp');  // Navigate to OTP page
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("❌ Error sending OTP:", error);
            setMessage("⚠️ Error connecting to server.");
        } finally {
            setIsSending(false);
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
                            <h2 className='title'>Sign In</h2>
                            {message && <p className="message">{message}</p>}
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="input-field" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="btn" onClick={handleSendOTP} disabled={isSending}>
                                {isSending ? "Sending..." : "Send OTP"}
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

export default SignIn;

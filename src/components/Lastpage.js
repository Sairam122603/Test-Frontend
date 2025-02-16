import React from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';

const Lastpage = () => {
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
                            <h2 className='title'>🎉 Congratulations! 🎉</h2>
                            <p className="success-message">You have successfully signed in and verified your OTP.</p>
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

export default Lastpage;

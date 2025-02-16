import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Charts from './Charts';

function Dashboard() {
  const [showMessage, setShowMessage] = useState(true); // State to manage success message visibility

  useEffect(() => {
    // Hide message after 3 seconds
    const timer = setTimeout(() => setShowMessage(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        {/* Success Message */}
        {showMessage && (
          <div className="success-message">
            ✅ Successfully Logged into Your Account!
          </div>
        )}

        <div className="content-area">
          <Charts /> {/* Renders Charts */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

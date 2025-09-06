import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load subscriptions from API on mount
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/subscriptions');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch subscriptions');
      }
      
      console.log('✅ Subscriptions loaded:', data);
      
      // The API returns {success: true, data: [...], count: number}
      // Extract the actual array from the response
      const subscriptionsArray = data.data || [];
      console.log('📊 Subscriptions array:', subscriptionsArray);
      
      setSubscriptions(Array.isArray(subscriptionsArray) ? subscriptionsArray : []);
      
    } catch (error) {
      console.error('❌ Error loading subscriptions:', error);
      setError(error.message);
      setSubscriptions([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubscription = async (newSubscription) => {
    // Add the new subscription to local state for immediate UI update
    setSubscriptions(prevSubscriptions => {
      // Ensure prevSubscriptions is always an array
      const currentSubs = Array.isArray(prevSubscriptions) ? prevSubscriptions : [];
      return [newSubscription, ...currentSubs];
    });
  };

  // Safe array operations - always ensure subscriptions is an array
  const safeSubscriptions = Array.isArray(subscriptions) ? subscriptions : [];
  
  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <div className="main-content">
        <Header 
          title="Dashboard"
          onAddSubscription={handleAddSubscription}
        />
        
        <div className="dashboard-content">
          <div className="subscription-summary">
            <h2>Your Subscriptions ({safeSubscriptions.length})</h2>
            
            {loading ? (
              <div className="loading-state">
                <p>Loading your subscriptions...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p>Error: {error}</p>
                <button onClick={fetchSubscriptions} className="retry-btn">
                  Try Again
                </button>
              </div>
            ) : safeSubscriptions.length === 0 ? (
              <div className="empty-state">
                <p>No subscriptions yet. Click "Add Subscription" to get started!</p>
              </div>
            ) : (
              <div className="subscriptions-grid">
                {safeSubscriptions.slice(0, 10).map(sub => ( // Safe slice operation
                  <div key={sub._id || sub.id} className="subscription-card">
                    <h3>{sub.name}</h3>
                    <div className="subscription-amount">
                      ${sub.amount} / {sub.cycle}
                    </div>
                    <div className="subscription-date">
                      Next billing: {new Date(sub.nextBillingDate || sub.startDate).toLocaleDateString()}
                    </div>
                    {sub.notes && (
                      <div className="subscription-notes">
                        {sub.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
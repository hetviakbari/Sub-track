// services/subscriptionService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class SubscriptionService {
    
    // Create a new subscription
    async createSubscription(subscriptionData) {
        try {
            const response = await fetch(`${API_BASE_URL}/subscriptions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriptionData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create subscription');
            }
            
            return data;
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error;
        }
    }
    
    // Get all subscriptions
    async getSubscriptions(params = {}) {
        try {
            const queryParams = new URLSearchParams(params);
            const response = await fetch(`${API_BASE_URL}/subscriptions?${queryParams}`);
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch subscriptions');
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
            throw error;
        }
    }
    
    // Get single subscription
    async getSubscription(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`);
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch subscription');
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching subscription:', error);
            throw error;
        }
    }
    
    // Update subscription
    async updateSubscription(id, subscriptionData) {
        try {
            const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriptionData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update subscription');
            }
            
            return data;
        } catch (error) {
            console.error('Error updating subscription:', error);
            throw error;
        }
    }
    
    // Delete subscription
    async deleteSubscription(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete subscription');
            }
            
            return data;
        } catch (error) {
            console.error('Error deleting subscription:', error);
            throw error;
        }
    }
    
    // Get subscription statistics
    async getSubscriptionStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/subscriptions/stats`);
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch statistics');
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
            throw error;
        }
    }
}

export default new SubscriptionService();
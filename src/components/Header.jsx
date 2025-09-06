import React, { useState } from "react";
import { Plus, Bell } from "lucide-react";
import Button from "./ui/Button";
import SubscriptionModal from "./SubscriptionModal";
import "./Header.css";

// API service for subscription operations
const subscriptionService = {
  async createSubscription(subscriptionData) {
    try {
      const response = await fetch('http://localhost:5000/api/subscriptions', {
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
};

const Header = ({ onAddSubscription, title = "Dashboard" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSubscription = async (subscriptionData) => {
    try {
      setIsSubmitting(true);
      
      console.log('📝 Submitting subscription data:', subscriptionData);
      
      // Save to database via API
      const response = await subscriptionService.createSubscription({
        name: subscriptionData.name,
        amount: subscriptionData.amount,
        cycle: subscriptionData.cycle,
        startDate: subscriptionData.startDate,
        notes: subscriptionData.notes || '',
        category: subscriptionData.category || 'Other'
      });
      
      console.log('✅ Subscription created successfully:', response.data);
      
      // Call parent handler if provided (for UI updates)
      if (onAddSubscription) {
        await onAddSubscription(response.data);
      }
      
      // Show success message (optional)
      if (window.alert) {
        alert('Subscription added successfully! 🎉');
      }
      
      // Close modal after successful submission
      setIsModalOpen(false);
      
      // Optionally refresh the page or emit an event to update other components
      // window.location.reload(); // Uncomment if you want to refresh the page
      
    } catch (error) {
      console.error('❌ Error adding subscription:', error);
      
      // Show error message to user
      const errorMessage = error.message || 'Failed to add subscription. Please try again.';
      if (window.alert) {
        alert(`Error: ${errorMessage}`);
      }
      
      // Modal stays open if there's an error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="title">{title}</h1>
        <div className="actions">
          <Button 
            onClick={() => setIsModalOpen(true)}
            disabled={isSubmitting}
          >
            <Plus size={18} className="mr-1" /> 
            {isSubmitting ? 'Adding...' : 'Add Subscription'}
          </Button>
          <Bell className="icon" />
        </div>
      </div>

      {/* Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => !isSubmitting && setIsModalOpen(false)} // Prevent closing while submitting
        onSubmit={handleAddSubscription}
        isLoading={isSubmitting}
      />
    </>
  );
};

export default Header;
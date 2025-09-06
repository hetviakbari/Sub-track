import React, { useState } from "react";
import { Plus, Bell } from "lucide-react";
import Button from "./ui/Button";
import SubscriptionModal from "./SubscriptionModal";
import "./Header.css";

// API service
const subscriptionService = {
  async createSubscription(subscriptionData) {
    try {
      const response = await fetch('http://localhost:5000/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create subscription');

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

      // Validate startDate
      const date = new Date(subscriptionData.startDate);
      if (isNaN(date.getTime())) throw new Error("Invalid start date");

      // Format date as YYYY-MM-DD
      const formattedData = {
        ...subscriptionData,
        startDate: date.toISOString().split('T')[0]
      };

      console.log('📝 Submitting subscription data:', formattedData);

      const response = await subscriptionService.createSubscription(formattedData);
      console.log('✅ Subscription created successfully:', response.data);

      if (onAddSubscription) await onAddSubscription(response.data);
      alert('Subscription added successfully! 🎉');

      setIsModalOpen(false);
    } catch (error) {
      console.error('❌ Error adding subscription:', error);
      alert(error.message || 'Failed to add subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="title">{title}</h1>
        <div className="actions">
          <Button onClick={() => setIsModalOpen(true)} disabled={isSubmitting}>
            <Plus size={18} className="mr-1" />
            {isSubmitting ? 'Adding...' : 'Add Subscription'}
          </Button>
          <Bell className="icon" />
        </div>
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => !isSubmitting && setIsModalOpen(false)}
        onSubmit={handleAddSubscription}
        isLoading={isSubmitting}
      />
    </>
  );
};

export default Header;

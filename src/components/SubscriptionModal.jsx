import React, { useState } from 'react';
import './SubscriptionModal.css';

const SubscriptionModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    cycle: 'Monthly',
    startDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Subscription name is required';
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Please enter a valid amount';
    
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    else {
      const dateCheck = new Date(formData.startDate);
      if (isNaN(dateCheck.getTime())) newErrors.startDate = 'Invalid date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      id: Date.now(),
      createdAt: new Date().toISOString()
    });

    // Reset form after successful submission
    setFormData({
      name: '',
      amount: '',
      cycle: 'Monthly',
      startDate: '',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add a New Subscription</h2>
          <p>Enter the details below to start tracking your subscription.</p>
        </div>

        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-group">
            <label htmlFor="name">Subscription Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Netflix Premium"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="amount">Billing Amount</label>
              <div className="amount-input">
                <span className="currency">$</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="15.99"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={errors.amount ? 'error' : ''}
                />
              </div>
              {errors.amount && <span className="error-text">{errors.amount}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cycle">Billing Cycle</label>
              <select
                id="cycle"
                name="cycle"
                value={formData.cycle}
                onChange={handleInputChange}
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className={errors.startDate ? 'error' : ''}
            />
            {errors.startDate && <span className="error-text">{errors.startDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="e.g., Family plan, shared with friends"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;

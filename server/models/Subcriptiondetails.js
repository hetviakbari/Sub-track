const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    // User reference (if you have user authentication)
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Make optional if not using auth yet
    },
    
    // Subscription name (from your modal)
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        maxLength: [100, 'Subscription name cannot exceed 100 characters']
    },
    
    // Billing amount (from your modal)
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0.01, 'Amount must be greater than 0'],
        set: (val) => Math.round(val * 100) / 100 // Round to 2 decimal places
    },
    
    // Currency
    currency: {
        type: String,
        default: 'USD',
        enum: ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD']
    },
    
    // Billing cycle (from your modal dropdown)
    cycle: {
        type: String,
        required: [true, 'Billing cycle is required'],
        enum: {
            values: ['Weekly', 'Monthly', 'Quarterly', 'Yearly'],
            message: '{VALUE} is not a valid billing cycle'
        }
    },
    
    // Start date (from your modal)
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    
    // Auto-calculated next billing date
    nextBillingDate: {
        type: Date,
        required: true
    },
    
    // Notes (from your modal)
    notes: {
        type: String,
        trim: true,
        maxLength: [500, 'Notes cannot exceed 500 characters'],
        default: ''
    },
    
    // Category for organizing subscriptions
    category: {
        type: String,
        enum: [
            'Entertainment',
            'Productivity', 
            'Health & Fitness',
            'Education',
            'Business',
            'Shopping',
            'Music',
            'News',
            'Gaming',
            'Other'
        ],
        default: 'Other'
    },
    
    // Status of subscription
    status: {
        type: String,
        enum: ['active', 'paused', 'cancelled'],
        default: 'active'
    },
    
    // Reminder settings
    reminder: {
        enabled: {
            type: Boolean,
            default: true
        },
        daysBefore: {
            type: Number,
            default: 3,
            min: 1,
            max: 30
        }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Method to calculate next billing date based on cycle
subscriptionSchema.methods.calculateNextBillingDate = function(fromDate = null) {
    const baseDate = fromDate || this.startDate;
    const date = new Date(baseDate);
    
    switch (this.cycle) {
        case 'Weekly':
            date.setDate(date.getDate() + 7);
            break;
        case 'Monthly':
            date.setMonth(date.getMonth() + 1);
            break;
        case 'Quarterly':
            date.setMonth(date.getMonth() + 3);
            break;
        case 'Yearly':
            date.setFullYear(date.getFullYear() + 1);
            break;
        default:
            date.setMonth(date.getMonth() + 1);
    }
    
    return date;
};

// Pre-save middleware to automatically set next billing date
subscriptionSchema.pre('save', function(next) {
    // Calculate next billing date when creating new or updating start date/cycle
    if (this.isNew || this.isModified('startDate') || this.isModified('cycle')) {
        this.nextBillingDate = this.calculateNextBillingDate();
    }
    next();
});

// Method to get monthly cost (convert all cycles to monthly equivalent)
subscriptionSchema.methods.getMonthlyEquivalent = function() {
    switch (this.cycle) {
        case 'Weekly':
            return this.amount * 4.33; // Average weeks per month
        case 'Monthly':
            return this.amount;
        case 'Quarterly':
            return this.amount / 3;
        case 'Yearly':
            return this.amount / 12;
        default:
            return this.amount;
    }
};

// Static method to get user's total monthly spending
subscriptionSchema.statics.getTotalMonthlySpending = async function(userId) {
    const subscriptions = await this.find({ 
        userId, 
        status: 'active' 
    });
    
    return subscriptions.reduce((total, sub) => {
        return total + sub.getMonthlyEquivalent();
    }, 0);
};

// Indexes for better performance
subscriptionSchema.index({ userId: 1, status: 1 });
subscriptionSchema.index({ nextBillingDate: 1 });
subscriptionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);
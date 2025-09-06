const Subscription = require('../models/Subcriptiondetails');


// @desc    Create new subscription
// @route   POST /api/subscriptions
// @access  Public (change later to Private if auth)
const createSubscription = async (req, res) => {
  try {
    let { name, amount, cycle, startDate, notes, category } = req.body;

    if (!name?.trim() || !amount || !cycle || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, amount, cycle, startDate"
      });
    }



    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount. Must be a positive number."
      });
    }

    let parsedStartDate;


    if (/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      parsedStartDate = new Date(startDate + "T00:00:00Z"); // normalize
    } else {
      parsedStartDate = new Date(startDate);
    }

    if (isNaN(parsedStartDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Please use YYYY-MM-DD or a valid ISO date string."
      });
    }

    const allowedCycles = ["Weekly", "Monthly", "Quarterly", "Yearly"];
    if (!allowedCycles.includes(cycle)) {
      return res.status(400).json({
        success: false,
        message: `Invalid billing cycle. Allowed values: ${allowedCycles.join(", ")}`
      });
    }
    const subscription = new Subscription({
      name: name.trim(),
      amount: parsedAmount,
      cycle,
      startDate: parsedStartDate,
      notes: notes?.trim() || "",
      category: category || "Other"

    });


    await subscription.save();


    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription
    });

  } catch (error) {
    console.error("❌ Error creating subscription:", error);


    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages
      });
    }


    res.status(500).json({
      success: false,
      message: "Server error occurred while creating subscription"
    });
  }
};

module.exports = { createSubscription };



// @desc    Get all subscriptions
// @route   GET /api/subscriptions
// @access  Public (or Private if you add auth)
const getSubscriptions = async (req, res) => {
    try {
        const { status, category, limit = 10, page = 1 } = req.query;
        
        // Build filter object
        const filter = {};
        // filter.userId = req.user?.id; // Uncomment when you add authentication
        
        if (status) filter.status = status;
        if (category && category !== 'All') filter.category = category;
        
        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const subscriptions = await Subscription.find(filter)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);
        
        const total = await Subscription.countDocuments(filter);
        
        // Calculate total monthly spending
        const totalMonthlySpending = subscriptions.reduce((sum, sub) => {
            return sum + sub.getMonthlyEquivalent();
        }, 0);
        
        res.status(200).json({
            success: true,
            count: subscriptions.length,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            totalMonthlySpending: Math.round(totalMonthlySpending * 100) / 100,
            data: subscriptions
        });
        
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({
            success: false,
            message: 'Server error occurred while fetching subscriptions'
        });
    }
};

// @desc    Get single subscription
// @route   GET /api/subscriptions/:id
// @access  Public (or Private if you add auth)
const getSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }
        
        // Check if user owns this subscription (when auth is added)
        // if (subscription.userId.toString() !== req.user.id) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Not authorized to access this subscription'
        //     });
        // }
        
        res.status(200).json({
            success: true,
            data: subscription
        });
        
    } catch (error) {
        console.error('Error fetching subscription:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid subscription ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error occurred while fetching subscription'
        });
    }
};

// @desc    Update subscription
// @route   PUT /api/subscriptions/:id
// @access  Public (or Private if you add auth)
const updateSubscription = async (req, res) => {
    try {
        const { name, amount, cycle, startDate, notes, category, status } = req.body;
        
        let subscription = await Subscription.findById(req.params.id);
        
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }
        
        // Check if user owns this subscription (when auth is added)
        // if (subscription.userId.toString() !== req.user.id) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Not authorized to update this subscription'
        //     });
        // }
        
        // Update subscription
        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (amount !== undefined) updateData.amount = parseFloat(amount);
        if (cycle !== undefined) updateData.cycle = cycle;
        if (startDate !== undefined) updateData.startDate = new Date(startDate);
        if (notes !== undefined) updateData.notes = notes.trim();
        if (category !== undefined) updateData.category = category;
        if (status !== undefined) updateData.status = status;
        
        subscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            data: subscription
        });
        
    } catch (error) {
        console.error('Error updating subscription:', error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid subscription ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error occurred while updating subscription'
        });
    }
};

// @desc    Delete subscription
// @route   DELETE /api/subscriptions/:id
// @access  Public (or Private if you add auth)
const deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }
        
        // Check if user owns this subscription (when auth is added)
        // if (subscription.userId.toString() !== req.user.id) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Not authorized to delete this subscription'
        //     });
        // }
        
        await Subscription.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting subscription:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid subscription ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error occurred while deleting subscription'
        });
    }
};

// @desc    Get subscription statistics
// @route   GET /api/subscriptions/stats
// @access  Public (or Private if you add auth)
const getSubscriptionStats = async (req, res) => {
    try {
        // const userId = req.user?.id; // Uncomment when you add authentication
        
        const stats = await Subscription.aggregate([
            // { $match: { userId: mongoose.Types.ObjectId(userId) } }, // Uncomment for auth
            {
                $group: {
                    _id: null,
                    totalSubscriptions: { $sum: 1 },
                    activeSubscriptions: {
                        $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
                    },
                    totalMonthlySpending: {
                        $sum: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ['$cycle', 'Weekly'] }, then: { $multiply: ['$amount', 4.33] } },
                                    { case: { $eq: ['$cycle', 'Monthly'] }, then: '$amount' },
                                    { case: { $eq: ['$cycle', 'Quarterly'] }, then: { $divide: ['$amount', 3] } },
                                    { case: { $eq: ['$cycle', 'Yearly'] }, then: { $divide: ['$amount', 12] } }
                                ],
                                default: '$amount'
                            }
                        }
                    }
                }
            }
        ]);
        
        const result = stats[0] || {
            totalSubscriptions: 0,
            activeSubscriptions: 0,
            totalMonthlySpending: 0
        };
        
        // Round monthly spending to 2 decimal places
        result.totalMonthlySpending = Math.round(result.totalMonthlySpending * 100) / 100;
        
        res.status(200).json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.error('Error fetching subscription stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error occurred while fetching statistics'
        });
    }
};

module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscriptionStats
};
const express = require('express');
const {
    createSubscription,
    getSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscriptionStats
} = require('../controllers/subscriptionController');

const router = express.Router();

// @route   POST /api/subscriptions
// @desc    Create a new subscription
// @access  Public (change to Private when you add auth)
router.post('/', createSubscription);

// @route   GET /api/subscriptions
// @desc    Get all subscriptions with optional filtering and pagination
// @access  Public (change to Private when you add auth)
router.get('/', getSubscriptions);

// @route   GET /api/subscriptions/stats
// @desc    Get subscription statistics
// @access  Public (change to Private when you add auth)
router.get('/stats', getSubscriptionStats);

// @route   GET /api/subscriptions/:id
// @desc    Get single subscription by ID
// @access  Public (change to Private when you add auth)
router.get('/:id', getSubscription);

// @route   PUT /api/subscriptions/:id
// @desc    Update subscription by ID
// @access  Public (change to Private when you add auth)
router.put('/:id', updateSubscription);

// @route   DELETE /api/subscriptions/:id
// @desc    Delete subscription by ID
// @access  Public (change to Private when you add auth)
router.delete('/:id', deleteSubscription);

module.exports = router;
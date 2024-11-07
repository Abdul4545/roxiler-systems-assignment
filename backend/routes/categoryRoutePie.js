// routes/categoryRoute.js
const express = require('express');
const { getCategoryStatistics } = require('../controllers/getCategoryStatistics'); // Import the controller
const router = express.Router();

// Route to get category statistics for pie chart (grouped by category)
router.get('/category-statistics', getCategoryStatistics);

module.exports = router;

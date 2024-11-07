// const express = require("express");
// const getPriceRangeStatistics = require('../controllers/getPriceRangeStatistics');
// const router = express.Router();

// // Question 3
// // http://localhost:5000/api/statistics/price-range?month=7
// router.get('/price-range', getPriceRangeStatistics);

// module.exports = router;



const express = require("express");
const { getPriceRangeStatistics } = require('../controllers/getPriceRangeStatistics');
const router = express.Router();

// Route for price range statistics (using query parameter for month)
router.get('/price-range', getPriceRangeStatistics);

module.exports = router;
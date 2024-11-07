const express = require('express');
const axios = require('axios');  // Use axios for making requests to other APIs
const router = express.Router();

// Combined route to fetch data from all 3 APIs
router.get('/combined-statistics', async (req, res) => {
  try {
    // Get the parameters (year, month) from the query
    const { year, month } = req.query;
    
    // Make requests to the three APIs
    const statisticsResponse = await axios.get(`http://localhost:5000/api/statistics?year=${year}&month=${month}`);
    const priceRangeResponse = await axios.get(`http://localhost:5000/api/price-range?month=${month}`);
    const categoryStatisticsResponse = await axios.get(`http://localhost:5000/api/category-statistics?month=${month}`);
    
    // Combine all responses into one
    const combinedResponse = {
      statistics: statisticsResponse.data,
      priceRange: priceRangeResponse.data,
      categoryStatistics: categoryStatisticsResponse.data
    };

    // Send the combined response
    res.json(combinedResponse);
  } catch (error) {
    // Handle errors (e.g., if one of the APIs fails)
    console.error(error);
    res.status(500).json({ message: 'Error retrieving combined statistics', error: error.message });
  }
});

module.exports = router;

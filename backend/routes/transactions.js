const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET /api/transactions - List transactions with search and pagination
router.get('/fulldata', async (req, res) => {
  try {
    const { search = '', page = 1, perPage = 10 } = req.query;

    // Convert page and perPage to integers with default values
    const pageNumber = parseInt(page) || 1;
    const perPageNumber = parseInt(perPage) || 10;

    // Build the search query
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },          
            { description: { $regex: search, $options: 'i' } },    
            { price: { $regex: search, $options: 'i' } }           
          ]
        }
      : {};

    // Fetch transactions based on the search query and apply pagination
    const transactions = await Transaction.find(searchQuery)
      .skip((pageNumber - 1) * perPageNumber)
      .limit(perPageNumber);

    // Get total count for pagination info
    const totalCount = await Transaction.countDocuments(searchQuery);

    res.json({
      transactions,
      totalPages: Math.ceil(totalCount / perPageNumber),
      currentPage: pageNumber,
      perPage: perPageNumber,
      totalCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
  }
});

module.exports = router;


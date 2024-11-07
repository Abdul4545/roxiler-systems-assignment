const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const perPage = parseInt(req.query.perPage) || 10; 
    const search = req.query.search || ""; 

    const query = search
      ? { 
          $or: [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { price: parseFloat(search) || 0 },
          ]
        }
      : {};

    const totalCount = await Transaction.countDocuments(query);

    const totalPages = Math.ceil(totalCount / perPage);

    if (page > totalPages) {
      return res.status(404).json({
        message: "No data available for the requested page",
        error: "Page number exceeds available data",
      });
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      transactions,
      totalPages,
      currentPage: page,
      perPage,
      totalCount,
      sold,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving transactions",
      error: error.message,
    });
  }
};

module.exports = { getTransactions };
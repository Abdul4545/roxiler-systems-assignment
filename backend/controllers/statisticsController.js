const Transaction = require('../models/Transaction');

exports.getStatistics = async (req, res) => {
  try {
      const { year, month } = req.query;
      const parsedYear = parseInt(year);
      const parsedMonth = parseInt(month); // Ensure month is an integer

      // Log for debugging
      console.log('Year:', parsedYear);
      console.log('Month:', parsedMonth);

      // Fetch all transactions
      const transactions = await Transaction.find();

      // Filter transactions by checking the year and month directly
      const filteredTransactions = transactions.filter(transaction => {
          const saleDate = new Date(transaction.dateOfSale);
          const saleYear = saleDate.getFullYear();
          const saleMonth = saleDate.getMonth() + 1; // getMonth() returns 0-based month, so add 1

          return saleYear === parsedYear && saleMonth === parsedMonth;
      });

      // Calculate statistics
      const totalSaleAmount = filteredTransactions.reduce(
          (sum, transaction) => sum + (transaction.sold ? transaction.price : 0), 
          0
      );
      const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold).length;
      const totalNotSoldItems = filteredTransactions.filter(transaction => !transaction.sold).length;

      // Respond with calculated statistics
      res.json({
          totalSaleAmount,
          totalSoldItems,
          totalNotSoldItems,
          transactions: filteredTransactions
      });

  } catch (error) {
      console.error("Error retrieving statistics:", error);
      res.status(500).json({ message: "Error retrieving statistics", error: error.message });
  }
};


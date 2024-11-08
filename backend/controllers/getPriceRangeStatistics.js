// question 3
const Transaction = require('../models/Transaction');

exports.getPriceRangeStatistics = async (req, res) => {
    try {
      const { month } = req.query; 
      const parsedMonth = parseInt(month); 

      console.log('Month:', parsedMonth);
  
      // Fetch all transactions
      const transactions = await Transaction.find();
  
      // Filter transactions by the selected month (ignoring the year)
      const filteredTransactions = transactions.filter(transaction => {
        const saleDate = new Date(transaction.dateOfSale);
        const saleMonth = saleDate.getMonth() + 1; // Month is 0-based, so we add 1
        return saleMonth === parsedMonth;
      });
  
      // Define the price ranges
      const priceRanges = [
        { range: "0 - 100", min: 0, max: 100 },
        { range: "101 - 200", min: 101, max: 200 },
        { range: "201 - 300", min: 201, max: 300 },
        { range: "301 - 400", min: 301, max: 400 },
        { range: "401 - 500", min: 401, max: 500 },
        { range: "501 - 600", min: 501, max: 600 },
        { range: "601 - 700", min: 601, max: 700 },
        { range: "701 - 800", min: 701, max: 800 },
        { range: "801 - 900", min: 801, max: 900 },
        { range: "901-above", min: 901, max: Infinity },
      ];
  
      // Initialize a count for each range
      const rangeCounts = priceRanges.map(range => ({ range: range.range, count: 0 }));
  
      // Count the number of items in each range
      filteredTransactions.forEach(transaction => {
        const price = transaction.price;
        priceRanges.forEach(range => {
          if (price >= range.min && price <= range.max) {
            const rangeCount = rangeCounts.find(r => r.range === range.range);
            if (rangeCount) rangeCount.count++;
          }
        });
      });
  
      // Return the result
      res.json(rangeCounts);
  
    } catch (error) {
      console.error("Error retrieving price range statistics:", error);
      res.status(500).json({ message: "Error retrieving statistics", error: error.message });
    }
  };
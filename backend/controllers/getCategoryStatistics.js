const Transaction = require('../models/Transaction'); 

const getCategoryStatistics = async (req, res) => {
  try {
    const { month } = req.query;  // Get month from query params

    if (!month) {
      return res.status(400).json({ message: "Month parameter is required." });
    }

    // Convert month to a valid number (e.g., "7" for July)
    const parsedMonth = parseInt(month);
    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      return res.status(400).json({ message: "Invalid month value. Please provide a number between 1 and 12." });
    }

    // MongoDB aggregation query to filter and group by category
    const categoryStatistics = await Transaction.aggregate([
      {
        $addFields: {
          month: { $month: { $toDate: "$dateOfSale" } }, // Extract month from date
        },
      },
      {
        $match: { 
          month: parsedMonth, // Match the month
        },
      },
      {
        $group: {
          _id: "$category", // Group by category
          itemCount: { $sum: 1 }, // Count number of items in each category
        },
      },
      {
        $project: {
          category: "$_id",
          itemCount: 1,
          _id: 0, // Exclude the internal _id field from the output
        },
      },
    ]);

    // If no data found, return empty statistics
    if (categoryStatistics.length === 0) {
      return res.status(404).json({ message: "No data found for the selected month." });
    }

    // Send response with the category statistics
    return res.status(200).json(categoryStatistics);
  } catch (error) {
    console.error("Error retrieving category statistics:", error);
    return res.status(500).json({ message: "Error retrieving category statistics", error });
  }
};

module.exports = { getCategoryStatistics };

const express = require('express');
const connectDB = require('./dbconnection');
const transactionRoutes = require('./routes/transactions');
const statisticsRoutes = require('./routes/statisticsRoutes');
const getPriceRangeStatistics = require('./routes/bargraphRoute');
const categoryRoute = require('./routes/categoryRoutePie');
const combinedRoute = require('./routes/combinedRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB(); // Connect to MongoDB
app.use(cors());

// Middleware for converting the response into json
app.use(express.json());

// Routes
app.use('/api', transactionRoutes); // http://localhost:5000/api/fulldata
app.use('/api', statisticsRoutes); // http://localhost:5000/api/statistics?year=2022&month=7
app.use('/api', getPriceRangeStatistics) // http://localhost:5000/api/price-range?month=2
app.use('/api', categoryRoute) // http://localhost:5000/api/category-statistics?month=7
app.use('/api', combinedRoute); // http://localhost:5000/api/combined-statistics?year=2022&month=7


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

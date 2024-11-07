const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date
});


const Transaction = mongoose.model('Transaction', transactionSchema, 'transactionsDB');
module.exports = Transaction;


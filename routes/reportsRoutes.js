const express = require('express');
const router = express.Router();

const {
  getSummaryReport,
  getRevenueByDate,
  getRevenueByPaymentMethod,
  getTotalCustomers,
  getSoldProductDetails,
} = require('../controllers/reportsController');

// Get Summary Report
router.get('/summary', getSummaryReport);

// Get Revenue grouped by Date
router.get('/revenue-by-date', getRevenueByDate);

// Get Revenue by Payment Method
router.get('/revenue-by-payment', getRevenueByPaymentMethod);

// Get Total Customers
router.get('/total-customers', getTotalCustomers);

// Get Sold Product Details
router.get('/sold-products', getSoldProductDetails);

module.exports = {
  reportsRouter: router,
};

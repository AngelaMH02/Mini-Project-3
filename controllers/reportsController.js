const { Sales, Receipt, Customer, Product, sequelize } = require('../models');

/**
 * fn(...): Calls a SQL function
 * col(...): Refers to a column in the database
 * literal(...): Inserts raw SQL
 */
const { fn, col, literal } = require('sequelize');

/**
 * Total revenue & total items sold
 */
const getSummaryReport = async (req, res) => {
  try {
    // SELECT SUM(salePrice) AS totalRevenue FROM Sales;
    const totalRevenue = await Sales.findAll({
      // attributes: chooses which columns to retrieve
      attributes: [[fn('SUM', col('salePrice')), 'totalRevenue']],
    });

    const totalItemsSold = await Sales.count();

    res.status(200).json({
      success: true,
      data: {
        // findAll always returns an array
        totalRevenue: totalRevenue[0].get('totalRevenue') || 0,
        totalItemsSold,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving summary report',
      error: error.message,
    });
  }
};

/**
 * Revenue grouped by purchase date
 */
const getRevenueByDate = async (req, res) => {
  try {
    const revenueByDate = await Sales.findAll({
      attributes: [
        // purchaseDate without time part to broaden grouping
        [sequelize.fn('DATE', col('Receipt.purchaseDate')), 'day'],
        [fn('SUM', col('salePrice')), 'totalRevenue'],
      ],
      // JOIN Receipt ON Sales.receiptId = Receipt.id
      include: [{ model: Receipt, attributes: [] }],

      // GROUP BY day
      group: ['day'],

      // ORDER BY day ASC
      // literal used for alias 'day', not a real column
      order: [[literal('day'), 'ASC']],
    });

    res.status(200).json(revenueByDate);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving revenue by date',
      error: error.message,
    });
  }
};

/**
 * Revenue grouped by payment method
 */
const getRevenueByPaymentMethod = async (req, res) => {
  try {
    const revenueByPaymentMethod = await Sales.findAll({
      attributes: [
        // Receipt.paymentMethod AS paymentMethod
        [col('Receipt.paymentMethod'), 'paymentMethod'],
        [fn('SUM', col('salePrice')), 'totalRevenue'],
      ],
      // JOIN Receipt so we can access paymentMethod
      include: [{ model: Receipt, attributes: [] }],
      group: ['paymentMethod'],
    });

    res.status(200).json(revenueByPaymentMethod);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving revenue by payment method',
      error: error.message,
    });
  }
};

/**
 * Get product details of sold items
 */
const getSoldProductDetails = async (req, res) => {
  try {
    const soldProductDetails = await Sales.findAll({
      attributes: [
        // Returns productId for each sold product
        'productId',
        // COUNT(Sales.id) AS quantitySold
        // Should always be 1 since each item is unique
        [fn('COUNT', col('Sales.id')), 'quantitySold'],

        // Should equal salePrice since each item is unique
        [fn('SUM', col('salePrice')), 'revenue'],
      ],

      // Join Product to get product details
      include: [
        {
          model: Product,
          attributes: ['title', 'description', 'price', 'productImg', 'status'],
        },
      ],
      // SQL requires grouping by non-aggregated columns
      group: ['productId', 'Product.id'],
    });
    res.status(200).json(soldProductDetails);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving sold product details',
      error: error.message,
    });
  }
};

/**
 * Get total customers
 */
const getTotalCustomers = async (req, res) => {
  try {
    // SELECT COUNT(*) AS totalCustomers FROM Customers;
    const totalCustomers = await Customer.count();

    res.status(200).json({ success: true, data: { totalCustomers } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving total customers',
      error: error.message,
    });
  }
};

module.exports = {
  getSummaryReport,
  getRevenueByDate,
  getRevenueByPaymentMethod,
  getSoldProductDetails,
  getTotalCustomers,
};

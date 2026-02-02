const express = require('express');
const router = express.Router();
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

// Get all Customers
router.get('/', getCustomers);

// Get Customer by ID
router.get('/:id', getCustomerById);

// Create a new Customer
router.post('/', createCustomer);

// Update a Customer by ID
router.patch('/:id', updateCustomer);

// Delete a Customer by ID
router.delete('/:id', deleteCustomer);

module.exports = {
  customerRouter: router,
};

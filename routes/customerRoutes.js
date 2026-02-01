let express = require('express');
let router = express.Router();
let Controllers = require('../controllers');

// Get all Customers
router.get('/', (req, res) => {
  Controllers.customerController.getCustomers(req, res);
});

// Get Customer by ID
router.get('/:id', (req, res) => {
  Controllers.customerController.getCustomerById(req, res);
});

// Create a new Customer
router.post('/', (req, res) => {
  Controllers.customerController.createCustomer(req, res);
});

// Update a Customer by ID
router.put('/:id', (req, res) => {
  Controllers.customerController.updateCustomer(req, res);
});

// Delete a Customer by ID
router.delete('/:id', (req, res) => {
  Controllers.customerController.deleteCustomer(req, res);
});

module.exports = {
  customerRouter: router,
};

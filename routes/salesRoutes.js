let express = require('express');
let router = express.Router();
let Controllers = require('../controllers');

// Get all Sales
router.get('/', (req, res) => {
  Controllers.salesController.getSales(req, res);
});

// Get Sale by ID
router.get('/:id', (req, res) => {
  Controllers.salesController.getSaleById(req, res);
});

// Create a new Sale
router.post('/', (req, res) => {
  Controllers.salesController.createSale(req, res);
});

// Update a Sale by ID
router.put('/:id', (req, res) => {
  Controllers.salesController.updateSale(req, res);
});

// Delete a Sale by ID
router.delete('/:id', (req, res) => {
  Controllers.salesController.deleteSale(req, res);
});

module.exports = {
  salesRouter: router,
};

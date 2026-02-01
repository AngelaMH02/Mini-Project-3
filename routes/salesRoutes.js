const express = require('express');
const router = express.Router();
const {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
} = require('../controllers/salesController');

// Get all Sales
router.get('/', getSales);

// Get Sale by ID
router.get('/:id', getSaleById);

// Create a new Sale
router.post('/', createSale);

// Update a Sale by ID
router.patch('/:id', updateSale);

// Delete a Sale by ID
router.delete('/:id', deleteSale);

module.exports = {
  salesRouter: router,
};

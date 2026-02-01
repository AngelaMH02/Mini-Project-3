const express = require('express');
const router = express.Router();
const {
  getReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt,
} = require('../controllers/receiptController');

// Get all Receipts
router.get('/', getReceipts);

// Get Receipt by ID
router.get('/:id', getReceiptById);

// Create a new Receipt
router.post('/', createReceipt);
// Update a Receipt by ID
router.put('/:id', updateReceipt);

// Delete a Receipt by ID
router.delete('/:id', deleteReceipt);

module.exports = {
  receiptRouter: router,
};

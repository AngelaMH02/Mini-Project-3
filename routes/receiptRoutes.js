let express = require('express');
let router = express.Router();
let Controllers = require('../controllers');

// Get all Receipts
router.get('/', (req, res) => {
  Controllers.receiptController.getReceipts(req, res);
});

// Get Receipt by ID
router.get('/:id', (req, res) => {
  Controllers.receiptController.getReceiptById(req, res);
});

// Create a new Receipt
router.post('/', (req, res) => {
  Controllers.receiptController.createReceipt(req, res);
});

// Update a Receipt by ID
router.put('/:id', (req, res) => {
  Controllers.receiptController.updateReceipt(req, res);
});

// Delete a Receipt by ID
router.delete('/:id', (req, res) => {
  Controllers.receiptController.deleteReceipt(req, res);
});

module.exports = {
  receiptRouter: router,
};

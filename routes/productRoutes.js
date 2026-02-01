const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  importProducts,
} = require('../controllers/productController');

// Get all Products
router.get('/', getProducts);

// Get Product by ID
router.get('/:id', getProductById);

// Create a new Product
router.post('/', createProduct);

// Import products from external API (DummyJSON)
router.post('/import', importProducts);

// Update a Product by ID
router.put('/:id', updateProduct);

// Delete a Product by ID
router.delete('/:id', deleteProduct);

module.exports = {
  productRouter: router,
};

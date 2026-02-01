let express = require('express');
let router = express.Router();
let Controllers = require('../controllers');

// Get all Products
router.get('/', (req, res) => {
  Controllers.productController.getProducts(req, res);
});

// Get Product by ID
router.get('/:id', (req, res) => {
  Controllers.productController.getProductById(req, res);
});

// Create a new Product
router.post('/', (req, res) => {
  Controllers.productController.createProduct(req, res);
});

// Update a Product by ID
router.put('/:id', (req, res) => {
  Controllers.productController.updateProduct(req, res);
});

// Delete a Product by ID
router.delete('/:id', (req, res) => {
  Controllers.productController.deleteProduct(req, res);
});

module.exports = {
  productRouter: router,
};

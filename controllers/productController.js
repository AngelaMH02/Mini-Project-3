const { Product } = require('../models/Product');

/**
 * Get all products
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a product by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Create a new product
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const createProduct = async (req, res) => {
  try {
    const { title, description, price, productImg, status } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      productImg,
      status,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Update a product by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [numberOfAffectedRows] = await Product.update(updates, {
      where: { id },
    });

    if (numberOfAffectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' });
    }

    const updatedProduct = await Product.findByPk(id);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Delete a product by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.destroy({
      where: { id },
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

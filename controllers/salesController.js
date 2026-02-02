const { Sales } = require('../models/Sales');

/**
 * Get all sales
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const getSales = async (req, res) => {
  try {
    const sales = await Sales.findAll();
    res.status(200).json({ success: true, data: sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a sale by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sales.findByPk(id);

    if (!sale) {
      return res.status(404).json({ success: false, error: 'Sale not found' });
    }
    res.status(200).json({ success: true, data: sale });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Create a new sale
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const createSale = async (req, res) => {
  try {
    const { receiptId, productId, salePrice } = req.body;

    const sale = await Sales.create({
      receiptId,
      productId,
      salePrice,
    });

    res.status(201).json({ success: true, data: sale });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Update a sale by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [numberOfAffectedRows] = await Sales.update(updates, {
      where: { id },
    });

    if (numberOfAffectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Sale not found' });
    }

    const updatedSale = await Sales.findByPk(id);
    res.status(200).json({ success: true, data: updatedSale });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Delete a sale by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Sales.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Sale not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Sale deleted successfully',
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};

const { Receipt } = require('../models/Receipt');

/**
 * Get all receipts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const getReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.findAll();
    res.status(200).json({ success: true, data: receipts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a receipt by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const getReceiptById = async (req, res) => {
  try {
    const { id } = req.params;
    const receipt = await Receipt.findByPk(id);

    if (!receipt) {
      return res
        .status(404)
        .json({ success: false, error: 'Receipt not found' });
    }
    res.status(200).json({ success: true, data: receipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Create a new receipt
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const createReceipt = async (req, res) => {
  try {
    const { customerId, purchaseDate, paymentMethod, totalAmount } = req.body;

    const receipt = await Receipt.create({
      customerId,
      purchaseDate,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json({ success: true, data: receipt });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Update a receipt by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const updateReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [numberOfAffectedRows] = await Receipt.update(updates, {
      where: { id },
    });

    if (numberOfAffectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, error: 'Receipt not found' });
    }

    const updatedReceipt = await Receipt.findByPk(id);
    res.status(200).json({ success: true, data: updatedReceipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Delete a receipt by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const deleteReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Receipt.destroy({
      where: { id },
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: 'Receipt not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Receipt deleted successfully',
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt,
};

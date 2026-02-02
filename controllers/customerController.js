const { Customer } = require('../models/Customer');

/**
 * Get all customers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a customer by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: 'Customer not found' });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Create a new customer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const createCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;

    const customer = await Customer.create({
      name,
      email,
    });

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Update a customer by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [numberOfAffectedRows] = await Customer.update(updates, {
      where: { id },
    });

    if (numberOfAffectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, error: 'Customer not found' });
    }

    const updatedCustomer = await Customer.findByPk(id);
    res.status(200).json({ success: true, data: updatedCustomer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Delete a customer by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Customer.destroy({
      where: { id },
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: 'Customer not found' });
    }

    res
      .status(200)
      .json({
        success: true,
        message: 'Customer deleted successfully',
        data: deleted,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

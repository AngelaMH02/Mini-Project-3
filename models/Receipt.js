const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Receipt Model
 * Represents the 'Receipts' table in MySQL
 */
const Receipt = sequelize.define('Receipt', {
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'Total Amount must be a decimal value' },
      min: { args: [0], msg: 'Total Amount must be positive' },
    },
  },
  paymentMethod: {
    type: DataTypes.ENUM(
      'cash',
      'debit_card',
      'venmo',
      'cash_app',
      'paypal',
      'zelle',
    ),
    allowNull: false,
    defaultValue: 'cash',
  },
});

module.exports = { Receipt };

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Sales Model
 * Represents the 'Sales' table in MySQL
 */
const Sales = sequelize.define('Sales', {
  salePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'Sale Price must be a decimal value' },
      min: { args: [0], msg: 'Sale Price must be positive' },
    },
  },
});

module.exports = { Sales };

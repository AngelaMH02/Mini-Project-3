const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Product Model
 * Represents the 'Products' table in MySQL
 */
const Product = sequelize.define('Product', {
  externalId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true, // prevent duplicates
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title is required' },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'Price must be a decimal value' },
      min: { args: [0], msg: 'Price must be positive' },
    },
  },
  productImg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('sold', 'available'),
    defaultValue: 'available',
  },
});

module.exports = { Product };

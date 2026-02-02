const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Customer Model
 * Represents the 'Customers' table in MySQL
 */
const Customer = sequelize.define('Customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name is required' },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Must be a valid email address' },
    },
  },
});

module.exports = { Customer };

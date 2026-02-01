const { sequelize } = require('../config/db');

const { Product } = require('./Product');
const { Sales } = require('./Sales');
const { Receipt } = require('./Receipt');
const { Customer } = require('./Customer');

Customer.hasMany(Receipt, { foreignKey: 'customerId', onDelete: 'CASCADE' });
Receipt.belongsTo(Customer, { foreignKey: 'customerId' });

Receipt.hasMany(Sales, { foreignKey: 'receiptId', onDelete: 'CASCADE' });
Sales.belongsTo(Receipt, { foreignKey: 'receiptId' });

Product.hasOne(Sales, { foreignKey: 'productId', onDelete: 'CASCADE' });
Sales.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  Product,
  Sales,
  Receipt,
  Customer,
};

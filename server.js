const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');

// Import routers
const { customerRouter } = require('./routes/customerRoutes');
const { productRouter } = require('./routes/productRoutes');
const { receiptRouter } = require('./routes/receiptRoutes');
const { salesRouter } = require('./routes/salesRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/customers', customerRouter);
app.use('/api/products', productRouter);
app.use('/api/receipts', receiptRouter);
app.use('/api/sales', salesRouter);

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ MySQL Connected and Models Synced');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

startServer();

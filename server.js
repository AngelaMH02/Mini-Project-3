const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Import routers
const { customerRouter } = require('./routes/customerRoutes');
const { productRouter } = require('./routes/productRoutes');
const { receiptRouter } = require('./routes/receiptRoutes');
const { salesRouter } = require('./routes/salesRoutes');
const { reportsRouter } = require('./routes/reportsRoutes');

const app = express();
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/customers', customerRouter);
app.use('/api/products', productRouter);
app.use('/api/receipts', receiptRouter);
app.use('/api/sales', salesRouter);
app.use('/api/reports', reportsRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔗 Database connected successfully');
    await sequelize.sync({ alter: true });
    console.log('✅ Models Synced');

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

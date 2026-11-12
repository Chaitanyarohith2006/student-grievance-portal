require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const grievanceRoutes = require('./routes/grievances');
const adminRoutes = require('./routes/admin');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/grievances', grievanceRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Grievance Portal API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Seed default admin if none exists
const seedAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'Admin@123';
      const passwordHash = await bcrypt.hash(password, 12);
      await Admin.create({ username, passwordHash });
      console.log(`Default admin created — username: "${username}"`);
    }
  } catch (error) {
    console.error('Admin seed error:', error);
  }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedAdmin();
});

module.exports = app;

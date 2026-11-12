const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const Grievance = require('../models/Grievance');
const authMiddleware = require('../middleware/auth');

// POST /api/admin/login
router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username: username.toLowerCase() });

      if (!admin) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({ token, username: admin.username });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /api/admin/grievances - Get all grievances (protected)
router.get('/grievances', authMiddleware, async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { trackingId: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Grievance.countDocuments(filter);
    const grievances = await Grievance.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Stats
    const stats = {
      total: await Grievance.countDocuments(),
      submitted: await Grievance.countDocuments({ status: 'Submitted' }),
      underReview: await Grievance.countDocuments({ status: 'Under Review' }),
      resolved: await Grievance.countDocuments({ status: 'Resolved' }),
      rejected: await Grievance.countDocuments({ status: 'Rejected' }),
    };

    res.json({ grievances, total, stats, page: Number(page), limit: Number(limit) });
  } catch (error) {
    console.error('Get grievances error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/admin/grievances/:id - Update grievance status (protected)
router.patch('/grievances/:id', authMiddleware, async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const allowedStatuses = ['Submitted', 'Under Review', 'Resolved', 'Rejected'];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const update = {};
    if (status) update.status = status;
    if (remarks !== undefined) update.remarks = remarks;

    const grievance = await Grievance.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.json({ message: 'Grievance updated successfully', grievance });
  } catch (error) {
    console.error('Update grievance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

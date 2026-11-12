const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Grievance = require('../models/Grievance');

// POST /api/grievances - Submit a new grievance
router.post(
  '/',
  [
    body('studentName').trim().notEmpty().withMessage('Student name is required'),
    body('studentId').trim().notEmpty().withMessage('Student ID is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
    body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { studentName, studentId, email, department, category, subject, description, priority, isAnonymous } =
        req.body;

      const grievance = new Grievance({
        studentName,
        studentId,
        email,
        department,
        category,
        subject,
        description,
        priority,
        isAnonymous: isAnonymous || false,
      });

      await grievance.save();

      res.status(201).json({
        message: 'Grievance submitted successfully',
        trackingId: grievance.trackingId,
      });
    } catch (error) {
      console.error('Submit grievance error:', error);
      res.status(500).json({ message: 'Server error. Please try again.' });
    }
  }
);

// GET /api/grievances/:id - Track grievance by tracking ID
router.get('/:id', async (req, res) => {
  try {
    const grievance = await Grievance.findOne({ trackingId: req.params.id });

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found. Please check your tracking ID.' });
    }

    // Build response — hide personal info if anonymous
    const response = {
      trackingId: grievance.trackingId,
      department: grievance.department,
      category: grievance.category,
      subject: grievance.subject,
      description: grievance.description,
      priority: grievance.priority,
      status: grievance.status,
      remarks: grievance.remarks,
      submittedAt: grievance.createdAt,
      updatedAt: grievance.updatedAt,
    };

    if (!grievance.isAnonymous) {
      response.studentName = grievance.studentName;
      response.studentId = grievance.studentId;
      response.email = grievance.email;
    } else {
      response.studentName = 'Anonymous';
      response.studentId = 'Hidden';
      response.email = 'Hidden';
    }

    res.json(response);
  } catch (error) {
    console.error('Track grievance error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;

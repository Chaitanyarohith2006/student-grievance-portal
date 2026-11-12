const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const grievanceSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
      default: () => 'GRV-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Academic Issues',
        'Faculty Related Issues',
        'Examination Issues',
        'Infrastructure',
        'Hostel Issues',
        'Transportation',
        'Other',
      ],
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Resolved', 'Rejected'],
      default: 'Submitted',
    },
    remarks: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Grievance', grievanceSchema);

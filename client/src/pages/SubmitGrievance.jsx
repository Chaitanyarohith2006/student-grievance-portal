import { useState } from 'react';
import { CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { submitGrievance } from '../services/api';
import '../styles/SubmitGrievance.css';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Information Technology',
  'Business Administration',
  'Arts & Humanities',
  'Sciences',
  'Other',
];

const CATEGORIES = [
  'Academic Issues',
  'Faculty Related Issues',
  'Examination Issues',
  'Infrastructure',
  'Hostel Issues',
  'Transportation',
  'Other',
];

const initialForm = {
  studentName: '',
  studentId: '',
  email: '',
  department: '',
  category: '',
  subject: '',
  description: '',
  priority: 'Medium',
  isAnonymous: false,
};

const SubmitGrievance = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!form.studentId.trim()) newErrors.studentId = 'Student ID / Roll Number is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.department) newErrors.department = 'Please select your department';
    if (!form.category) newErrors.category = 'Please select a category';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (form.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const res = await submitGrievance(form);
      setSuccess(res.data.trackingId);
      setForm(initialForm);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        'Failed to submit grievance. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="submit-page">
        <div className="success-card">
          <CheckCircle size={48} className="success-icon" />
          <h2>Grievance Submitted Successfully!</h2>
          <p>Your grievance has been registered. Use the tracking ID below to monitor its status.</p>
          <div className="tracking-id-box">
            <span className="tracking-label">Your Tracking ID</span>
            <div className="tracking-id-row">
              <span className="tracking-id">{success}</span>
              <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <p className="success-note">Please save this ID. You will need it to track your grievance.</p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => setSuccess(null)}>Submit Another</button>
            <a href={`/track?id=${success}`} className="btn-outline">Track This Grievance</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-page">
      <div className="form-header">
        <h1>Submit a Grievance</h1>
        <p>Fill in the form below to submit your complaint. All fields marked with * are required.</p>
      </div>

      {serverError && (
        <div className="alert-error">
          <AlertCircle size={16} /> {serverError}
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          {/* Personal Details */}
          <div className="form-section">
            <h3 className="form-section-title">Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="studentName">Student Name *</label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.studentName}
                  onChange={handleChange}
                  className={errors.studentName ? 'input-error' : ''}
                />
                {errors.studentName && <span className="error-msg">{errors.studentName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="studentId">Student ID / Roll Number *</label>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  placeholder="e.g. 21CS001"
                  value={form.studentId}
                  onChange={handleChange}
                  className={errors.studentId ? 'input-error' : ''}
                />
                {errors.studentId && <span className="error-msg">{errors.studentId}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="yourname@college.edu.in"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className={errors.department ? 'input-error' : ''}
                >
                  <option value="">-- Select Department --</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.department && <span className="error-msg">{errors.department}</span>}
              </div>
            </div>
          </div>

          {/* Grievance Details */}
          <div className="form-section">
            <h3 className="form-section-title">Grievance Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Grievance Category *</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={errors.category ? 'input-error' : ''}
                >
                  <option value="">-- Select Category --</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <span className="error-msg">{errors.category}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority Level *</label>
                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Brief subject of your grievance"
                value={form.subject}
                onChange={handleChange}
                className={errors.subject ? 'input-error' : ''}
              />
              {errors.subject && <span className="error-msg">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Detailed Description *</label>
              <textarea
                id="description"
                name="description"
                rows={6}
                placeholder="Provide a detailed description of your grievance (minimum 20 characters)..."
                value={form.description}
                onChange={handleChange}
                className={errors.description ? 'input-error' : ''}
              />
              <span className="char-count">{form.description.length} characters</span>
              {errors.description && <span className="error-msg">{errors.description}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  id="isAnonymous"
                  name="isAnonymous"
                  type="checkbox"
                  checked={form.isAnonymous}
                  onChange={handleChange}
                />
                <span>Submit anonymously (your name and contact details will be hidden from tracking view)</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary submit-btn" id="submit-grievance-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Grievance'}
            </button>
            <button type="reset" className="btn-outline" onClick={() => { setForm(initialForm); setErrors({}); }}>
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitGrievance;

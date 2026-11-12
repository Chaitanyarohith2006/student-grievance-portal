import { useState } from 'react';
import { X, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import '../styles/GrievanceModal.css';

const GrievanceModal = ({ grievance, onClose, onUpdate }) => {
  const [status, setStatus] = useState(grievance.status);
  const [remarks, setRemarks] = useState(grievance.remarks || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await onUpdate(grievance._id, { status, remarks });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update grievance.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>
        <h2 id="modal-title">Grievance Details – {grievance.trackingId}</h2>
        <div className="modal-section">
          <h3>Student Info</h3>
          <p><strong>Name:</strong> {grievance.studentName}</p>
          <p><strong>ID:</strong> {grievance.studentId}</p>
          <p><strong>Department:</strong> {grievance.department}</p>
          <p><strong>Email:</strong> {grievance.email}</p>
        </div>
        <div className="modal-section">
          <h3>Grievance</h3>
          <p><strong>Category:</strong> {grievance.category}</p>
          <p><strong>Subject:</strong> {grievance.subject}</p>
          <p><strong>Description:</strong></p>
          <p className="modal-description">{grievance.description}</p>
        </div>
        <div className="modal-section">
          <h3>Administration</h3>
          <label htmlFor="statusSelect"><strong>Status</strong></label>
          <select id="statusSelect" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <label htmlFor="remarksTextarea"><strong>Remarks</strong></label>
          <textarea
            id="remarksTextarea"
            rows={4}
            placeholder="Add any remarks for the student..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        {error && (
          <div className="modal-error">
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 size={14} className="spin" /> : <CheckCircle2 size={14} />} Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrievanceModal;

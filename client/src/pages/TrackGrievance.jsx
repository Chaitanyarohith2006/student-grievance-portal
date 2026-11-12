import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, AlertCircle, Clock, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { trackGrievance } from '../services/api';
import '../styles/TrackGrievance.css';

const STATUS_STEPS = ['Submitted', 'Under Review', 'Resolved'];

const statusIcon = (status) => {
  if (status === 'Resolved') return <CheckCircle2 size={18} className="status-icon resolved" />;
  if (status === 'Rejected') return <XCircle size={18} className="status-icon rejected" />;
  return <Clock size={18} className="status-icon pending" />;
};

const priorityClass = (priority) => {
  if (priority === 'High') return 'priority-high';
  if (priority === 'Medium') return 'priority-medium';
  return 'priority-low';
};

const TrackGrievance = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setTrackingId(idFromUrl);
      fetchGrievance(idFromUrl);
    }
  }, []);

  const fetchGrievance = async (id) => {
    const tid = id || trackingId;
    if (!tid.trim()) {
      setError('Please enter a tracking ID.');
      return;
    }
    setLoading(true);
    setError('');
    setGrievance(null);
    try {
      const res = await trackGrievance(tid.trim().toUpperCase());
      setGrievance(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Grievance not found. Please check your tracking ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGrievance();
  };

  const getStepStatus = (step) => {
    if (grievance?.status === 'Rejected') {
      return step === 'Submitted' ? 'completed' : step === 'Under Review' ? 'rejected' : 'inactive';
    }
    const idx = STATUS_STEPS.indexOf(step);
    const currentIdx = STATUS_STEPS.indexOf(grievance?.status);
    if (idx < currentIdx) return 'completed';
    if (idx === currentIdx) return 'active';
    return 'inactive';
  };

  return (
    <div className="track-page">
      <div className="track-header">
        <h1>Track Your Grievance</h1>
        <p>Enter your tracking ID to check the current status of your complaint.</p>
      </div>

      <div className="track-search-card">
        <form onSubmit={handleSearch} className="track-search-form">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              id="trackingIdInput"
              type="text"
              placeholder="Enter Tracking ID (e.g. GRV-AB1234)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
            />
          </div>
          <button type="submit" className="btn-primary track-btn" id="track-search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="track-error">
            <AlertCircle size={16} /> {error}
          </div>
        )}
      </div>

      {grievance && (
        <div className="grievance-result">
          {/* Status Progress */}
          <div className="status-card">
            <div className="status-header">
              <div className="tracking-id-label">
                <Eye size={16} /> {grievance.trackingId}
              </div>
              <div className={`status-badge status-${grievance.status.replace(' ', '-').toLowerCase()}`}>
                {statusIcon(grievance.status)} {grievance.status}
              </div>
            </div>

            {grievance.status !== 'Rejected' ? (
              <div className="progress-steps">
                {STATUS_STEPS.map((step, i) => (
                  <div key={step} className="step-wrapper">
                    <div className={`progress-step ${getStepStatus(step)}`}>
                      <div className="step-circle">{i + 1}</div>
                      <span className="step-label">{step}</span>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`step-line ${getStepStatus(STATUS_STEPS[i + 1]) !== 'inactive' ? 'completed' : ''}`} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rejected-notice">
                <XCircle size={16} /> This grievance has been rejected. Please check the remarks below.
              </div>
            )}
          </div>

          {/* Grievance Details */}
          <div className="detail-card">
            <h3>Grievance Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Student Name</span>
                <span className="detail-value">{grievance.studentName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Student ID</span>
                <span className="detail-value">{grievance.studentId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Department</span>
                <span className="detail-value">{grievance.department}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category</span>
                <span className="detail-value">{grievance.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Priority</span>
                <span className={`detail-value priority-badge ${priorityClass(grievance.priority)}`}>
                  {grievance.priority}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Submitted On</span>
                <span className="detail-value">
                  {new Date(grievance.submittedAt).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'long', year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="detail-full">
              <span className="detail-label">Subject</span>
              <p className="detail-text">{grievance.subject}</p>
            </div>

            <div className="detail-full">
              <span className="detail-label">Description</span>
              <p className="detail-text">{grievance.description}</p>
            </div>

            {grievance.remarks && (
              <div className="detail-full remarks-box">
                <span className="detail-label">Admin Remarks</span>
                <p className="detail-text">{grievance.remarks}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackGrievance;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, getAdminGrievances, updateGrievance } from '../services/api';
import GrievanceModal from '../components/GrievanceModal';
import '../styles/AdminDashboard.css';
import { Search, Filter, ClipboardCheck, Loader2, RefreshCw } from 'lucide-react';

const statusOptions = ['All', 'Submitted', 'Under Review', 'Resolved', 'Rejected'];
const categoryOptions = ['All', 'Academic Issues', 'Faculty Related Issues', 'Examination Issues', 'Infrastructure', 'Hostel Issues', 'Transportation', 'Other'];

const AdminDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ status: 'All', category: 'All', search: '' });
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status && filters.status !== 'All') params.status = filters.status;
      if (filters.category && filters.category !== 'All') params.category = filters.category;
      if (filters.search) params.search = filters.search;
      params.page = page;
      params.limit = limit;

      const res = await getAdminGrievances(params);
      setGrievances(res.data.grievances);
      setStats(res.data.stats);
    } catch (err) {
      console.error('Error fetching admin grievances', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters, page]);

  const handleRefresh = () => {
    fetchData();
  };

  const handleOpenModal = (grievance) => {
    setSelected(grievance);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  const handleUpdate = async (id, updates) => {
    try {
      await updateGrievance(id, updates);
      // Refresh data after update
      fetchData();
      handleCloseModal();
    } catch (err) {
      console.error('Update error', err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <ClipboardCheck size={24} className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Total Grievances</span>
            <span className="stat-value">{stats.total || 0}</span>
          </div>
        </div>
        <div className="stat-card">
          <Loader2 size={24} className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Pending (Submitted)</span>
            <span className="stat-value">{stats.submitted || 0}</span>
          </div>
        </div>
        <div className="stat-card">
          <RefreshCw size={24} className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Under Review</span>
            <span className="stat-value">{stats.underReview || 0}</span>
          </div>
        </div>
        <div className="stat-card">
          <ClipboardCheck size={24} className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Resolved</span>
            <span className="stat-value">{stats.resolved || 0}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-group">
          <label htmlFor="statusFilter">Status</label>
          <select name="status" id="statusFilter" value={filters.status} onChange={handleFilterChange}>
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="categoryFilter">Category</label>
          <select name="category" id="categoryFilter" value={filters.category} onChange={handleFilterChange}>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="filter-group search-group">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            name="search"
            placeholder="Search…"
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
        </div>
        <button className="btn-primary refresh-btn" onClick={handleRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Grievance Table */}
      <div className="table-container">
        <table className="grievance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Dept</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="loading-row">Loading...</td>
              </tr>
            ) : grievances.length > 0 ? (
              grievances.map((g) => (
                <tr key={g._id}>
                  <td>{g.trackingId}</td>
                  <td>{g.studentName}</td>
                  <td>{g.department}</td>
                  <td>{g.category}</td>
                  <td>{g.subject}</td>
                  <td className={`priority-badge ${g.priority.toLowerCase()}`}>{g.priority}</td>
                  <td className={`status-badge ${g.status.replace(/\s+/g, '-').toLowerCase()}`}>{g.status}</td>
                  <td>{new Date(g.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-outline" onClick={() => handleOpenModal(g)}>
                      View / Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">No grievances found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <GrievanceModal
          grievance={selected}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

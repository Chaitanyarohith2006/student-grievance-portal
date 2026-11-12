import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-brand">
            <GraduationCap size={20} />
            <span>Student Grievance Portal</span>
          </div>
          <p className="footer-desc">
            A transparent and efficient platform for students to raise and track their grievances with the college administration.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/submit">Submit Grievance</Link></li>
            <li><Link to="/track">Track Grievance</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><Mail size={14} /> grievance@college.edu.in</li>
            <li><Phone size={14} /> +91 98765 43210</li>
            <li><MapPin size={14} /> Student Affairs Office, Admin Block</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Student Grievance Redressal Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

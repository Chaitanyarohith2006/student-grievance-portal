import { Link } from 'react-router-dom';
import { FileText, Search, CheckCircle, ChevronRight } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Official Student Grievance System</div>
          <h1>Student Grievance Redressal Portal</h1>
          <p>
            A dedicated platform for students to submit, track, and resolve grievances with the college
            administration. We are committed to transparent, timely, and fair resolution of all concerns.
          </p>
          <div className="hero-actions">
            <Link to="/submit" className="btn-primary" id="hero-submit-btn">
              Submit a Grievance <ChevronRight size={16} />
            </Link>
            <Link to="/track" className="btn-outline" id="hero-track-btn">
              Track My Grievance
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <h2>Why Use This Portal?</h2>
          <p className="features-subtitle">
            Our grievance system ensures every student complaint is heard, documented, and addressed properly.
          </p>
          <div className="feature-cards">
            <div className="feature-card" id="feature-submission">
              <div className="feature-icon">
                <FileText size={28} />
              </div>
              <h3>Easy Complaint Submission</h3>
              <p>
                Fill out a simple form with details about your grievance. Submit anonymously if preferred.
                Your complaint is immediately registered in the system.
              </p>
            </div>

            <div className="feature-card" id="feature-tracking">
              <div className="feature-icon">
                <Search size={28} />
              </div>
              <h3>Transparent Tracking</h3>
              <p>
                Every grievance receives a unique tracking ID. Use it to monitor the status of your complaint
                from submission to resolution — anytime, anywhere.
              </p>
            </div>

            <div className="feature-card" id="feature-resolution">
              <div className="feature-icon">
                <CheckCircle size={28} />
              </div>
              <h3>Timely Resolution</h3>
              <p>
                Grievances are reviewed by the administration promptly. You will see status updates and
                official remarks once your issue has been addressed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="hiw-container">
          <h2>How It Works</h2>
          <div className="hiw-steps">
            <div className="hiw-step">
              <div className="step-number">1</div>
              <h4>Submit Your Grievance</h4>
              <p>Fill in the complaint form with your details and issue description.</p>
            </div>
            <div className="hiw-arrow">→</div>
            <div className="hiw-step">
              <div className="step-number">2</div>
              <h4>Get a Tracking ID</h4>
              <p>Receive a unique ID to monitor your complaint status.</p>
            </div>
            <div className="hiw-arrow">→</div>
            <div className="hiw-step">
              <div className="step-number">3</div>
              <h4>Administration Reviews</h4>
              <p>The concerned department reviews and acts on your complaint.</p>
            </div>
            <div className="hiw-arrow">→</div>
            <div className="hiw-step">
              <div className="step-number">4</div>
              <h4>Issue Resolved</h4>
              <p>Receive the resolution remarks and confirmation of closure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Have a Concern?</h2>
          <p>Don't hesitate. Your feedback helps improve the college for everyone.</p>
          <Link to="/submit" className="btn-primary" id="cta-submit-btn">
            File a Grievance Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

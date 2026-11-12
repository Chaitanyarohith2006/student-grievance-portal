import { Target, Users, FileCheck, MessageSquare } from 'lucide-react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About the Grievance Portal</h1>
        <p>Understanding the purpose, importance, and functioning of the Student Grievance Redressal System.</p>
      </div>

      <div className="about-container">
        <section className="about-section">
          <div className="about-icon"><Target size={28} /></div>
          <div>
            <h2>Purpose of the Portal</h2>
            <p>
              The Student Grievance Redressal Portal has been established by the college administration
              to provide students with a formal, accessible, and transparent mechanism to report and
              resolve complaints related to academic, administrative, or infrastructural matters.
            </p>
            <p>
              Every student deserves a safe and effective avenue to voice their concerns. This portal
              ensures that no grievance goes unheard, and that each complaint is registered, reviewed,
              and responded to by the appropriate authority within a reasonable timeframe.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-icon"><Users size={28} /></div>
          <div>
            <h2>Importance of Student Feedback</h2>
            <p>
              Student feedback is essential for the continuous improvement of the institution. When
              students actively report issues — whether related to curriculum delivery, faculty conduct,
              examination irregularities, or campus facilities — it allows the administration to identify
              gaps and take corrective action swiftly.
            </p>
            <p>
              An effective grievance mechanism reflects the college's commitment to student welfare
              and to maintaining a healthy, respectful academic environment.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-icon"><FileCheck size={28} /></div>
          <div>
            <h2>Transparency in Complaint Handling</h2>
            <p>
              Every grievance submitted through this portal is assigned a unique tracking ID. Students
              can use this ID to monitor the status of their complaint at any time — without needing to
              follow up in person or contact any office separately.
            </p>
            <p>
              Complaints progress through clearly defined stages:
            </p>
            <ol className="about-list">
              <li><strong>Submitted</strong> — The complaint has been recorded in the system.</li>
              <li><strong>Under Review</strong> — The administration is examining the complaint.</li>
              <li><strong>Resolved</strong> — The issue has been addressed and officially closed.</li>
            </ol>
            <p>
              In cases where a complaint cannot be acted upon, it is marked as <strong>Rejected</strong>
              with a reason provided in the admin remarks.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-icon"><MessageSquare size={28} /></div>
          <div>
            <h2>Improving Communication</h2>
            <p>
              Traditionally, students had to visit multiple offices in person to file complaints, often
              with little assurance of follow-up. This portal digitalises the entire process — from
              submission to resolution — making it faster, more organised, and fully documented.
            </p>
            <p>
              Administrators gain a central dashboard to manage all complaints, filter by status and
              category, and add resolution remarks. This reduces administrative overhead while improving
              accountability.
            </p>
            <p>
              Ultimately, the portal bridges the communication gap between students and college management,
              fostering a more responsive and student-friendly institution.
            </p>
          </div>
        </section>

        {/* Guidelines */}
        <div className="guidelines-box">
          <h3>Grievance Filing Guidelines</h3>
          <ul>
            <li>Submit grievances only for genuine issues. Misuse of the system may lead to disciplinary action.</li>
            <li>Provide accurate and complete information to ensure faster resolution.</li>
            <li>One grievance per issue. For multiple unrelated issues, submit separate forms.</li>
            <li>Rude, abusive, or threatening language in submissions will not be accepted.</li>
            <li>Anonymous submissions are permitted but may limit the administration's ability to follow up.</li>
            <li>Keep your tracking ID safe — it cannot be recovered once lost.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

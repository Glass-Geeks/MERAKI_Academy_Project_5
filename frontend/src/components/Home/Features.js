import React from 'react';
import './Home.css';

const Features = () => {
  return (
    <div className="features-section">
      <h2>Key Features</h2>
      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Find Classmates</h3>
          <p>Search and connect with classmates from your school or classes.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3>Alumni Network</h3>
          <p>Stay in touch with alumni and expand your professional network.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Study Groups</h3>
          <p>Join or create study groups to collaborate and learn together.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎉</div>
          <h3>Events</h3>
          <p>Attend events organized by your school or fellow classmates.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;

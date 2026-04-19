import React from "react";
import "./LandingPage.css";

export default function Landing() {
  return (
    <div className="landing">
      <h1 className="title">Welcome to Crime Station</h1>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Criminal Records Management System</h1>
          <p>
            Securely manage, track, and analyze criminal records with a powerful,
            modern interface built for law enforcement agencies.
          </p>
          <div className="hero-buttons">
            <a href="/criminals" className="primary-btn">Get Started</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>Search Criminals</h3>
          <p>Quickly find records using advanced filters and search tools.</p>
        </div>

        <div className="feature-card">
          <h3>Secure Database</h3>
          <p>Highly secure storage with role-based access and encryption.</p>
        </div>

        <div className="feature-card">
          <h3>Real-time Updates</h3>
          <p>Instant updates to criminal records and activity logs.</p>
        </div>

        <div className="feature-card">
          <h3>Reports & Analytics</h3>
          <p>Generate insights and reports for better decision making.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Manage Criminal Records Efficiently?</h2>
        <a href="/criminals" className="primary-btn">Access Dashboard</a>
      </section>

      <footer className="footer">
        © 2026 CrimeStation. All rights reserved.
      </footer>
    </div>
  );
}
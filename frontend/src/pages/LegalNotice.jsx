import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LegalNotice.css";

function LegalNotice() {
  useEffect(() => {
    document.title = "Privacy Policy :: Malaysia Electronic Visa Facilitation & Services (eVISA)";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="my-privacy-page">
      <div className="my-privacy-container">
        {/* Breadcrumbs: HOME / Privacy Policy */}
        <nav className="my-privacy-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="my-privacy-breadcrumb__link">
            HOME
          </Link>
          <span className="my-privacy-breadcrumb__sep">/</span>
          <span className="my-privacy-breadcrumb__current">Privacy Policy</span>
        </nav>

        {/* Header Block */}
        <header className="my-privacy-header">
          <div className="my-privacy-badge">LAST UPDATED: 28th of April 2026</div>
          <h1 className="my-privacy-title">Privacy Policy</h1>
          <p className="my-privacy-subtitle">
            Malaysia Electronic Visa Facilitation &amp; Services (eVISA) System.
          </p>
        </header>

        {/* Content Body */}
        <div className="my-privacy-card">
          {/* Section 1 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">1. Introduction</h2>
            <p>
              The Malaysia Electronic Visa Facilitation &amp; Services (eVISA) System ("the System") is committed to protecting the privacy and personal data of all users. This Privacy Policy explains how personal data is collected, used, disclosed, and safeguarded when users access or use the System.
            </p>
            <p>
              By using the System, users agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">2. Collection of Personal Data</h2>
            <p>
              The System may collect personal data necessary for visa processing and related services, including but not limited to:
            </p>
            <ul className="my-privacy-list">
              <li>Full name, nationality, date of birth, passport details and address</li>
              <li>Contact information (email address, phone number)</li>
              <li>Supporting documents (itinerary, proof of financial support, accommodation details, etc.)</li>
              <li>Facial images (selfie or uploaded photograph) for identity verification purposes</li>
              <li>Payment and transaction details</li>
              <li>System usage data (IP address, browser type, access logs)</li>
            </ul>
            <p>
              All data collected is limited to what is necessary for lawful and operational purposes.
            </p>
          </section>

          {/* Section 3 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">3. Purpose of Data Collection</h2>
            <p>Personal data is collected and processed for the following purposes:</p>
            <ul className="my-privacy-list">
              <li>Processing and managing visa applications</li>
              <li>Identity verification, including verification using facial images to match applicants against submitted travel documents</li>
              <li>Payment processing and transaction verification</li>
              <li>System administration, monitoring, and security</li>
              <li>Compliance with legal and regulatory requirements</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">4. Disclosure of Personal Data</h2>
            <p>
              Personal data may be shared with authorized parties where necessary, including:
            </p>
            <ul className="my-privacy-list">
              <li>Malaysian government agencies and immigration authorities</li>
              <li>Payment service providers for transaction processing</li>
              <li>Law enforcement or regulatory bodies when required by law</li>
            </ul>
            <p>
              This may include facial images where necessary for identity verification and visa processing by authorized government entities.
            </p>
            <p>
              All disclosures are conducted in accordance with applicable laws and only when necessary.
            </p>
          </section>

          {/* Section 5 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">5. Data Security</h2>
            <p>
              The System implements appropriate technical and organizational measures to protect personal data against unauthorized access, loss, misuse, or alteration. These measures include:
            </p>
            <ul className="my-privacy-list">
              <li>Secure data transmission (encryption via HTTPS/TLS)</li>
              <li>Access control and authentication mechanisms</li>
              <li>Role-based access permissions</li>
              <li>Regular system monitoring and security audits</li>
            </ul>
            <p>
              All personal data, including facial images, is stored securely within a controlled infrastructure environment.
            </p>
          </section>

          {/* Section 6 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">6. Data Storage</h2>
            <p>
              All uploaded files and facial images are stored in a secure, self-hosted object storage system that serves as the System's file storage server.
            </p>
            <p>This storage has the following characteristics:</p>
            <ul className="my-privacy-list">
              <li>Not publicly accessible</li>
              <li>Protected by secure backend access controls</li>
              <li>Accessible only by authorized systems and personnel</li>
              <li>Secured through encrypted transmission and authentication mechanisms</li>
            </ul>
            <p>
              No facial data is retained on the user's device beyond the time required for submission.
            </p>
          </section>

          {/* Section 7 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">7. Use of Facial Data</h2>
            <p>
              The System may collect and process facial images provided by users for identity verification as part of the visa application process, including:
            </p>
            <ul className="my-privacy-list">
              <li>Matching the applicant's facial image with the passport or travel document</li>
              <li>Supporting review and approval processes by authorized personnel</li>
            </ul>
            <p>The System will not use facial data for:</p>
            <ul className="my-privacy-list">
              <li>Advertising or marketing purposes</li>
              <li>User profiling or behavioral analysis</li>
              <li>Analytics or tracking unrelated to visa processing</li>
            </ul>
            <p>
              Facial data will not be shared with any third party except where required for official visa processing by authorized government agencies.
            </p>
          </section>

          {/* Section 8 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">8. Cookies and Tracking Technologies</h2>
            <p>
              The System may use cookies and similar technologies to enhance user experience, analyze system usage, and improve services. Users may manage cookie preferences through their browser settings.
            </p>
          </section>

          {/* Section 9 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">9. Third-Party Links</h2>
            <p>
              The System may contain links to external websites. This Privacy Policy does not apply to those third-party sites, and users are advised to review their respective privacy policies.
            </p>
          </section>

          {/* Section 10 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">10. Data Retention</h2>
            <p>
              Personal data, including facial images, will be retained only for as long as necessary to:
            </p>
            <ul className="my-privacy-list">
              <li>Complete visa processing</li>
              <li>Fulfill audit and regulatory requirements</li>
              <li>Comply with applicable laws</li>
            </ul>
            <p>
              When the data is no longer required, it will be securely deleted or archived in accordance with internal data retention policies and legal requirements.
            </p>
          </section>

          {/* Section 11 */}
          <section className="my-privacy-section">
            <h2 className="my-privacy-sec-title">11. Changes to This Privacy Policy</h2>
            <p>
              This Privacy Policy may be updated from time to time to reflect changes in legal, technical, or operational requirements. Users will be notified of any material changes through appropriate channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LegalNotice;

import React, { useState } from "react";
import "../styles/SecurityForm.css";

function SecurityForm({ onContinue, onCancel, onOpenFaq }) {
  const [isChecked, setIsChecked] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      setHasError(true);
      window.scrollTo({ top: 150, behavior: "smooth" });
    } else {
      setHasError(false);
      onContinue();
    }
  };

  return (
    <div className="my-sec">
      <div className="my-sec__heading">
        <span className="my-sec__badge">STEP 1 OF 2: SECURITY & TERMS</span>
        <h1 className="my-sec__title">eVISA Verification Terms & Privacy Protocol</h1>
        <p className="my-sec__subtitle">Jabatan Imigresen Malaysia :: Online Verification Security Notice</p>
      </div>

      <div className="my-sec__quick-links">
        <button type="button" onClick={onOpenFaq} className="my-sec__link-btn">
          Need Help? View FAQ
        </button>{" "}
        | <span className="my-sec__active-step">Verification Security Agreement</span>
      </div>

      {hasError && (
        <div className="my-alert my-alert--error" role="alert">
          <div className="my-alert__header">
            <span className="my-alert__icon">⚠️</span>
            <strong>Agreement Required to Proceed</strong>
          </div>
          <p className="my-alert__body">
            You must read and acknowledge the official terms and conditions of the Malaysia eVISA Verification System to continue.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="my-sec__form">
        <div className="my-sec__card">
          <div className="my-sec__card-header">
            <img src="/jim_logo.png" alt="Jabatan Imigresen Malaysia Crest" className="my-sec__crest" />
            <div>
              <h3 className="my-sec__card-title">Certification of Authority & System Notice</h3>
              <p className="my-sec__card-sub">Please review the official usage conditions carefully</p>
            </div>
          </div>

          <div className="my-sec__card-body">
            <section className="my-sec__section">
              <h4 className="my-sec__section-title">1. Legal Authority to Access Visa Records</h4>
              <p>
                By proceeding to access the eVISA Verification Portal, you solemnly declare that you are the lawful visa applicant,
                or an authorized representative (such as an educational institution, sponsoring employer, or accredited legal agent)
                who has received express written or verbal authorization from the visa holder to query these records.
              </p>
            </section>

            <section className="my-sec__section">
              <h4 className="my-sec__section-title">2. Personal Data Protection & Privacy Compliance</h4>
              <p>
                All personal particulars, passport identification records, and immigration decision records queried through this service
                are protected in accordance with the Malaysian Personal Data Protection regulations. Unauthorized queries, automated scraping,
                or deceptive impersonation constitutes an offense.
              </p>
            </section>

            <section className="my-sec__section">
              <h4 className="my-sec__section-title">3. Document Validity & Traveler Responsibilities</h4>
              <p>
                An issued eVISA constitutes official entry clearance; however, final admission into Malaysia remains subject to verification
                by the Immigration Officer on duty at the point of entry. Travelers must present their passport (minimum 6 months validity),
                printed eVISA note, confirmed return flight ticket, and sufficient funds upon arrival.
              </p>
            </section>

            {/* Checkbox confirmation */}
            <div className={`my-sec__check-box ${hasError ? "my-sec__check-box--error" : ""}`}>
              <label className="my-sec__label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                    if (e.target.checked) setHasError(false);
                  }}
                  className="my-sec__checkbox"
                />
                <span className="my-sec__label-text">
                  <strong>I have read, understood, and accept</strong> the Terms of Use, Privacy Protocol, and Traveler
                  Responsibilities of the Malaysia eVISA Verification Portal.
                </span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="my-sec__actions">
            <button type="submit" className="my-btn my-btn--primary">
              Continue to Login & Verification &rarr;
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="my-btn my-btn--secondary"
            >
              Cancel / Back to Home
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SecurityForm;

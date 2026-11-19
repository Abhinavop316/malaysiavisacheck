import React, { useState } from "react";
import "../styles/IdentificationForm.css";

const helpTopics = {
  email: "Enter the email address registered with your Malaysia eVISA application.",
  password: "Enter the password or security access key provided by the administration.",
};

function IdentificationForm({ onSubmitIdent, onBack, onOpenFaq, isLoading = false, apiError = "" }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeHelp, setActiveHelp] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMsg("Please enter both your registered Email Address and Password to log in.");
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }
    onSubmitIdent(formData);
  };

  const activeError = errorMsg || apiError;

  return (
    <div className="my-ident">
      <div className="my-ident__heading">
        <span className="my-ident__badge">STEP 2 OF 2: APPLICANT AUTHENTICATION</span>
        <h1 className="my-ident__title">eVISA Application Status Inquiry</h1>
        <p className="my-ident__subtitle">Jabatan Imigresen Malaysia :: Official Central Registry Access</p>
      </div>

      <div className="my-ident__quick-links">
        <button type="button" onClick={onOpenFaq} className="my-ident__link-btn">
          Need Assistance? View FAQ
        </button>{" "}
        | <span className="my-ident__active-step">User Access Authentication</span>
      </div>

      <div className="my-notice-box">
        <div className="my-notice-box__icon">ℹ️</div>
        <div className="my-notice-box__text">
          Enter your registered Email Address and the authorization Password issued by the administration to view, verify, and print your official Malaysia eVISA details.
        </div>
      </div>

      {activeError && (
        <div className="my-alert my-alert--error" role="alert">
          <div className="my-alert__header">
            <span className="my-alert__icon">⚠️</span>
            <strong>Authentication Error:</strong>
          </div>
          <p className="my-alert__body">{activeError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="my-ident__form">
        <div className="my-ident__card">
          <div className="my-ident__card-header">
            <div className="my-ident__card-brand">
              <img src="/jim_logo.png" alt="Jabatan Imigresen Malaysia Crest" className="my-ident__crest" />
              <div>
                <h3 className="my-ident__card-title">Applicant Login Terminal</h3>
                <span className="my-ident__card-sub">Secure Encrypted Portal</span>
              </div>
            </div>
            <div className="my-ident__secure-tag">
              <svg viewBox="0 0 20 20" fill="currentColor" className="my-lock-icon">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              SSL 256-Bit Encrypted
            </div>
          </div>

          <div className="my-ident__card-body">
            {/* Email Field */}
            <div className="my-field">
              <div className="my-field__label-row">
                <label htmlFor="client-email" className="my-field__label">
                  Registered Email Address <span className="my-field__req">*</span>
                </label>
                <button
                  type="button"
                  className="my-field__help-btn"
                  onClick={() => setActiveHelp(activeHelp === "email" ? null : "email")}
                >
                  {activeHelp === "email" ? "Hide Help" : "Help (?)"}
                </button>
              </div>

              {activeHelp === "email" && (
                <div className="my-field__help-box">
                  {helpTopics.email}
                </div>
              )}

              <input
                id="client-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="e.g. applicant@example.com"
                className="my-field__input"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="my-field">
              <div className="my-field__label-row">
                <label htmlFor="client-password" className="my-field__label">
                  Application Password / Access Key <span className="my-field__req">*</span>
                </label>
                <button
                  type="button"
                  className="my-field__help-btn"
                  onClick={() => setActiveHelp(activeHelp === "password" ? null : "password")}
                >
                  {activeHelp === "password" ? "Hide Help" : "Help (?)"}
                </button>
              </div>

              {activeHelp === "password" && (
                <div className="my-field__help-box">
                  {helpTopics.password}
                </div>
              )}

              <div className="my-field__input-wrap">
                <input
                  id="client-password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your security password"
                  className="my-field__input"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="my-field__toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div className="my-ident__card-footer">
            <button
              type="submit"
              className="my-btn my-btn--primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="my-spinner"></span>
                  Querying eVISA Registry...
                </>
              ) : (
                "Inquire eVISA Record →"
              )}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="my-btn my-btn--secondary"
              disabled={isLoading}
            >
              ← Back to Terms
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default IdentificationForm;

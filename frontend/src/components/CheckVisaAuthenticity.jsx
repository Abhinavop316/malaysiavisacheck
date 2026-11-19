import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CheckVisaAuthenticity.css";

// Helper to generate realistic colorful captcha characters matching the screenshot
const generateRandomCaptcha = () => {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  const colors = ["#2d7a4f", "#1e293b", "#047857", "#0f172a", "#15803d", "#334155"];
  
  const result = [];
  let plain = "";

  for (let i = 0; i < 6; i++) {
    const char = chars.charAt(Math.floor(Math.random() * chars.length));
    plain += char;
    result.push({
      char,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.floor(Math.random() * 20) - 10,
      isSuperscript: i === 4 && Math.random() > 0.4,
      weight: Math.random() > 0.5 ? "700" : "500",
    });
  }

  return { plain, items: result };
};

function CheckVisaAuthenticity({ onCheck, isLoading = false, apiError = "" }) {
  const [passportNumber, setPassportNumber] = useState("");
  const [stickerNumber, setStickerNumber] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaData, setCaptchaData] = useState(() => generateRandomCaptcha());
  const [formError, setFormError] = useState("");

  useEffect(() => {
    document.title = "Check eVISA Authenticity :: JABATAN IMIGRESEN MALAYSIA";
  }, []);

  const regenerateCaptcha = () => {
    setCaptchaData(generateRandomCaptcha());
    setUserCaptcha("");
  };

  const handleReset = () => {
    setPassportNumber("");
    setStickerNumber("");
    setUserCaptcha("");
    setFormError("");
    regenerateCaptcha();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!passportNumber.trim()) {
      setFormError("Please enter your Passport/Document Number.");
      return;
    }

    if (!stickerNumber.trim()) {
      setFormError("Please enter your Sticker Number.");
      return;
    }

    if (!userCaptcha.trim()) {
      setFormError("Please enter the verification Captcha code.");
      return;
    }

    if (userCaptcha.trim().toLowerCase() !== captchaData.plain.toLowerCase()) {
      setFormError("Invalid Captcha code entered. Please type the characters shown in the image.");
      regenerateCaptcha();
      return;
    }

    onCheck({
      passportNumber: passportNumber.trim(),
      stickerNumber: stickerNumber.trim(),
    });
  };

  const activeError = formError || apiError;

  return (
    <div className="my-auth-page">
      {/* 1. TOP BANNER: Exact image provided by user (no HTML text overlay) */}
      <div className="my-auth-banner">
        <img
          src="/check_visa_banner.jpg"
          alt="Check eVISA Authenticity"
          className="my-auth-banner-img"
        />
      </div>

      <div className="my-auth-container">
        {/* 2. BREADCRUMBS: 🏠 / Check eVISA Authenticity */}
        <nav className="my-auth-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="my-auth-breadcrumb__link" title="Home">
            <svg viewBox="0 0 24 24" fill="currentColor" className="my-auth-home-icon">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </Link>
          <span className="my-auth-breadcrumb__sep">/</span>
          <span className="my-auth-breadcrumb__current">Check eVISA Authenticity</span>
        </nav>

        {/* 3. VERIFY YOUR eVISA FORM CARD */}
        <form onSubmit={handleSubmit} className="my-auth-form">
          <div className="my-auth-card">
            {/* Header bar in solid dark navy */}
            <div className="my-auth-card__header">
              <h2 className="my-auth-card__title">Verify Your eVISA</h2>
            </div>

            <div className="my-auth-card__body">
              {activeError && (
                <div className="my-auth-alert" role="alert">
                  <span className="my-auth-alert__icon">⚠️</span>
                  <span>{activeError}</span>
                </div>
              )}

              {/* Row 1: Passport Number + Sticker Number */}
              <div className="my-auth-row">
                <div className="my-auth-field">
                  <label htmlFor="passportNumber" className="my-auth-label">
                    Passport/Document Number <span className="my-auth-req">*</span>
                    <span
                      className="my-auth-info-btn"
                      title="Enter your passport or official travel document number"
                    >
                      ?
                    </span>
                  </label>
                  <input
                    id="passportNumber"
                    type="text"
                    className="my-auth-input"
                    value={passportNumber}
                    onChange={(e) => {
                      setPassportNumber(e.target.value);
                      setFormError("");
                    }}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="my-auth-field">
                  <label htmlFor="stickerNumber" className="my-auth-label">
                    Sticker Number <span className="my-auth-req">*</span>
                    <span
                      className="my-auth-info-btn"
                      title="Enter the Sticker Number printed on your eVISA note"
                    >
                      ?
                    </span>
                  </label>
                  <input
                    id="stickerNumber"
                    type="text"
                    className="my-auth-input"
                    value={stickerNumber}
                    onChange={(e) => {
                      setStickerNumber(e.target.value);
                      setFormError("");
                    }}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Captcha visual + Captcha input */}
              <div className="my-auth-row my-auth-row--captcha">
                <div className="my-auth-field my-auth-field--captcha-display">
                  <div
                    className="my-auth-captcha-box"
                    onClick={regenerateCaptcha}
                    title="Click to generate a new Captcha"
                  >
                    {captchaData.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="my-auth-captcha-char"
                        style={{
                          color: item.color,
                          transform: `rotate(${item.rotate}deg)`,
                          fontSize: item.isSuperscript ? "1.05rem" : "1.4rem",
                          fontWeight: item.weight,
                        }}
                      >
                        {item.char}
                      </span>
                    ))}
                    <button
                      type="button"
                      className="my-auth-captcha-refresh-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        regenerateCaptcha();
                      }}
                      title="Refresh Captcha"
                      aria-label="Refresh Captcha"
                    >
                      ↻
                    </button>
                  </div>
                </div>

                <div className="my-auth-field">
                  <label htmlFor="captchaInput" className="my-auth-label">
                    Captcha <span className="my-auth-req">*</span>
                  </label>
                  <input
                    id="captchaInput"
                    type="text"
                    className="my-auth-input my-auth-input--captcha"
                    value={userCaptcha}
                    onChange={(e) => {
                      setUserCaptcha(e.target.value);
                      setFormError("");
                    }}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Centered Action Buttons: Reset & Check */}
          <div className="my-auth-actions">
            <button
              type="button"
              className="my-auth-btn my-auth-btn--reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="my-auth-btn my-auth-btn--check"
              disabled={isLoading}
            >
              {isLoading ? "Checking..." : "Check"}
            </button>
          </div>
        </form>
      </div>

      {/* 4. FLOATING SUPPORT AGENT BUTTON */}
      <button
        type="button"
        className="my-auth-floating-agent"
        onClick={() =>
          alert(
            "Official Malaysia eVISA Support: For authenticity verification assistance, contact support@imi.gov.my or hotline +60 3-8000 8000."
          )
        }
        title="Live Immigration Support Agent"
        aria-label="Live Immigration Support Agent"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="my-auth-agent-icon">
          <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h3c.55 0 1.05-.15 1.48-.41A2.99 2.99 0 0 0 21 17v-7a9 9 0 0 0-9-9z" />
        </svg>
      </button>
    </div>
  );
}

export default CheckVisaAuthenticity;

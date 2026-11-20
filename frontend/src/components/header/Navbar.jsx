import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/header/Navbar.css";

function Navbar({ onLoginClick, onOpenFaq, isAdminLoggedIn = false, onAdminLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isCheckVisaActive = location.pathname.startsWith("/check-visa") || location.pathname.startsWith("/client-application-status");

  // Close mobile menu whenever location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePhotoRequirementsClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById("photo-requirements");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("photo-requirements");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  };

  return (
    <header className="my-header">
      {/* Top Brand Bar (White) */}
      <div className="my-header__top-bar">
        <div className="my-header__top-inner">
          {/* Left: Jabatan Imigresen Malaysia Logo & Dept Name */}
          <Link to="/" className="my-header__brand-left" aria-label="Jabatan Imigresen Malaysia">
            <img
              src="/jim_logo.png"
              alt="Jabatan Imigresen Malaysia Crest"
              className="my-header__jim-crest"
            />
            <div className="my-header__jim-text">
              <span className="my-header__jim-title">JABATAN IMIGRESEN MALAYSIA</span>
              <span className="my-header__jim-sub">IMMIGRATION DEPARTMENT OF MALAYSIA</span>
            </div>
          </Link>

          {/* Right: MYVISA Logo */}
          <div className="my-header__brand-right">
            <img
              src="/myvisa_logo.png"
              alt="MYVISA Malaysia Visa Logo"
              className="my-header__myvisa-logo"
            />
          </div>
        </div>
      </div>

      {/* Sub Navbar (Light Pale Cyan #E6F3F8) */}
      <nav className="my-header__nav" aria-label="Portal Navigation">
        <div className="my-header__nav-inner">
          {/* Mobile Status Label (Only visible on mobile <= 768px) */}
          <div className="my-header__mobile-status-pill">
            <span className="my-header__status-indicator"></span>
            <span>eVISA Portal</span>
          </div>

          {/* Desktop Links (Hidden on mobile <= 768px via CSS) */}
          <div className="my-header__nav-links">
            <Link to="/" className="my-header__nav-item my-header__nav-item--home" title="Home">
              <svg viewBox="0 0 24 24" fill="currentColor" className="my-header__home-icon">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </Link>

            <Link
              to="/check-visa"
              className={`my-header__nav-item ${isCheckVisaActive ? "my-header__nav-item--active-sub" : ""}`}
            >
              eVISA Status Check
            </Link>

            <a
              href="#photo-requirements"
              className="my-header__nav-item"
              onClick={handlePhotoRequirementsClick}
            >
              Photo Requirements
            </a>

            <button
              type="button"
              className="my-header__nav-item"
              onClick={onOpenFaq}
            >
              FAQ
            </button>

            <Link
              to="/privacy-policy"
              className={`my-header__nav-item ${location.pathname === "/privacy-policy" ? "my-header__nav-item--active-sub" : ""}`}
            >
              Privacy Policy
            </Link>
          </div>

          {/* Right Controls: Login Button ALWAYS visible + 3-Bar Hamburger on mobile */}
          <div className="my-header__right-controls">
            {/* Login / Admin Button */}
            <div className="my-header__auth-slot">
              {isAdminLoggedIn ? (
                <div className="my-header__admin-pill-group">
                  <Link
                    to="/admin"
                    className="my-header__login-btn my-header__login-btn--active"
                    title="Immigration Officer Portal"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="my-header__lock-icon">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
                    </svg>
                    <span>Admin Portal</span>
                  </Link>
                  <button
                    type="button"
                    onClick={onAdminLogout}
                    className="my-header__logout-btn"
                    title="Exit Admin Session"
                  >
                    Exit
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin-login"
                  className="my-header__login-btn"
                  title="Immigration Officer Login"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="my-header__lock-icon">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
                  </svg>
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* 3-Bar Hamburger Menu Toggle (Only on mobile <= 768px) */}
            <button
              type="button"
              className={`my-header__hamburger-btn ${isMobileMenuOpen ? "my-header__hamburger-btn--open" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="my-header__hamburger-bar"></span>
              <span className="my-header__hamburger-bar"></span>
              <span className="my-header__hamburger-bar"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="my-header__mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Dropdown / Drawer Menu */}
      <div
        className={`my-header__mobile-drawer ${isMobileMenuOpen ? "my-header__mobile-drawer--open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="my-header__mobile-drawer-header">
          <div className="my-header__mobile-drawer-brand">
            <img
              src="/jim_logo.png"
              alt="JIM Crest"
              className="my-header__mobile-crest"
            />
            <div className="my-header__mobile-drawer-titles">
              <span className="my-header__mobile-drawer-title">PORTAL MYVISA</span>
              <span className="my-header__mobile-drawer-sub">Jabatan Imigresen Malaysia</span>
            </div>
          </div>
          <button
            type="button"
            className="my-header__mobile-drawer-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav className="my-header__mobile-nav-list" aria-label="Mobile Navigation Links">
          <Link
            to="/"
            className={`my-header__mobile-nav-item ${location.pathname === "/" ? "my-header__mobile-nav-item--active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="my-header__mobile-nav-icon-box">
              <svg viewBox="0 0 24 24" fill="currentColor" className="my-header__mobile-icon">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <div className="my-header__mobile-nav-text">
              <span className="my-header__mobile-nav-label">Home</span>
              <span className="my-header__mobile-nav-hint">Official Portal Landing Page</span>
            </div>
            <span className="my-header__mobile-nav-arrow">›</span>
          </Link>

          <Link
            to="/check-visa"
            className={`my-header__mobile-nav-item ${isCheckVisaActive ? "my-header__mobile-nav-item--active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="my-header__mobile-nav-icon-box">
              <svg viewBox="0 0 24 24" fill="currentColor" className="my-header__mobile-icon">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
            <div className="my-header__mobile-nav-text">
              <span className="my-header__mobile-nav-label">eVISA Status Check</span>
              <span className="my-header__mobile-nav-hint">Verify Authenticity & Download Slip</span>
            </div>
            <span className="my-header__mobile-nav-arrow">›</span>
          </Link>

          <a
            href="#photo-requirements"
            className="my-header__mobile-nav-item"
            onClick={handlePhotoRequirementsClick}
          >
            <div className="my-header__mobile-nav-icon-box">
              <svg viewBox="0 0 24 24" fill="currentColor" className="my-header__mobile-icon">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <div className="my-header__mobile-nav-text">
              <span className="my-header__mobile-nav-label">Photo Requirements</span>
              <span className="my-header__mobile-nav-hint">Passport Photograph Specifications</span>
            </div>
            <span className="my-header__mobile-nav-arrow">›</span>
          </a>

          <button
            type="button"
            className="my-header__mobile-nav-item my-header__mobile-nav-item--btn"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenFaq();
            }}
          >
            <div className="my-header__mobile-nav-icon-box">
              <svg viewBox="0 0 24 24" fill="currentColor" className="my-header__mobile-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
              </svg>
            </div>
            <div className="my-header__mobile-nav-text">
              <span className="my-header__mobile-nav-label">FAQ</span>
              <span className="my-header__mobile-nav-hint">Frequently Asked Questions & Guidelines</span>
            </div>
            <span className="my-header__mobile-nav-arrow">›</span>
          </button>

          <Link
            to="/privacy-policy"
            className={`my-header__mobile-nav-item ${location.pathname === "/privacy-policy" ? "my-header__mobile-nav-item--active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="my-header__mobile-nav-icon-box">
              <svg viewBox="0 0 24 24" fill="currentColor" className="my-header__mobile-icon">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
            <div className="my-header__mobile-nav-text">
              <span className="my-header__mobile-nav-label">Privacy Policy</span>
              <span className="my-header__mobile-nav-hint">Terms of Use & Security Policy</span>
            </div>
            <span className="my-header__mobile-nav-arrow">›</span>
          </Link>
        </nav>

        {/* Mobile Drawer Footer */}
        <div className="my-header__mobile-drawer-footer">
          {isAdminLoggedIn ? (
            <div className="my-header__mobile-admin-panel">
              <Link
                to="/admin"
                className="my-header__mobile-admin-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Immigration Officer Portal
              </Link>
              <button
                type="button"
                className="my-header__mobile-logout-link"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAdminLogout();
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="my-header__mobile-gov-badge">
              <span>🇲🇾 Portal Rasmi Kerajaan Malaysia</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

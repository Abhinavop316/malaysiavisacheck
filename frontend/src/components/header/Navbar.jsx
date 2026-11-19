import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/header/Navbar.css";

function Navbar({ onLoginClick, onOpenFaq, isAdminLoggedIn = false, onAdminLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isCheckVisaActive = location.pathname.startsWith("/check-visa") || location.pathname.startsWith("/client-application-status");

  const handlePhotoRequirementsClick = (e) => {
    e.preventDefault();
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
          {/* Left Links */}
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

          {/* Right: Admin Login / Portal button */}
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
                  Admin Portal
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
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

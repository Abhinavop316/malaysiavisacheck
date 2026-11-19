import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer({ onLoginClick, onOpenFaq }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="my-footer">
      <div className="my-footer__inner">
        {/* Top Links Row */}
        <div className="my-footer__top-row">
          {/* Col 1: Logo */}
          <div className="my-footer__brand-col">
            <img
              src="/myvisa_logo.png"
              alt="MYVISA Logo"
              className="my-footer__logo"
            />
          </div>

          {/* Col 2: General */}
          <div className="my-footer__general-col">
            <h3 className="my-footer__script-title">General</h3>
            <ul className="my-footer__link-list">
              <li>
                <button
                  type="button"
                  className="my-footer__link-btn"
                  onClick={onLoginClick}
                >
                  Apply for eVISA
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="my-footer__link-btn"
                  onClick={onLoginClick}
                >
                  eVISA Status Check
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="my-footer__link-btn"
                  onClick={onOpenFaq}
                >
                  FAQ
                </button>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="my-footer__link"
                  onClick={scrollToTop}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Reference Links */}
          <div className="my-footer__ref-col">
            <h3 className="my-footer__script-title">Reference Links</h3>
            <div className="my-footer__ref-grid">
              <div className="my-footer__ref-subcol">
                <a href="https://educationmalaysia.gov.my" target="_blank" rel="noopener noreferrer" className="my-footer__link">
                  Education Malaysia Global Service (EMGS)
                </a>
                <a href="https://esd.imi.gov.my" target="_blank" rel="noopener noreferrer" className="my-footer__link">
                  MYXpats Centre
                </a>
                <a href="https://imigresen-online.imi.gov.my/mdac" target="_blank" rel="noopener noreferrer" className="my-footer__link">
                  Malaysia Digital Arrival Card (MDAC)
                </a>
              </div>

              <div className="my-footer__ref-subcol">
                <a href="https://irda.com.my" target="_blank" rel="noopener noreferrer" className="my-footer__link">
                  Iskandar Regional Development Authority (IRDA)
                </a>
                <a href="https://www.imi.gov.my" target="_blank" rel="noopener noreferrer" className="my-footer__link">
                  Foreign Worker
                </a>
                <a href="https://mhtc.org.my" target="_blank" rel="noopener noreferrer" className="my-footer__link">
                  Malaysia Healthcare Travel Council
                </a>
              </div>

              <div className="my-footer__ref-subcol">
                <a href="https://customs.gov.my" target="_blank" rel="noopener noreferrer" className="my-footer__link">
                  Royal Malaysian Customs Dept. (Cash Declarations)
                </a>
                <a href="https://mytrippass.com" target="_blank" rel="noopener noreferrer" className="my-footer__link">
                  Get Your MyTripPass Digital Certificate
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Media Icons */}
        <div className="my-footer__bottom-row">
          <p className="my-footer__copyright">
            &copy; 2025 Immigration Department of Malaysia | All Rights Reserved.
          </p>

          <div className="my-footer__socials">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="my-footer__social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            </a>
            {/* Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="my-footer__social-btn" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="my-footer__social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="my-footer__social-btn" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            {/* Telegram */}
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="my-footer__social-btn" aria-label="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button (Bottom-Right, above agent) */}
      <button
        type="button"
        className="my-footer__scroll-top"
        onClick={scrollToTop}
        aria-label="Back to Top"
        title="Scroll to Top"
      >
        <span className="my-footer__arrow-top">⭱</span>
      </button>
    </footer>
  );
}

export default Footer;

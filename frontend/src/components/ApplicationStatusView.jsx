import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import MalaysiaOfficialEVisaSlip from "./MalaysiaOfficialEVisaSlip";
import "../styles/ApplicationStatusView.css";

// Helper: Format date for the verification portal view matching "16 Nov 2026"
const formatPortalDate = (val) => {
  if (!val) return "";
  const s = String(val).trim();
  // Already formatted like "16 Nov 2026"
  if (/^\d{1,2}\s+[A-Za-z]{3}\s+\d{4}$/.test(s)) return s;
  // Format DD-MM-YYYY
  const dmMatch = s.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dmMatch) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[parseInt(dmMatch[2], 10) - 1] || dmMatch[2];
    return `${dmMatch[1]} ${monthName} ${dmMatch[3]}`;
  }
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, "0");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }
  return s;
};

function ApplicationStatusView({ clientData, onNewSearch }) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!clientData) return null;

  const name = (clientData?.FullName || "").toUpperCase();
  const passportNumber = (clientData?.PassportNumber || "").toUpperCase();
  const nationality = (clientData?.CountryofCitizenship || "INDIA").toUpperCase();
  const category = clientData?.Category || "eVISA (Single Entry)";
  const rawStatus = (clientData?.Status || "VALID").toUpperCase();
  const displayStatus = (rawStatus === "REFUSED" || rawStatus === "REJECTED" || rawStatus === "REVOKED") ? rawStatus : "VALID";
  const refNo = clientData?.refNo || "EV/MLY/2026/00451789";
  const stickerNumber = clientData?.stickerNumber || "EV7703447";
  const issueDate = formatPortalDate(clientData?.issueDate || new Date());
  const expiryDate = formatPortalDate(clientData?.expiryDate);
  const durationOfStay = clientData?.durationOfStay || "30 Days";

  // Directly generates and downloads the official single-page eVISA PDF
  const handlePrintResult = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const element = document.getElementById("official-evisa-document");
      if (!element) {
        console.error("Official eVISA document slip element not found.");
        return;
      }

      const opt = {
        margin: 0,
        filename: `Malaysia_eVISA_${passportNumber || "ENTRY"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
          scrollX: 0,
          windowWidth: 1280,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: "css" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="my-verified-page">
      <div className="my-verified-container">
        {/* 1. TOP HEADER BAR (SOLID NAVY WITH JATA NEGARA & VERTICAL DIVIDER) */}
        <div className="my-verified-header-bar">
          <div className="my-verified-header-left">
            <img
              src="/jata_negara.png"
              alt="Jata Negara Malaysia"
              className="my-verified-crest"
            />
            <div className="my-verified-dept-text">
              <span className="my-verified-dept-name">IMMIGRATION DEPARTMENT</span>
              <span className="my-verified-dept-name">OF MALAYSIA</span>
              <span className="my-verified-portal-tag">Official Verification Portal</span>
            </div>
          </div>

          <div className="my-verified-divider" aria-hidden="true" />

          <div className="my-verified-header-right">
            <h1 className="my-verified-header-title">Verify Your eVISA</h1>
          </div>
        </div>

        {/* 2. MAIN CARD BODY */}
        <div className="my-verified-card">
          {/* 3. GREEN SUCCESS CALLOUT ALERT */}
          <div className="my-verified-success-banner">
            <div className="my-verified-check-circle" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="currentColor" width="22" height="22">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="my-verified-success-text">
              <h2 className="my-verified-success-title">eVISA Verified – Valid</h2>
              <p className="my-verified-success-desc">
                The eVISA details you have entered are valid and match our records.
              </p>
            </div>
          </div>

          {/* 4. VERIFICATION PARTICULARS TABLE (10 ROWS - 1:1 REPLICATION OF USER IMAGE 2) */}
          <div className="my-verified-table-wrap">
            <table className="my-verified-table">
              <tbody>
                <tr>
                  <th>Visa Type</th>
                  <td>{category}</td>
                </tr>
                <tr>
                  <th>eVISA Reference No.</th>
                  <td>{refNo}</td>
                </tr>
                <tr>
                  <th>Passport / Document No.</th>
                  <td>{passportNumber}</td>
                </tr>
                <tr>
                  <th>Sticker Number</th>
                  <td>{stickerNumber}</td>
                </tr>
                <tr>
                  <th>Full Name</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>Nationality</th>
                  <td>{nationality}</td>
                </tr>
                <tr>
                  <th>Issue Date</th>
                  <td>{issueDate}</td>
                </tr>
                <tr>
                  <th>Valid Until</th>
                  <td>{expiryDate}</td>
                </tr>
                <tr>
                  <th>Duration of Stay</th>
                  <td>{durationOfStay}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span className="my-verified-status-pill">
                      {displayStatus}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 5. ACTION BUTTONS: [ 🖨️ Print Result ] & [ ← Back to Verification ] */}
          <div className="my-verified-actions">
            <button
              type="button"
              className="my-verified-btn my-verified-btn--print"
              onClick={handlePrintResult}
              disabled={isGenerating}
              title="Generate and download the official single-page eVISA PDF"
            >
              {isGenerating ? (
                <>
                  <svg className="my-btn-spinner" viewBox="0 0 24 24" fill="none" width="18" height="18">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.3" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  <span>Print Result</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="my-verified-btn my-verified-btn--back"
              onClick={onNewSearch}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Verification</span>
            </button>
          </div>
        </div>

        {/* 6. COPYRIGHT FOOTER */}
        <div className="my-verified-copyright">
          © 2026 Immigration Department of Malaysia. All Rights Reserved.
        </div>
      </div>

      {/* 7. OFF-SCREEN OFFICIAL eVISA CERTIFICATE SHEET FOR DIRECT PDF GENERATION */}
      {/* Kept off-screen so user sees ONLY the status verification card, while html2pdf generates and downloads the official slip */}
      <div
        className="my-pdf-hidden-render"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: "-99999px",
          width: "794px",
          zIndex: -99999,
          pointerEvents: "none",
        }}
      >
        <MalaysiaOfficialEVisaSlip clientData={clientData} hideActionBar={true} />
      </div>
    </div>
  );
}

export default ApplicationStatusView;

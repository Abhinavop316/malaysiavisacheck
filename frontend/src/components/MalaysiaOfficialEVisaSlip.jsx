import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import DynamicBarcode from "./common/DynamicBarcode";
import DynamicQRCode from "./common/DynamicQRCode";
import "../styles/MalaysiaOfficialEVisaSlip.css";

// Helper: formats dates cleanly to DD-MM-YYYY (or preserves DD-MM-YYYY / "16 Nov 2026")
const formatDisplayDate = (val) => {
  if (!val) return "";
  const s = String(val).trim();
  if (/^\d{2}-\d{2}-\d{4}$/.test(s)) return s;
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return s;
};

function MalaysiaOfficialEVisaSlip({ clientData, hideActionBar = false }) {
  const documentRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!clientData) return null;

  const fullName = (clientData.FullName || "").toUpperCase();
  const passportNumber = (clientData.PassportNumber || "").toUpperCase();
  const eVisaNumber = clientData.eVisaNumber || "EVLHVU485440411485001";
  const refNo = clientData.refNo || "EVS/40411/OL825/XFTCA932";
  const stickerNumber = clientData.stickerNumber || "EV2535836";
  const issueDate = formatDisplayDate(clientData.issueDate || new Date());
  const expiryDate = formatDisplayDate(clientData.expiryDate);
  const placeOfIssue = clientData.placeOfIssue || "CHENNAI, INDIA";
  const remarks = clientData.remarks || "FOR ISSUE OF VP (SOCIAL) 30 DAYS ONLY";
  const visaFee = clientData.visaFee || "MYR 50.00";
  const gender = (clientData.Gender || "MALE").toUpperCase();
  const dob = formatDisplayDate(clientData.DOB);
  const nationality = (clientData.CountryofCitizenship || "INDIA").toUpperCase();
  const travelDocType = clientData.travelDocType || "INTERNATIONAL PASSPORT";
  const travelDocIssue = formatDisplayDate(clientData.travelDocIssue || "20-09-2021");
  const travelDocExpiry = formatDisplayDate(clientData.travelDocExpiry || "19-09-2031");
  const photo = clientData.photo || "";

  // The QR code directly encodes the official eVISA Reference Number text
  const qrVerificationData = refNo;

  const handleDownloadPDF = async () => {
    if (!documentRef.current || isGenerating) return;
    setIsGenerating(true);

    try {
      const element = documentRef.current;
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
    <div className="my-official-evisa-wrapper">
      {/* 1. Direct PDF Generation Action Bar (Hidden during printing or when offscreen) */}
      {!hideActionBar && (
        <div className="my-evisa-action-bar no-print">
          <div className="my-evisa-action-bar__info">
            <span>Official Malaysian eVISA Document Slip:</span>
            <strong>{passportNumber}</strong>
          </div>

          <button
            type="button"
            className="my-evisa-download-btn"
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            title="Directly generates and downloads the official single-page eVISA PDF"
          >
            {isGenerating ? (
              <>
                <svg className="my-evisa-spinner" viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.3"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download eVISA (PDF)
              </>
            )}
          </button>
        </div>
      )}

      {/* 2. EXACT OFFICIAL MALAYSIA eVISA A4 DOCUMENT (1:1 MATCH WITH USER IMAGE) */}
      <div className="my-evisa-a4-sheet" ref={documentRef} id="official-evisa-document">
        {/* Top Header */}
        <div className="my-evisa-sheet-header">
          <div className="my-evisa-header-left">
            <img
              src="/jata_negara.png"
              alt="Jata Negara Malaysia"
              className="my-evisa-jata-crest"
            />
            <div className="my-evisa-jata-text">
              <span className="my-evisa-title-main">Electronic Visa</span>
              <span className="my-evisa-title-sub">eVISA Government of Malaysia</span>
            </div>
          </div>

          <div className="my-evisa-header-right">
            <div className="my-evisa-logo-group">
              <img
                src="/evisa_flag_logo.png"
                alt="eVISA Malaysia"
                className="my-evisa-flag-logo"
              />
              <span className="my-evisa-malaysia-sub">M A L A Y S I A</span>
            </div>
            <span className="my-evisa-serial-num">{stickerNumber}</span>
          </div>
        </div>

        {/* Middle Banner: QR Code on the Left + Immigration Notice in the Center */}
        <div className="my-evisa-middle-banner">
          {/* Exact QR Code position: Top Left of Middle Notice */}
          <div className="my-evisa-qr-col">
            <DynamicQRCode
              value={qrVerificationData}
              size={115}
              quietZone={2}
              title="Official eVISA Verification QR"
            />
          </div>

          {/* Center Notice */}
          <div className="my-evisa-center-notice-col">
            <img
              src="/jim_logo.png"
              alt="Jabatan Imigresen Malaysia"
              className="my-evisa-jim-crest"
            />
            <h2 className="my-evisa-dept-headline">MALAYSIA IMMIGRATION</h2>
            <div className="my-evisa-act-citation">[Section 2(1), Passport Act 1966]</div>
            <div className="my-evisa-entry-type">SINGLE ENTRY VISA</div>
            <p className="my-evisa-journey-condition">
              Good for a single journey to Malaysia within <strong>3 months</strong> from date hereof, provided that this passport remains valid.
            </p>
          </div>
        </div>

        {/* Section Heading + Solid Black Horizontal Divider */}
        <div className="my-evisa-section-lead">eVISA Holder Information.</div>
        <div className="my-evisa-black-divider"></div>

        {/* Main Body with Background Watermark Crest */}
        <div className="my-evisa-body-wrap">
          <div className="my-evisa-body-content">
            {/* Left Column: Key-Value Particulars */}
            <div className="my-evisa-left-particulars">
              <table className="my-evisa-data-table">
                <tbody>
                  <tr>
                    <td className="my-evisa-field-label">eVisa Number</td>
                    <td className="my-evisa-field-value">{eVisaNumber}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Ref. Number</td>
                    <td className="my-evisa-field-value">{refNo}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">eVisa Issue Date</td>
                    <td className="my-evisa-field-value">{issueDate}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">eVisa Expire Date</td>
                    <td className="my-evisa-field-value">{expiryDate}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Place of Issue</td>
                    <td className="my-evisa-field-value">{placeOfIssue}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Remarks</td>
                    <td className="my-evisa-field-value">{remarks}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Visa Fee</td>
                    <td className="my-evisa-field-value">{visaFee}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Gender</td>
                    <td className="my-evisa-field-value">{gender}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Full Name</td>
                    <td className="my-evisa-field-value">{fullName}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Date Of Birth</td>
                    <td className="my-evisa-field-value">{dob}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Nationality</td>
                    <td className="my-evisa-field-value">{nationality}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Travel Document</td>
                    <td className="my-evisa-field-value">{travelDocType}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Travel Doc. No</td>
                    <td className="my-evisa-field-value">{passportNumber}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Travel Doc. Issue</td>
                    <td className="my-evisa-field-value">{travelDocIssue}</td>
                  </tr>
                  <tr>
                    <td className="my-evisa-field-label">Travel Doc. Expiry</td>
                    <td className="my-evisa-field-value">{travelDocExpiry}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Column: Photo (with Passport No. underneath) + Barcode (with eVISA No. underneath) */}
            <div className="my-evisa-right-security">
              {/* Photo Box */}
              <div className="my-evisa-photo-box">
                {photo ? (
                  <img src={photo} alt="Applicant Photo" className="my-evisa-photo-img" />
                ) : (
                  <div className="my-evisa-photo-none">
                    PHOTO<br />35x50mm
                  </div>
                )}
              </div>

              {/* Passport Number directly under photo */}
              <div className="my-evisa-passport-tag">
                {passportNumber}
              </div>

              {/* Barcode directly below photo & passport number */}
              <div className="my-evisa-barcode-wrap">
                <DynamicBarcode
                  value={eVisaNumber}
                  text={eVisaNumber}
                  height={48}
                  barWidth={1.25}
                  showText={true}
                />
              </div>
            </div>
          </div>

          {/* Watermark Layer - Placed AFTER body content so it NEVER displaces layout */}
          <div className="my-evisa-watermark-layer" aria-hidden="true">
            <img
              src="/jim_logo.png"
              alt=""
              className="my-evisa-watermark"
            />
          </div>
        </div>

        {/* Bottom Disclaimer Box */}
        <div className="my-evisa-disclaimer-card">
          <div className="my-evisa-disclaimer-title">DISCLAIMER :</div>
          <p className="my-evisa-disclaimer-text">
            This eVISA merely establishes that you are eligible to travel, but does not guarantee that you are entitled to enter Malaysia. Upon arrival to Malaysia, you will be inspected by a Malaysian Immigration Entry / Exit Officer who may determine that you are inadmissible for any reason under Malaysian law.
          </p>
          <p className="my-evisa-disclaimer-text">
            For more information, please visit http://www.imi.gov.my or the official eVISA website https://malaysiavisa.imi.gov.my. You are advised to visit the FAQ section to discover informations regarding terms and conditions, eligibility, fees and others.
          </p>
        </div>

        <div className="my-evisa-version-tag">v3.0</div>
      </div>
    </div>
  );
}

export default MalaysiaOfficialEVisaSlip;

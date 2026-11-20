import React, { useRef, useState } from "react";
import { downloadOfficialEVisaPDF } from "../utils/pdfGenerator";
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
      await downloadOfficialEVisaPDF(
        documentRef.current,
        `Malaysia_eVISA_${passportNumber || "ENTRY"}.pdf`
      );
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
      <div
        className="my-evisa-a4-sheet"
        ref={documentRef}
        id="official-evisa-document"
        style={{
          width: "794px",
          minWidth: "794px",
          maxWidth: "794px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          padding: "24px 32px 28px",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#000000",
          position: "relative",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        {/* Synchronous embedded styles to guarantee 100% desktop fidelity in html2canvas on any device */}
        <style>{`
          #official-evisa-document {
            width: 794px !important;
            min-width: 794px !important;
            max-width: 794px !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            padding: 24px 32px 28px !important;
            font-family: Arial, Helvetica, sans-serif !important;
            color: #000000 !important;
            position: relative !important;
            overflow: hidden !important;
            margin: 0 auto !important;
          }
          #official-evisa-document * {
            box-sizing: border-box !important;
          }
          #official-evisa-document .my-evisa-sheet-header {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            margin-bottom: 6px !important;
            width: 100% !important;
          }
          #official-evisa-document .my-evisa-header-left {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 14px !important;
          }
          #official-evisa-document .my-evisa-jata-crest {
            width: 68px !important;
            min-width: 68px !important;
            max-width: 68px !important;
            height: 54px !important;
            object-fit: contain !important;
            display: block !important;
          }
          #official-evisa-document .my-evisa-jata-text {
            display: flex !important;
            flex-direction: column !important;
          }
          #official-evisa-document .my-evisa-title-main {
            font-size: 20px !important;
            font-weight: 700 !important;
            color: #111827 !important;
            line-height: 1.15 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-title-sub {
            font-size: 12.5px !important;
            color: #4b5563 !important;
            margin-top: 2px !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-header-right {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-end !important;
          }
          #official-evisa-document .my-evisa-logo-group {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          #official-evisa-document .my-evisa-flag-logo {
            height: 40px !important;
            width: auto !important;
            max-width: 140px !important;
            object-fit: contain !important;
            display: block !important;
          }
          #official-evisa-document .my-evisa-malaysia-sub {
            font-size: 10px !important;
            font-weight: 700 !important;
            color: #1e3a8a !important;
            letter-spacing: 0.32em !important;
            margin-top: 2px !important;
            text-indent: 0.32em !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-serial-num {
            font-size: 11px !important;
            font-family: 'Courier New', Courier, monospace !important;
            font-weight: 700 !important;
            color: #111827 !important;
            margin-top: 4px !important;
            letter-spacing: 0.05em !important;
          }
          #official-evisa-document .my-evisa-middle-banner {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            margin: 14px 0 20px !important;
            gap: 24px !important;
            width: 100% !important;
          }
          #official-evisa-document .my-evisa-qr-col {
            width: 135px !important;
            min-width: 135px !important;
            max-width: 135px !important;
            flex-shrink: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          #official-evisa-document .my-evisa-center-notice-col {
            flex: 1 !important;
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding-right: 32px !important;
          }
          #official-evisa-document .my-evisa-jim-crest {
            width: 48px !important;
            min-width: 48px !important;
            max-width: 48px !important;
            height: 48px !important;
            object-fit: contain !important;
            margin-bottom: 6px !important;
            display: block !important;
          }
          #official-evisa-document .my-evisa-dept-headline {
            font-size: 17px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            letter-spacing: 0.02em !important;
            margin: 0 0 2px 0 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-act-citation {
            font-size: 13px !important;
            color: #111827 !important;
            margin: 0 0 4px 0 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-entry-type {
            font-size: 15px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            letter-spacing: 0.04em !important;
            margin: 2px 0 6px 0 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-journey-condition {
            font-size: 13px !important;
            color: #111827 !important;
            line-height: 1.35 !important;
            max-width: 460px !important;
            margin: 0 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-section-lead {
            font-size: 15px !important;
            font-weight: 700 !important;
            color: #000000 !important;
            margin: 0 0 6px 0 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-black-divider {
            width: 100% !important;
            height: 2px !important;
            background-color: #000000 !important;
            margin-bottom: 20px !important;
          }
          #official-evisa-document .my-evisa-body-wrap {
            position: relative !important;
            margin-top: 6px !important;
            min-height: 340px !important;
            width: 100% !important;
          }
          #official-evisa-document .my-evisa-body-content {
            position: relative !important;
            z-index: 2 !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 24px !important;
            width: 100% !important;
          }
          #official-evisa-document .my-evisa-left-particulars {
            flex: 1 !important;
          }
          #official-evisa-document .my-evisa-data-table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 13.5px !important;
            line-height: 1.45 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-data-table td {
            padding: 3.5px 0 !important;
            vertical-align: top !important;
            border: none !important;
          }
          #official-evisa-document .my-evisa-field-label {
            width: 145px !important;
            min-width: 145px !important;
            color: #000000 !important;
            font-weight: 400 !important;
            white-space: nowrap !important;
          }
          #official-evisa-document .my-evisa-field-value {
            color: #000000 !important;
            font-weight: 700 !important;
          }
          #official-evisa-document .my-evisa-right-security {
            width: 175px !important;
            min-width: 175px !important;
            max-width: 175px !important;
            flex-shrink: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            padding-top: 8px !important;
            margin-top: 0 !important;
          }
          #official-evisa-document .my-evisa-photo-box {
            width: 105px !important;
            min-width: 105px !important;
            max-width: 105px !important;
            height: 130px !important;
            border: 1px solid #111827 !important;
            background: #ffffff !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin-bottom: 6px !important;
          }
          #official-evisa-document .my-evisa-photo-img {
            width: 105px !important;
            height: 130px !important;
            object-fit: cover !important;
            display: block !important;
          }
          #official-evisa-document .my-evisa-photo-none {
            font-size: 10px !important;
            color: #6b7280 !important;
            text-align: center !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-passport-tag {
            font-size: 13px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            letter-spacing: 0.05em !important;
            margin-bottom: 20px !important;
            text-align: center !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-barcode-wrap {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
          }
          #official-evisa-document .my-evisa-watermark-layer {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            pointer-events: none !important;
            z-index: 1 !important;
            overflow: hidden !important;
          }
          #official-evisa-document .my-evisa-watermark {
            width: 320px !important;
            min-width: 320px !important;
            max-width: 320px !important;
            height: 320px !important;
            object-fit: contain !important;
            opacity: 0.08 !important;
            pointer-events: none !important;
            display: block !important;
          }
          #official-evisa-document .my-evisa-disclaimer-card {
            background-color: #f1f3f5 !important;
            border-radius: 4px !important;
            padding: 14px 18px !important;
            margin-top: 24px !important;
            font-size: 11px !important;
            line-height: 1.45 !important;
            color: #111827 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-disclaimer-title {
            font-size: 12px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            margin: 0 0 6px 0 !important;
            letter-spacing: 0.02em !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-disclaimer-text {
            margin: 0 0 8px 0 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          #official-evisa-document .my-evisa-version-tag {
            font-size: 10px !important;
            color: #9ca3af !important;
            text-align: right !important;
            margin-top: 6px !important;
            font-weight: 600 !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }
        `}</style>

        {/* Top Header */}
        <div
          className="my-evisa-sheet-header"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "6px",
            width: "100%",
          }}
        >
          <div
            className="my-evisa-header-left"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <img
              src="/jata_negara.png"
              alt="Jata Negara Malaysia"
              className="my-evisa-jata-crest"
              width="68"
              height="54"
              style={{
                width: "68px",
                minWidth: "68px",
                maxWidth: "68px",
                height: "54px",
                objectFit: "contain",
                display: "block",
              }}
            />
            <div
              className="my-evisa-jata-text"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                className="my-evisa-title-main"
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.15,
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                Electronic Visa
              </span>
              <span
                className="my-evisa-title-sub"
                style={{
                  fontSize: "12.5px",
                  color: "#4b5563",
                  marginTop: "2px",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                eVISA Government of Malaysia
              </span>
            </div>
          </div>

          <div
            className="my-evisa-header-right"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div
              className="my-evisa-logo-group"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/evisa_flag_logo.png"
                alt="eVISA Malaysia"
                className="my-evisa-flag-logo"
                height="40"
                style={{
                  height: "40px",
                  width: "auto",
                  maxWidth: "140px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <span
                className="my-evisa-malaysia-sub"
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#1e3a8a",
                  letterSpacing: "0.32em",
                  marginTop: "2px",
                  textIndent: "0.32em",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                M A L A Y S I A
              </span>
            </div>
            <span
              className="my-evisa-serial-num"
              style={{
                fontSize: "11px",
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 700,
                color: "#111827",
                marginTop: "4px",
                letterSpacing: "0.05em",
              }}
            >
              {stickerNumber}
            </span>
          </div>
        </div>

        {/* Middle Banner: QR Code on the Left + Immigration Notice in the Center */}
        <div
          className="my-evisa-middle-banner"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "14px 0 20px",
            gap: "24px",
            width: "100%",
          }}
        >
          {/* Exact QR Code position: Top Left of Middle Notice */}
          <div
            className="my-evisa-qr-col"
            style={{
              width: "135px",
              minWidth: "135px",
              maxWidth: "135px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DynamicQRCode
              value={qrVerificationData}
              size={115}
              quietZone={2}
              title="Official eVISA Verification QR"
            />
          </div>

          {/* Center Notice */}
          <div
            className="my-evisa-center-notice-col"
            style={{
              flex: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "32px",
            }}
          >
            <img
              src="/jim_logo.png"
              alt="Jabatan Imigresen Malaysia"
              className="my-evisa-jim-crest"
              width="48"
              height="48"
              style={{
                width: "48px",
                minWidth: "48px",
                maxWidth: "48px",
                height: "48px",
                objectFit: "contain",
                marginBottom: "6px",
                display: "block",
              }}
            />
            <h2
              className="my-evisa-dept-headline"
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "#000000",
                letterSpacing: "0.02em",
                margin: "0 0 2px 0",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              MALAYSIA IMMIGRATION
            </h2>
            <div
              className="my-evisa-act-citation"
              style={{
                fontSize: "13px",
                color: "#111827",
                margin: "0 0 4px 0",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              [Section 2(1), Passport Act 1966]
            </div>
            <div
              className="my-evisa-entry-type"
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#000000",
                letterSpacing: "0.04em",
                margin: "2px 0 6px 0",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              SINGLE ENTRY VISA
            </div>
            <p
              className="my-evisa-journey-condition"
              style={{
                fontSize: "13px",
                color: "#111827",
                lineHeight: 1.35,
                maxWidth: "460px",
                margin: 0,
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              Good for a single journey to Malaysia within <strong>3 months</strong> from date hereof, provided that this passport remains valid.
            </p>
          </div>
        </div>

        {/* Section Heading + Solid Black Horizontal Divider */}
        <div
          className="my-evisa-section-lead"
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#000000",
            margin: "0 0 6px 0",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          eVISA Holder Information.
        </div>
        <div
          className="my-evisa-black-divider"
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#000000",
            marginBottom: "20px",
          }}
        />

        {/* Main Body with Background Watermark Crest */}
        <div
          className="my-evisa-body-wrap"
          style={{
            position: "relative",
            marginTop: "6px",
            minHeight: "340px",
            width: "100%",
          }}
        >
          <div
            className="my-evisa-body-content"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "24px",
              width: "100%",
            }}
          >
            {/* Left Column: Key-Value Particulars */}
            <div
              className="my-evisa-left-particulars"
              style={{ flex: 1 }}
            >
              <table
                className="my-evisa-data-table"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13.5px",
                  lineHeight: "1.45",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                <tbody>
                  {[
                    ["eVisa Number", eVisaNumber],
                    ["Ref. Number", refNo],
                    ["eVisa Issue Date", issueDate],
                    ["eVisa Expire Date", expiryDate],
                    ["Place of Issue", placeOfIssue],
                    ["Remarks", remarks],
                    ["Visa Fee", visaFee],
                    ["Gender", gender],
                    ["Full Name", fullName],
                    ["Date Of Birth", dob],
                    ["Nationality", nationality],
                    ["Travel Document", travelDocType],
                    ["Travel Doc. No", passportNumber],
                    ["Travel Doc. Issue", travelDocIssue],
                    ["Travel Doc. Expiry", travelDocExpiry],
                  ].map(([label, val]) => (
                    <tr key={label}>
                      <td
                        className="my-evisa-field-label"
                        style={{
                          width: "145px",
                          minWidth: "145px",
                          color: "#000000",
                          fontWeight: 400,
                          whiteSpace: "nowrap",
                          padding: "3.5px 0",
                          verticalAlign: "top",
                          border: "none",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        {label}
                      </td>
                      <td
                        className="my-evisa-field-value"
                        style={{
                          color: "#000000",
                          fontWeight: 700,
                          padding: "3.5px 0",
                          verticalAlign: "top",
                          border: "none",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Column: Photo (with Passport No. underneath) + Barcode (with eVISA No. underneath) */}
            <div
              className="my-evisa-right-security"
              style={{
                width: "175px",
                minWidth: "175px",
                maxWidth: "175px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "8px",
                marginTop: 0,
              }}
            >
              {/* Photo Box */}
              <div
                className="my-evisa-photo-box"
                style={{
                  width: "105px",
                  minWidth: "105px",
                  maxWidth: "105px",
                  height: "130px",
                  border: "1px solid #111827",
                  backgroundColor: "#ffffff",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "6px",
                }}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="Applicant Photo"
                    className="my-evisa-photo-img"
                    width="105"
                    height="130"
                    style={{
                      width: "105px",
                      height: "130px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    className="my-evisa-photo-none"
                    style={{
                      fontSize: "10px",
                      color: "#6b7280",
                      textAlign: "center",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    PHOTO<br />35x50mm
                  </div>
                )}
              </div>

              {/* Passport Number directly under photo */}
              <div
                className="my-evisa-passport-tag"
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#000000",
                  letterSpacing: "0.05em",
                  marginBottom: "20px",
                  textAlign: "center",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                {passportNumber}
              </div>

              {/* Barcode directly below photo & passport number */}
              <div
                className="my-evisa-barcode-wrap"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
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

          {/* Watermark Layer - Placed strictly behind body content */}
          <div
            className="my-evisa-watermark-layer"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 1,
              overflow: "hidden",
            }}
          >
            <img
              src="/jim_logo.png"
              alt=""
              className="my-evisa-watermark"
              width="320"
              height="320"
              style={{
                width: "320px",
                minWidth: "320px",
                maxWidth: "320px",
                height: "320px",
                objectFit: "contain",
                opacity: 0.08,
                pointerEvents: "none",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Bottom Disclaimer Box */}
        <div
          className="my-evisa-disclaimer-card"
          style={{
            backgroundColor: "#f1f3f5",
            borderRadius: "4px",
            padding: "14px 18px",
            marginTop: "24px",
            fontSize: "11px",
            lineHeight: "1.45",
            color: "#111827",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <div
            className="my-evisa-disclaimer-title"
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#000000",
              margin: "0 0 6px 0",
              letterSpacing: "0.02em",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            DISCLAIMER :
          </div>
          <p
            className="my-evisa-disclaimer-text"
            style={{
              margin: "0 0 8px 0",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            This eVISA merely establishes that you are eligible to travel, but does not guarantee that you are entitled to enter Malaysia. Upon arrival to Malaysia, you will be inspected by a Malaysian Immigration Entry / Exit Officer who may determine that you are inadmissible for any reason under Malaysian law.
          </p>
          <p
            className="my-evisa-disclaimer-text"
            style={{
              margin: 0,
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            For more information, please visit http://www.imi.gov.my or the official eVISA website https://malaysiavisa.imi.gov.my. You are advised to visit the FAQ section to discover informations regarding terms and conditions, eligibility, fees and others.
          </p>
        </div>

        <div
          className="my-evisa-version-tag"
          style={{
            fontSize: "10px",
            color: "#9ca3af",
            textAlign: "right",
            marginTop: "6px",
            fontWeight: 600,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          v3.0
        </div>
      </div>
    </div>
  );
}

export default MalaysiaOfficialEVisaSlip;

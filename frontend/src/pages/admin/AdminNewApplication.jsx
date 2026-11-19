import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "../../api/client.api";
import DynamicBarcode from "../../components/common/DynamicBarcode";
import DynamicQRCode from "../../components/common/DynamicQRCode";
import "../../styles/admin/AdminPortal.css";

// Helper: Format date to "DD MMM YYYY" (e.g. 16 Nov 2026)
const formatDisplayDate = (isoStr) => {
  if (!isoStr) return "";
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return isoStr;
  const day = String(d.getDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

// Helper: Get Today in ISO YYYY-MM-DD
const getTodayIso = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

// Helper: Compute 3 months after issue date (e.g. 16 Nov 2026 -> 15 Feb 2027)
const computeExpiryIso = (issueIso) => {
  if (!issueIso) return "";
  const d = new Date(issueIso);
  if (isNaN(d.getTime())) return "";
  d.setMonth(d.getMonth() + 3);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

// Generator: E Visa Number (e.g. EVLHVU485440411485001)
const generateEVisaNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "EV";
  for (let i = 0; i < 4; i++) {
    str += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 15; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};

// Generator: Ref No (e.g. EV/MLY/2026/00451789)
const generateRefNo = () => {
  const year = new Date().getFullYear();
  const num = String(Math.floor(10000000 + Math.random() * 90000000));
  return `EV/MLY/${year}/${num}`;
};

// Generator: Sticker Number (e.g. EV7703447)
const generateStickerNumber = () => {
  const num = Math.floor(1000000 + Math.random() * 9000000);
  return `EV${num}`;
};

function AdminNewApplication({ onLogout }) {
  const navigate = useNavigate();

  const todayIso = getTodayIso();
  const defaultExpiryIso = computeExpiryIso(todayIso);

  const [formData, setFormData] = useState({
    category: "eVISA (Single Entry)",
    fullName: "",
    gender: "MALE",
    nationality: "INDIA",
    passportNumber: "",
    placeOfIssue: "CHENNAI, INDIA",
    durationOfStay: "30 Days",
    visaFee: "MYR 50.00",
    status: "Issued",
    remarks: "FOR ISSUE OF VP (SOCIAL) 30 DAYS ONLY",
    paragraph: "Official eVISA entry clearance has been approved and issued by the Immigration Department of Malaysia.",
    
    // Auto-generated fields requested
    eVisaNumber: generateEVisaNumber(),
    refNo: generateRefNo(),
    stickerNumber: generateStickerNumber(),
    issueDate: todayIso,
    expiryDate: defaultExpiryIso,
    
    // Additional particulars
    dob: "1990-01-01",
    pob: "INDIA",
    email: "",
    phone: "",
    address: "",
    password: "client123",
    travelDocType: "INTERNATIONAL PASSPORT",
    travelDocIssue: "2021-09-20",
    travelDocExpiry: "2031-09-19",
    
    // Passport photo (base64 string)
    photo: "",
    agreedToTerms: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdClient, setCreatedClient] = useState(null);

  useEffect(() => {
    document.title = "Create New eVISA Application :: Admin Portal";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // If issueDate changes, auto-recalculate expiryDate to 3 months later
      if (field === "issueDate" && value) {
        updated.expiryDate = computeExpiryIso(value);
      }
      return updated;
    });
    setErrorMsg("");
    setSuccessMsg("");
  };

  // Photo file upload handler -> converts to Base64
  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 5MB. Please choose a smaller passport photo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
      setErrorMsg("");
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read image file. Please try another image.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photo: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter applicant's Full Name.");
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    if (!formData.passportNumber.trim()) {
      setErrorMsg("Please enter applicant's Passport/Document Number.");
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload = {
      Category: formData.category,
      FullName: formData.fullName.trim().toUpperCase(),
      PassportNumber: formData.passportNumber.trim().toUpperCase(),
      CountryofCitizenship: formData.nationality.trim().toUpperCase(),
      Gender: formData.gender,
      DOB: formData.dob || null,
      POB: formData.pob || formData.nationality,
      Email: formData.email.trim() || `${formData.passportNumber.trim().toLowerCase()}@evisa.gov.my`,
      telephone: formData.phone.trim() || "N/A",
      Address: formData.address.trim() || "N/A",
      Password: formData.password.trim() || "client123",
      Status: formData.status,
      Paragraph: formData.paragraph.trim(),

      // Auto-generated & eVISA fields
      eVisaNumber: formData.eVisaNumber.trim(),
      refNo: formData.refNo.trim(),
      stickerNumber: formData.stickerNumber.trim(),
      issueDate: formatDisplayDate(formData.issueDate),
      expiryDate: formatDisplayDate(formData.expiryDate),
      durationOfStay: formData.durationOfStay.trim(),
      placeOfIssue: formData.placeOfIssue.trim(),
      remarks: formData.remarks.trim(),
      visaFee: formData.visaFee.trim(),
      travelDocType: formData.travelDocType.trim(),
      travelDocIssue: formData.travelDocIssue,
      travelDocExpiry: formData.travelDocExpiry,
      photo: formData.photo,
    };

    try {
      const response = await createClient(payload);
      setIsSubmitting(false);
      setCreatedClient(response);
      setSuccessMsg(`eVISA Record successfully created for ${response.FullName}!`);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || "Failed to create new visa application.");
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleResetForm = () => {
    const freshToday = getTodayIso();
    setFormData({
      category: "eVISA (Single Entry)",
      fullName: "",
      gender: "MALE",
      nationality: "INDIA",
      passportNumber: "",
      placeOfIssue: "CHENNAI, INDIA",
      durationOfStay: "30 Days",
      visaFee: "MYR 50.00",
      status: "Issued",
      remarks: "FOR ISSUE OF VP (SOCIAL) 30 DAYS ONLY",
      paragraph: "Official eVISA entry clearance has been approved and issued by the Immigration Department of Malaysia.",
      eVisaNumber: generateEVisaNumber(),
      refNo: generateRefNo(),
      stickerNumber: generateStickerNumber(),
      issueDate: freshToday,
      expiryDate: computeExpiryIso(freshToday),
      dob: "1990-01-01",
      pob: "INDIA",
      email: "",
      phone: "",
      address: "",
      password: "client123",
      travelDocType: "INTERNATIONAL PASSPORT",
      travelDocIssue: "2021-09-20",
      travelDocExpiry: "2031-09-19",
      photo: "",
      agreedToTerms: true,
    });
    setCreatedClient(null);
    setSuccessMsg("");
    setErrorMsg("");
  };

  return (
    <div className="my-admin-page">
      <div className="my-admin-container">
        {/* Breadcrumb */}
        <nav className="my-admin-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="my-admin-breadcrumb__link">
            HOME
          </Link>
          <span className="my-admin-breadcrumb__sep">/</span>
          <Link to="/admin" className="my-admin-breadcrumb__link">
            Admin Portal
          </Link>
          <span className="my-admin-breadcrumb__sep">/</span>
          <span className="my-admin-breadcrumb__current">New Application</span>
        </nav>

        {/* Header */}
        <div className="my-admin-header">
          <span className="my-admin-badge">OFFICIAL REGISTRY</span>
          <h1 className="my-admin-title">Create New eVISA Record</h1>
          <p className="my-admin-sub">
            Jabatan Imigresen Malaysia :: Register official entry clearance &amp; issue eVISA note
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="my-admin-nav-tabs">
          <button
            type="button"
            className="my-admin-nav-tab my-admin-nav-tab--active"
            onClick={() => {}}
          >
            Create New Application
          </button>
          <button
            type="button"
            className="my-admin-nav-tab"
            onClick={() => navigate("/admin/edit-application")}
          >
            Search &amp; Modify Application
          </button>
          <button
            type="button"
            className="my-admin-nav-tab"
            style={{ marginLeft: "auto", color: "#dc2626" }}
            onClick={onLogout}
          >
            Log Out Session
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="my-admin-alert my-admin-alert--success">
            <span>✓</span>
            <div>
              <strong>Success:</strong> {successMsg}
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="my-admin-alert my-admin-alert--error" role="alert">
            <span>⚠️</span>
            <div>{errorMsg}</div>
          </div>
        )}

        {/* If successfully created, display Summary Receipt */}
        {createdClient && (
          <div className="my-admin-card" style={{ marginBottom: "2rem" }}>
            <div className="my-admin-card__header">
              <h2 className="my-admin-card__title">
                <span>📄</span> New Application Created Successfully
              </h2>
              <span className="my-admin-card__status-tag" style={{ background: "#dcfce7", color: "#166534" }}>
                REGISTERED IN DATABASE
              </span>
            </div>
            <div className="my-admin-card__body">
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {createdClient.photo ? (
                  <div className="my-admin-photo-frame" style={{ width: "100px", height: "130px" }}>
                    <img src={createdClient.photo} alt="Passport Photo" className="my-admin-photo-img" />
                  </div>
                ) : (
                  <div className="my-admin-photo-frame" style={{ width: "100px", height: "130px" }}>
                    <div className="my-admin-photo-placeholder">
                      <p>No Photo Uploaded</p>
                    </div>
                  </div>
                )}
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.2rem", color: "#012f61" }}>
                    {createdClient.FullName}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem 1rem", fontSize: "0.85rem" }}>
                    <div><strong>Passport No:</strong> {createdClient.PassportNumber}</div>
                    <div><strong>Sticker No:</strong> {createdClient.stickerNumber || "N/A"}</div>
                    <div><strong>eVISA Ref No:</strong> {createdClient.refNo || "N/A"}</div>
                    <div><strong>eVISA Number:</strong> {createdClient.eVisaNumber || "N/A"}</div>
                    <div><strong>Issue Date:</strong> {createdClient.issueDate}</div>
                    <div><strong>Valid Until (Expiry):</strong> {createdClient.expiryDate}</div>
                    <div><strong>Nationality:</strong> {createdClient.CountryofCitizenship}</div>
                    <div><strong>Status:</strong> <span style={{ color: "#16a34a", fontWeight: "700" }}>{createdClient.Status}</span></div>
                  </div>

                  <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: "1rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem", flexWrap: "wrap" }}>
                    <div>
                      <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#64748b", display: "block", marginBottom: "4px" }}>GENERATED CODE 128 BARCODE:</span>
                      <DynamicBarcode value={createdClient.eVisaNumber || createdClient.PassportNumber} text={createdClient.eVisaNumber} height={38} barWidth={1.3} />
                    </div>
                    <div>
                      <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#64748b", display: "block", marginBottom: "4px" }}>DIGITAL VERIFICATION QR:</span>
                      <DynamicQRCode value={createdClient.refNo} size={70} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="my-admin-btn my-admin-btn--primary"
                  onClick={handleResetForm}
                >
                  + Add Another Application
                </button>
                <Link to="/check-visa" className="my-admin-btn my-admin-btn--secondary">
                  Verify on /check-visa Portal &rarr;
                </Link>
                <button
                  type="button"
                  className="my-admin-btn my-admin-btn--secondary"
                  onClick={() => navigate("/admin/edit-application")}
                >
                  Edit This Record
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="my-admin-card">
          <div className="my-admin-card__header">
            <h2 className="my-admin-card__title">
              <span>✍️</span> Visa Holder Particulars &amp; eVISA Configuration
            </h2>
            <span className="my-admin-card__status-tag">IMMIGRATION OFFICER TERMINAL</span>
          </div>

          <div className="my-admin-card__body">
            {/* Section 1: Auto-generated eVISA Credentials */}
            <div className="my-admin-section">
              <h3 className="my-admin-section__title">
                1. eVISA Identification &amp; Validity Dates
              </h3>

              <div className="my-admin-grid-3">
                {/* E Visa Number - autogenerated */}
                <div className="my-admin-field">
                  <label htmlFor="eVisaNumber" className="my-admin-label">
                    eVISA Number
                    <span className="my-admin-auto-badge">AUTOGENERATED</span>
                  </label>
                  <div className="my-admin-autogen-wrap">
                    <input
                      id="eVisaNumber"
                      type="text"
                      className="my-admin-input"
                      value={formData.eVisaNumber}
                      onChange={(e) => handleChange("eVisaNumber", e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="my-admin-reload-btn"
                      onClick={() => handleChange("eVisaNumber", generateEVisaNumber())}
                      title="Regenerate eVISA Number"
                    >
                      ↺ New
                    </button>
                  </div>
                </div>

                {/* Ref no. - autogenerated */}
                <div className="my-admin-field">
                  <label htmlFor="refNo" className="my-admin-label">
                    eVISA Reference No.
                    <span className="my-admin-auto-badge">AUTOGENERATED</span>
                  </label>
                  <div className="my-admin-autogen-wrap">
                    <input
                      id="refNo"
                      type="text"
                      className="my-admin-input"
                      value={formData.refNo}
                      onChange={(e) => handleChange("refNo", e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="my-admin-reload-btn"
                      onClick={() => handleChange("refNo", generateRefNo())}
                      title="Regenerate Reference No"
                    >
                      ↺ New
                    </button>
                  </div>
                </div>

                {/* Sticker Number - autogenerated */}
                <div className="my-admin-field">
                  <label htmlFor="stickerNumber" className="my-admin-label">
                    Sticker Number
                    <span className="my-admin-auto-badge">AUTOGENERATED</span>
                  </label>
                  <div className="my-admin-autogen-wrap">
                    <input
                      id="stickerNumber"
                      type="text"
                      className="my-admin-input"
                      value={formData.stickerNumber}
                      onChange={(e) => handleChange("stickerNumber", e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="my-admin-reload-btn"
                      onClick={() => handleChange("stickerNumber", generateStickerNumber())}
                      title="Regenerate Sticker Number"
                    >
                      ↺ New
                    </button>
                  </div>
                </div>
              </div>

              {/* Row: Issue Date & Expiry Date (3 months after) */}
              <div className="my-admin-grid-3" style={{ marginTop: "1rem" }}>
                {/* Issue date - date on which data added */}
                <div className="my-admin-field">
                  <label htmlFor="issueDate" className="my-admin-label">
                    Issue Date (Date on which added) <span className="my-admin-req">*</span>
                  </label>
                  <input
                    id="issueDate"
                    type="date"
                    className="my-admin-input"
                    value={formData.issueDate}
                    onChange={(e) => handleChange("issueDate", e.target.value)}
                    required
                  />
                  <small style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "3px" }}>
                    Formatted: <strong>{formatDisplayDate(formData.issueDate)}</strong>
                  </small>
                </div>

                {/* Expiry date - 3 months after issued date */}
                <div className="my-admin-field">
                  <label htmlFor="expiryDate" className="my-admin-label">
                    Expiry Date (3 Months After Issue) <span className="my-admin-req">*</span>
                    <span className="my-admin-auto-badge">CALCULATED</span>
                  </label>
                  <input
                    id="expiryDate"
                    type="date"
                    className="my-admin-input"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                    required
                  />
                  <small style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "3px" }}>
                    Formatted: <strong>{formatDisplayDate(formData.expiryDate)}</strong>
                  </small>
                </div>

                {/* Duration of Stay */}
                <div className="my-admin-field">
                  <label htmlFor="durationOfStay" className="my-admin-label">
                    Duration of Stay
                  </label>
                  <input
                    id="durationOfStay"
                    type="text"
                    className="my-admin-input"
                    value={formData.durationOfStay}
                    onChange={(e) => handleChange("durationOfStay", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Passport Sized Photo Upload */}
            <div className="my-admin-section">
              <h3 className="my-admin-section__title">
                2. Passport-Sized Photo Upload
              </h3>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.8125rem", color: "#64748b" }}>
                Upload official applicant portrait (standard 35mm &times; 50mm, white or plain blue background).
              </p>

              <div className="my-admin-photo-section">
                <div className="my-admin-photo-frame">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Passport Photo Preview" className="my-admin-photo-img" />
                  ) : (
                    <div className="my-admin-photo-placeholder">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      <p>Passport Photo (35x50mm)</p>
                    </div>
                  )}
                </div>

                <div className="my-admin-photo-details">
                  <h4>Applicant Photo</h4>
                  <p>
                    Accepted formats: JPG, PNG, WEBP (Max 5MB). Photo will be permanently embedded onto the official eVISA certificate slip.
                  </p>
                  <div className="my-admin-photo-actions">
                    <label className="my-admin-upload-btn">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {formData.photo ? "Change Photo" : "Upload Passport Photo"}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handlePhotoUpload}
                      />
                    </label>

                    {formData.photo && (
                      <button
                        type="button"
                        className="my-admin-remove-photo-btn"
                        onClick={handleRemovePhoto}
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Applicant Particulars */}
            <div className="my-admin-section">
              <h3 className="my-admin-section__title">
                3. Applicant Particulars &amp; Travel Document
              </h3>

              <div className="my-admin-grid-2">
                <div className="my-admin-field">
                  <label htmlFor="fullName" className="my-admin-label">
                    Full Name (As in Passport) <span className="my-admin-req">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="my-admin-input"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="e.g. USMAN AHMAD or VRIJESH CHAUHAN"
                    required
                  />
                </div>

                <div className="my-admin-field">
                  <label htmlFor="passportNumber" className="my-admin-label">
                    Passport / Travel Doc No. <span className="my-admin-req">*</span>
                  </label>
                  <input
                    id="passportNumber"
                    type="text"
                    className="my-admin-input"
                    value={formData.passportNumber}
                    onChange={(e) => handleChange("passportNumber", e.target.value.toUpperCase())}
                    placeholder="e.g. A0777466 or U3738886"
                    required
                  />
                </div>
              </div>

              <div className="my-admin-grid-3" style={{ marginTop: "1rem" }}>
                <div className="my-admin-field">
                  <label htmlFor="nationality" className="my-admin-label">
                    Nationality
                  </label>
                  <input
                    id="nationality"
                    type="text"
                    className="my-admin-input"
                    value={formData.nationality}
                    onChange={(e) => handleChange("nationality", e.target.value)}
                  />
                </div>

                <div className="my-admin-field">
                  <label htmlFor="gender" className="my-admin-label">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="my-admin-select"
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </div>

                <div className="my-admin-field">
                  <label htmlFor="dob" className="my-admin-label">
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    type="date"
                    className="my-admin-input"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                </div>
              </div>

              <div className="my-admin-grid-3" style={{ marginTop: "1rem" }}>
                <div className="my-admin-field">
                  <label htmlFor="placeOfIssue" className="my-admin-label">
                    Place of Issue
                  </label>
                  <input
                    id="placeOfIssue"
                    type="text"
                    className="my-admin-input"
                    value={formData.placeOfIssue}
                    onChange={(e) => handleChange("placeOfIssue", e.target.value)}
                  />
                </div>

                <div className="my-admin-field">
                  <label htmlFor="visaFee" className="my-admin-label">
                    Visa Fee
                  </label>
                  <input
                    id="visaFee"
                    type="text"
                    className="my-admin-input"
                    value={formData.visaFee}
                    onChange={(e) => handleChange("visaFee", e.target.value)}
                  />
                </div>

                <div className="my-admin-field">
                  <label htmlFor="status" className="my-admin-label">
                    Decision Status
                  </label>
                  <select
                    id="status"
                    className="my-admin-select"
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    <option value="Issued">Issued / VALID</option>
                    <option value="Pending">Pending / Under Review</option>
                    <option value="Refused">Refused</option>
                    <option value="Revoked">Revoked</option>
                  </select>
                </div>
              </div>

              <div className="my-admin-grid-1" style={{ marginTop: "1rem" }}>
                <div className="my-admin-field">
                  <label htmlFor="remarks" className="my-admin-label">
                    Remarks (Printed on eVISA Note)
                  </label>
                  <input
                    id="remarks"
                    type="text"
                    className="my-admin-input"
                    value={formData.remarks}
                    onChange={(e) => handleChange("remarks", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="my-admin-actions">
              <button
                type="submit"
                className="my-admin-btn my-admin-btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating eVISA..." : "Issue & Save eVISA Record"}
              </button>

              <button
                type="button"
                className="my-admin-btn my-admin-btn--secondary"
                onClick={handleResetForm}
                disabled={isSubmitting}
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminNewApplication;

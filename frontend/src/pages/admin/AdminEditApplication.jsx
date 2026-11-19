import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAClients, updateClient } from "../../api/client.api";
import "../../styles/admin/AdminPortal.css";

const computeExpiryIso = (issueIso) => {
  if (!issueIso) return "";
  const d = new Date(issueIso);
  if (isNaN(d.getTime())) return "";
  d.setMonth(d.getMonth() + 3);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

function AdminEditApplication({ onLogout }) {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  const [formData, setFormData] = useState({
    Category: "eVISA (Single Entry)",
    FullName: "",
    PassportNumber: "",
    CountryofCitizenship: "INDIA",
    Gender: "MALE",
    DOB: "",
    POB: "",
    Email: "",
    telephone: "",
    Address: "",
    Password: "",
    Status: "Issued",
    Paragraph: "",
    eVisaNumber: "",
    refNo: "",
    stickerNumber: "",
    issueDate: "",
    expiryDate: "",
    durationOfStay: "30 Days",
    placeOfIssue: "CHENNAI, INDIA",
    remarks: "FOR ISSUE OF VP (SOCIAL) 30 DAYS ONLY",
    visaFee: "MYR 50.00",
    photo: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Search & Edit Application :: Admin Portal";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError("Please enter a Passport Number, Sticker Number, or Email to search.");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const q = searchQuery.trim();
      const payload = q.includes("@")
        ? { Email: q }
        : q.toUpperCase().startsWith("EV") && q.length < 12
        ? { stickerNumber: q, PassportNumber: q }
        : { PassportNumber: q };

      const client = await getAClients(payload);
      setSelectedClient(client);

      setFormData({
        Category: client.Category || "eVISA (Single Entry)",
        FullName: client.FullName || "",
        PassportNumber: client.PassportNumber || "",
        CountryofCitizenship: client.CountryofCitizenship || "INDIA",
        Gender: client.Gender || "MALE",
        DOB: client.DOB ? client.DOB.split("T")[0] : "",
        POB: client.POB || "",
        Email: client.Email || "",
        telephone: client.telephone || "",
        Address: client.Address || "",
        Password: client.Password || "",
        Status: client.Status || "Issued",
        Paragraph: client.Paragraph || "",
        eVisaNumber: client.eVisaNumber || "",
        refNo: client.refNo || "",
        stickerNumber: client.stickerNumber || "",
        issueDate: client.issueDate || "",
        expiryDate: client.expiryDate || "",
        durationOfStay: client.durationOfStay || "30 Days",
        placeOfIssue: client.placeOfIssue || "CHENNAI, INDIA",
        remarks: client.remarks || "FOR ISSUE OF VP (SOCIAL) 30 DAYS ONLY",
        visaFee: client.visaFee || "MYR 50.00",
        photo: client.photo || "",
      });

      setIsSearching(false);
    } catch (err) {
      setIsSearching(false);
      setSelectedClient(null);
      setSearchError(err.message || "No client application record found matching your query.");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "issueDate" && value && value.includes("-")) {
        updated.expiryDate = computeExpiryIso(value);
      }
      return updated;
    });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedClient._id) {
      setErrorMsg("No active application selected for update.");
      return;
    }

    if (!formData.FullName.trim() || !formData.PassportNumber.trim()) {
      setErrorMsg("Full Name and Passport Number cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const updated = await updateClient(selectedClient._id, {
        ...formData,
        FullName: formData.FullName.trim().toUpperCase(),
        PassportNumber: formData.PassportNumber.trim().toUpperCase(),
      });

      setSelectedClient(updated);
      setIsSubmitting(false);
      setSuccessMsg(`eVISA Record for ${updated.FullName} (Passport: ${updated.PassportNumber}) updated successfully.`);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || "Failed to save updates.");
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
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
          <span className="my-admin-breadcrumb__current">Edit Application</span>
        </nav>

        {/* Header */}
        <div className="my-admin-header">
          <span className="my-admin-badge">DATABASE REGISTRY</span>
          <h1 className="my-admin-title">Search &amp; Modify Application</h1>
          <p className="my-admin-sub">
            Jabatan Imigresen Malaysia :: Retrieve and modify issued eVISA records
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="my-admin-nav-tabs">
          <button
            type="button"
            className="my-admin-nav-tab"
            onClick={() => navigate("/admin/new-application")}
          >
            Create New Application
          </button>
          <button
            type="button"
            className="my-admin-nav-tab my-admin-nav-tab--active"
            onClick={() => {}}
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

        {/* Search Bar Card */}
        <div className="my-admin-card" style={{ marginBottom: "2rem" }}>
          <div className="my-admin-card__header">
            <h2 className="my-admin-card__title">
              <span>🔍</span> Query Database by Passport or Sticker Number
            </h2>
          </div>
          <div className="my-admin-card__body">
            <form onSubmit={handleSearch} className="my-admin-search-box">
              <input
                type="text"
                className="my-admin-input my-admin-search-input"
                placeholder="Enter Passport Number (e.g. A0777466) or Sticker Number (e.g. EV7703447)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchError("");
                }}
              />
              <button
                type="submit"
                className="my-admin-btn my-admin-btn--primary"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search Registry"}
              </button>
            </form>

            {searchError && (
              <div className="my-admin-alert my-admin-alert--error" style={{ marginTop: "1rem" }}>
                <span>✕</span>
                <div>{searchError}</div>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Alerts */}
        {successMsg && (
          <div className="my-admin-alert my-admin-alert--success">
            <span>✓</span>
            <div>{successMsg}</div>
          </div>
        )}
        {errorMsg && (
          <div className="my-admin-alert my-admin-alert--error">
            <span>⚠️</span>
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Edit Form */}
        {selectedClient && (
          <form onSubmit={handleSubmit} className="my-admin-card">
            <div className="my-admin-card__header">
              <h2 className="my-admin-card__title">
                <span>✏️</span> Editing Application: {selectedClient.FullName}
              </h2>
              <span className="my-admin-card__status-tag">
                RECORD ID: {selectedClient._id?.slice(-8)}
              </span>
            </div>

            <div className="my-admin-card__body">
              {/* Photo Section */}
              <div className="my-admin-section">
                <h3 className="my-admin-section__title">Applicant Photo</h3>
                <div className="my-admin-photo-section">
                  <div className="my-admin-photo-frame">
                    {formData.photo ? (
                      <img src={formData.photo} alt="Passport Photo" className="my-admin-photo-img" />
                    ) : (
                      <div className="my-admin-photo-placeholder">
                        <p>No Photo</p>
                      </div>
                    )}
                  </div>
                  <div className="my-admin-photo-details">
                    <h4>Current Passport Photo</h4>
                    <div className="my-admin-photo-actions">
                      <label className="my-admin-upload-btn">
                        {formData.photo ? "Replace Photo" : "Upload Photo"}
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
                      </label>
                      {formData.photo && (
                        <button type="button" className="my-admin-remove-photo-btn" onClick={() => handleChange("photo", "")}>
                          Remove Photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* eVISA Identifiers */}
              <div className="my-admin-section">
                <h3 className="my-admin-section__title">eVISA Identifiers &amp; Dates</h3>
                <div className="my-admin-grid-3">
                  <div className="my-admin-field">
                    <label className="my-admin-label">eVISA Number</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.eVisaNumber}
                      onChange={(e) => handleChange("eVisaNumber", e.target.value)}
                    />
                  </div>
                  <div className="my-admin-field">
                    <label className="my-admin-label">eVISA Ref No.</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.refNo}
                      onChange={(e) => handleChange("refNo", e.target.value)}
                    />
                  </div>
                  <div className="my-admin-field">
                    <label className="my-admin-label">Sticker Number</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.stickerNumber}
                      onChange={(e) => handleChange("stickerNumber", e.target.value)}
                    />
                  </div>
                </div>

                <div className="my-admin-grid-3" style={{ marginTop: "1rem" }}>
                  <div className="my-admin-field">
                    <label className="my-admin-label">Issue Date</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.issueDate}
                      onChange={(e) => handleChange("issueDate", e.target.value)}
                    />
                  </div>
                  <div className="my-admin-field">
                    <label className="my-admin-label">Expiry Date (Valid Until)</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.expiryDate}
                      onChange={(e) => handleChange("expiryDate", e.target.value)}
                    />
                  </div>
                  <div className="my-admin-field">
                    <label className="my-admin-label">Duration of Stay</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.durationOfStay}
                      onChange={(e) => handleChange("durationOfStay", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Personal Particulars */}
              <div className="my-admin-section">
                <h3 className="my-admin-section__title">Particulars of Applicant</h3>
                <div className="my-admin-grid-2">
                  <div className="my-admin-field">
                    <label className="my-admin-label">Full Name</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.FullName}
                      onChange={(e) => handleChange("FullName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="my-admin-field">
                    <label className="my-admin-label">Passport Number</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.PassportNumber}
                      onChange={(e) => handleChange("PassportNumber", e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                </div>

                <div className="my-admin-grid-3" style={{ marginTop: "1rem" }}>
                  <div className="my-admin-field">
                    <label className="my-admin-label">Nationality</label>
                    <input
                      type="text"
                      className="my-admin-input"
                      value={formData.CountryofCitizenship}
                      onChange={(e) => handleChange("CountryofCitizenship", e.target.value)}
                    />
                  </div>
                  <div className="my-admin-field">
                    <label className="my-admin-label">Gender</label>
                    <select
                      className="my-admin-select"
                      value={formData.Gender}
                      onChange={(e) => handleChange("Gender", e.target.value)}
                    >
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                    </select>
                  </div>
                  <div className="my-admin-field">
                    <label className="my-admin-label">Status</label>
                    <select
                      className="my-admin-select"
                      value={formData.Status}
                      onChange={(e) => handleChange("Status", e.target.value)}
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
                    <label className="my-admin-label">Remarks</label>
                    <input
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
                <button type="submit" className="my-admin-btn my-admin-btn--primary" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes to Record"}
                </button>
                <Link to="/check-visa" className="my-admin-btn my-admin-btn--secondary">
                  Check Visa Authenticity View &rarr;
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminEditApplication;

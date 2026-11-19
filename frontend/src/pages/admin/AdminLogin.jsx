import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/client.api";
import "../../styles/admin/AdminPortal.css";

function AdminLogin({ isAdminLoggedIn, onLoginSuccess, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login :: JABATAN IMIGRESEN MALAYSIA";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await adminLogin({ username: username.trim(), password });
      setIsSubmitting(false);
      onLoginSuccess(response.token || "admin-authenticated");
      navigate("/admin/new-application");
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || "Invalid admin credentials. Access denied.");
    }
  };

  return (
    <div className="my-admin-page">
      <div className="my-admin-container" style={{ maxWidth: "720px" }}>
        {/* Breadcrumb */}
        <nav className="my-admin-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="my-admin-breadcrumb__link">
            HOME
          </Link>
          <span className="my-admin-breadcrumb__sep">/</span>
          <span className="my-admin-breadcrumb__current">Admin Authentication</span>
        </nav>

        {/* Header */}
        <div className="my-admin-header">
          <span className="my-admin-badge">OFFICIAL USE ONLY</span>
          <h1 className="my-admin-title">Admin Portal Terminal</h1>
          <p className="my-admin-sub">
            Jabatan Imigresen Malaysia :: Immigration Administrative Officer Login
          </p>
        </div>

        {isAdminLoggedIn ? (
          /* When Already Logged In: Show Admin Command Dashboard */
          <div className="my-admin-card">
            <div className="my-admin-card__header">
              <h2 className="my-admin-card__title">
                <span>🛡️</span> Authenticated Administrator Session
              </h2>
              <span className="my-admin-card__status-tag">ACTIVE SESSION</span>
            </div>

            <div className="my-admin-card__body">
              <div className="my-admin-alert my-admin-alert--success">
                <span>✓</span>
                <div>
                  <strong>Session Verified:</strong> You are currently authenticated with administrative authority. You have access to create new visa records and edit existing applications.
                </div>
              </div>

              <div className="my-admin-actions" style={{ marginTop: "1.5rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="my-admin-btn my-admin-btn--primary"
                  onClick={() => navigate("/admin/new-application")}
                >
                  Create New Application
                </button>

                <button
                  type="button"
                  className="my-admin-btn my-admin-btn--secondary"
                  onClick={() => navigate("/admin/edit-application")}
                >
                  Search &amp; Edit Application
                </button>

                <button
                  type="button"
                  className="my-admin-btn my-admin-btn--secondary"
                  style={{ color: "#dc2626", borderColor: "#fca5a5" }}
                  onClick={onLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleSubmit} className="my-admin-card">
            <div className="my-admin-card__header">
              <h2 className="my-admin-card__title">
                <span>🔒</span> Administrator Credentials
              </h2>
              <span className="my-admin-card__status-tag">SECURE ACCESS</span>
            </div>

            <div className="my-admin-card__body">
              {errorMsg && (
                <div className="my-admin-alert my-admin-alert--error" role="alert">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="my-admin-field" style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="admin-user" className="my-admin-label">
                  Admin Username <span className="my-admin-req">*</span>
                </label>
                <input
                  id="admin-user"
                  type="text"
                  className="my-admin-input"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="Enter administrator username"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="my-admin-field" style={{ marginBottom: "1.5rem" }}>
                <label htmlFor="admin-pass" className="my-admin-label">
                  Authorization Password <span className="my-admin-req">*</span>
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  className="my-admin-input"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="Enter administrator password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="my-admin-actions">
                <button
                  type="submit"
                  className="my-admin-btn my-admin-btn--primary"
                  disabled={isSubmitting}
                  style={{ minWidth: "150px" }}
                >
                  {isSubmitting ? "Authenticating..." : "Login to Terminal"}
                </button>

                <button
                  type="button"
                  className="my-admin-btn my-admin-btn--secondary"
                  onClick={() => navigate("/")}
                >
                  Return to Home
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;

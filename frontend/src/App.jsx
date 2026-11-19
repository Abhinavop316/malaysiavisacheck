import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Head from "./components/Head";
import MalaysiaVisaLandingPage from "./components/MalaysiaVisaLandingPage";
import ClientApplicationStatus from "./pages/ClientApplicationStatus";
import LegalNotice from "./pages/LegalNotice";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminNewApplication from "./pages/admin/AdminNewApplication";
import AdminEditApplication from "./pages/admin/AdminEditApplication";
import FaqModal from "./components/FaqModal";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("adminAuthToken") ? true : false;
  });
  const [isVerificationResultView, setIsVerificationResultView] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/check-visa");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminLoginSuccess = (token) => {
    sessionStorage.setItem("adminAuthToken", token || "authenticated");
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("adminAuthToken");
    setIsAdminLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="app-shell">
      {!isVerificationResultView && (
        <Head
          onLoginClick={handleLoginClick}
          onOpenFaq={() => setIsFaqOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
          onAdminLogout={handleAdminLogout}
        />
      )}

      <main className="app-shell__main" role="main">
        <Routes>
          {/* 1. Home Page: Root path with no sub-path */}
          <Route
            path="/"
            element={
              <MalaysiaVisaLandingPage
                onLoginClick={handleLoginClick}
                onOpenFaq={() => setIsFaqOpen(true)}
              />
            }
          />

          {/* 2. Check Visa Page: Dedicated route for verification & status check */}
          <Route
            path="/check-visa"
            element={
              <ClientApplicationStatus
                onOpenFaq={() => setIsFaqOpen(true)}
                onVerificationViewChange={setIsVerificationResultView}
              />
            }
          />

          {/* 3. Privacy Policy Page */}
          <Route
            path="/privacy-policy"
            element={<LegalNotice />}
          />
          <Route
            path="/privacy"
            element={<Navigate to="/privacy-policy" replace />}
          />

          {/* 4. Admin Portal Routes */}
          <Route
            path="/admin-login"
            element={
              <AdminLogin
                isAdminLoggedIn={isAdminLoggedIn}
                onLoginSuccess={handleAdminLoginSuccess}
                onLogout={handleAdminLogout}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminLogin
                isAdminLoggedIn={isAdminLoggedIn}
                onLoginSuccess={handleAdminLoginSuccess}
                onLogout={handleAdminLogout}
              />
            }
          />
          <Route
            path="/admin/new-application"
            element={
              isAdminLoggedIn ? (
                <AdminNewApplication onLogout={handleAdminLogout} />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />
          <Route
            path="/admin/edit-application"
            element={
              isAdminLoggedIn ? (
                <AdminEditApplication onLogout={handleAdminLogout} />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />
          <Route
            path="/new-application"
            element={<Navigate to="/admin/new-application" replace />}
          />
          <Route
            path="/edit-application"
            element={<Navigate to="/admin/edit-application" replace />}
          />

          {/* Aliases for Check Visa */}
          <Route
            path="/client-application-status"
            element={<Navigate to="/check-visa" replace />}
          />
          <Route
            path="/status-check"
            element={<Navigate to="/check-visa" replace />}
          />
          <Route
            path="/evisa-status-check"
            element={<Navigate to="/check-visa" replace />}
          />

          {/* Aliases for Home */}
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          {/* Catch-all */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>

      {isFaqOpen && (
        <FaqModal onClose={() => setIsFaqOpen(false)} />
      )}

      {!isVerificationResultView && (
        <Footer
          onLoginClick={handleLoginClick}
          onOpenFaq={() => setIsFaqOpen(true)}
        />
      )}
    </div>
  );
}

export default App;

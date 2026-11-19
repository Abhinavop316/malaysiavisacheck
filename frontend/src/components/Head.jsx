import React from "react";
import Navbar from "./header/Navbar";
import "../styles/Head.css";

function Head({ onLoginClick, onOpenFaq, isAdminLoggedIn, onAdminLogout }) {
  return (
    <div className="head-shell">
      <Navbar
        onLoginClick={onLoginClick}
        onOpenFaq={onOpenFaq}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogout={onAdminLogout}
      />
    </div>
  );
}

export default Head;

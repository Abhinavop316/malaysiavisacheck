import React from "react";
import { Link } from "react-router-dom";
import "../styles/Breadcrumbs.css";

function Breadcrumbs({ onBackToHome }) {
  return (
    <nav className="my-breadcrumbs" aria-label="Breadcrumb">
      <div className="my-breadcrumbs__inner">
        <ol className="my-breadcrumbs__list">
          <li>
            <Link to="/" className="my-breadcrumbs__link" onClick={onBackToHome}>
              Home (Utama)
            </Link>
          </li>
          <li className="my-breadcrumbs__sep" aria-hidden="true">
            /
          </li>
          <li>
            <Link to="/check-visa" className="my-breadcrumbs__link">
              eVISA Services
            </Link>
          </li>
          <li className="my-breadcrumbs__sep" aria-hidden="true">
            /
          </li>
          <li className="my-breadcrumbs__current" aria-current="page">
            Application Status Verification (Semak Status)
          </li>
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumbs;

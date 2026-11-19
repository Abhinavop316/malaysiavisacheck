import React from "react";
import "../styles/FaqModal.css";

const faqs = [
  {
    q: "What is the Malaysia eVISA?",
    a: "An eVISA is an electronic entry clearance authorization granted by the Immigration Department of Malaysia (Jabatan Imigresen Malaysia) to eligible foreign nationals for travel, study, or expatriate assignments.",
  },
  {
    q: "How can I verify or track my eVISA status on this portal?",
    a: "Click on 'Check eVISA Status' or 'Applicant Login', accept the security terms, and enter your registered Email Address and authorization Password to retrieve your real-time status and official verification note.",
  },
  {
    q: "What do the different application status labels mean?",
    a: "• APPROVED / ISSUED: Your entry clearance is granted and ready for travel.\n• PENDING / UNDER REVIEW: Your file is currently under review by immigration officers.\n• REFUSED / REJECTED: Application did not fulfill entry requirements or documentation criteria.\n• REVOKED: Previously issued clearance was cancelled by the immigration authority.",
  },
  {
    q: "What documents must I present at the Malaysian Immigration entry checkpoint?",
    a: "Foreign visitors must present: 1) A passport valid for at least 6 months; 2) The printed eVISA Verification Note; 3) Confirmed return or onward travel ticket; 4) Proof of accommodation booking; and 5) Adequate financial means for your stay.",
  },
  {
    q: "What should I do if my passport details do not match the eVISA note?",
    a: "If there is any typographical discrepancy between your passport and eVISA (such as spelling of names or passport number), you must contact the administration to update your record before departure, as mismatched records may cause boarding denial.",
  },
];

function FaqModal({ onClose }) {
  return (
    <div className="my-faq-modal">
      <div className="my-faq-modal__backdrop" onClick={onClose}></div>
      <div className="my-faq-modal__dialog">
        <div className="my-faq-modal__header">
          <div className="my-faq-modal__brand">
            <img src="/jim_logo.png" alt="Jabatan Imigresen Malaysia Crest" className="my-faq-modal__crest" />
            <div>
              <h2 className="my-faq-modal__title">Frequently Asked Questions (FAQ)</h2>
              <span className="my-faq-modal__sub">Malaysia eVISA Information & Guidance</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="my-faq-modal__close"
            aria-label="Close FAQ dialog"
          >
            &times;
          </button>
        </div>

        <div className="my-faq-modal__content">
          {faqs.map((item, index) => (
            <div key={index} className="my-faq-item">
              <h3 className="my-faq-item__question">
                <span className="my-faq-item__num">{index + 1}.</span> {item.q}
              </h3>
              <p className="my-faq-item__answer">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="my-faq-modal__footer">
          <button
            type="button"
            onClick={onClose}
            className="my-btn my-btn--primary"
          >
            Close FAQ
          </button>
        </div>
      </div>
    </div>
  );
}

export default FaqModal;

import React, { useEffect, useState } from "react";
import CheckVisaAuthenticity from "../components/CheckVisaAuthenticity";
import ApplicationStatusView from "../components/ApplicationStatusView";
import { getAClients } from "../api/client.api";

function ClientApplicationStatus({ onOpenFaq, onVerificationViewChange }) {
  // step 1: Check eVISA Authenticity Form
  // step 2: Official eVISA Verified Portal View (1:1 with reference image)
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    document.title = "Check eVISA Authenticity :: JABATAN IMIGRESEN MALAYSIA";
    return () => {
      if (onVerificationViewChange) onVerificationViewChange(false);
    };
  }, [onVerificationViewChange]);

  const handleAuthenticityCheck = async ({ passportNumber, stickerNumber }) => {
    setIsLoading(true);
    setApiError("");

    try {
      const payload = {
        PassportNumber: passportNumber,
        StickerNumber: stickerNumber,
        identNum: passportNumber,
      };

      const result = await getAClients(payload);
      setClientData(result);
      setStep(2);
      if (onVerificationViewChange) onVerificationViewChange(true);
      setIsLoading(false);
      window.scrollTo(0, 0);
    } catch (err) {
      setApiError(
        err.message ||
          `No matching eVISA record found for Passport Number: ${passportNumber}. Please ensure your Passport/Document Number and Sticker Number are entered correctly.`
      );
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setClientData(null);
    setApiError("");
    setStep(1);
    if (onVerificationViewChange) onVerificationViewChange(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="client-application-status-page">
      {step === 1 && (
        <CheckVisaAuthenticity
          onCheck={handleAuthenticityCheck}
          isLoading={isLoading}
          apiError={apiError}
          onOpenFaq={onOpenFaq}
        />
      )}

      {step === 2 && clientData && (
        <ApplicationStatusView
          clientData={clientData}
          onNewSearch={handleNewSearch}
        />
      )}
    </div>
  );
}

export default ClientApplicationStatus;

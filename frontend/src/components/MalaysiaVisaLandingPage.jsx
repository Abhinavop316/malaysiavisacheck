import React, { useState, useEffect } from "react";
import "../styles/MalaysiaVisaLandingPage.css";

const announcements = [
  {
    id: 1,
    title: "NOTICE ON VISA FACILITY FOR INDIAN NATIONALS",
    date: "17-Nov-2026",
    content: (
      <>
        <p>
          The Immigration Department of Malaysia (JIM) hereby informs the public that the visa exemption facility for Indian nationals will no longer be available with effect from <strong>1 January 2027</strong>. Accordingly, Indian nationals entering Malaysia from this date onwards will be required to obtain a valid visa prior to their arrival.
        </p>
        <p>
          Visa applications may be submitted through the <strong>MyVISA portal starting 1 December 2026</strong>.
        </p>
        <p className="my-announcement-subtitle">
          <strong>Important Reminder</strong>
        </p>
        <p>
          Applicants are reminded that all visa processing fees paid are strictly non-refundable, regardless of the application outcome, change of policy or any subsequent changes to travel plans.
        </p>
        <p>
          The Immigration Department of Malaysia reserves the right to amend these entry requirements at any time in accordance with directives from the Government of Malaysia.
        </p>
        <p className="my-announcement-authority">
          <strong>IMMIGRATION DEPARTMENT OF MALAYSIA</strong>
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "Multiple Entry Visa (MEV)",
    date: "18-Sep-2026",
    content: (
      <>
        <p>
          <strong>Effective 1 September 2026</strong>, Multiple Entry Visa (MEV) will no longer be available for all nationalities and will be limited to <strong>31 eligible nationalities</strong> for the following purposes:
        </p>
        <div className="my-announcement-list">
          <div>i. Fly &amp; Cruise</div>
          <div>ii. Business</div>
          <div>iii. Medical Treatment</div>
          <div>iv. Wedding Tourism</div>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: "MyTripPass – Travel Emergency, Medical Coverage and Assistance Service",
    date: "16-Nov-2026",
    content: (
      <>
        <p>
          Visitors are strongly advised to obtain travel medical coverage for the full duration of their intended stay in Malaysia. Medical treatment and related healthcare services are chargeable to non-residents, who are responsible for all expenses incurred.
        </p>
        <p>
          <strong>MyTripPass</strong> is an inbound travel platform providing travel medical insurance and emergency assistance services. A digital Certificate of Insurance is issued immediately upon purchase and is highly recommended as a supporting document for Malaysian visa application.
        </p>
        <p>
          For more information, visit{" "}
          <a
            href="https://mytrippass.com"
            target="_blank"
            rel="noopener noreferrer"
            className="my-announcement-link"
          >
            mytrippass.com
          </a>
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "PEMAKLUMAN KEMUDAHAN VISA BAGI WARGANEGARA INDIA",
    date: "17-Nov-2026",
    content: (
      <>
        <p>
          Jabatan Imigresen Malaysia (JIM) dengan ini memaklumkan kepada orang ramai bahawa kemudahan pengecualian visa bagi warganegara India tidak lagi akan diberikan mulai <strong>1 Januari 2027</strong>. Sehubungan itu, warganegara India yang memasuki Malaysia mulai tarikh tersebut diwajibkan mendapatkan visa yang sah sebelum ketibaan mereka.
        </p>
        <p>
          Permohonan visa boleh dikemukakan melalui <strong>portal MyVISA mulai 1 Disember 2026</strong>.
        </p>
        <p className="my-announcement-subtitle">
          <strong>Peringatan Penting</strong>
        </p>
        <p>
          Pemohon diingatkan bahawa semua fi pemprosesan visa yang telah dibayar adalah tidak akan dikembalikan, tanpa mengira keputusan permohonan, perubahan dasar atau sebarang perubahan seterusnya terhadap rancangan perjalanan.
        </p>
        <p>
          Jabatan Imigresen Malaysia berhak untuk meminda syarat-syarat kemasukan ini pada bila-bila masa selaras dengan arahan Kerajaan Malaysia.
        </p>
        <p className="my-announcement-authority">
          <strong>JABATAN IMIGRESEN MALAYSIA</strong>
        </p>
      </>
    ),
  },
  {
    id: 5,
    title: 'Application Expiry for "New Application" and "Pending Payment" Status',
    date: "20-Sep-2026",
    content: (
      <>
        <p>
          Please be informed that, in accordance with the implementation of the Immigration Department of Malaysia's new visa application policy, <strong>effective 1 October 2026</strong>, any application in <strong>"New Application"</strong> or <strong>"Pending Payment"</strong> status for more than <strong>7 working days</strong> will automatically expire and be removed from the <strong>"My Application(s)"</strong> list. This policy applies to all applications, including those created prior to 1 September 2026.
        </p>
        <p>
          If your application expires, you must submit a new application using the updated visa application form.
        </p>
        <p className="my-announcement-closing">
          Thank you for your attention and cooperation.
        </p>
      </>
    ),
  },
];

const heroImages = [
  {
    id: 1,
    src: "/hero_langkawi_eagle.jpg",
    alt: "Dataran Lang Langkawi Eagle Square, Malaysia",
    label: "Dataran Lang, Langkawi",
  },
  {
    id: 2,
    src: "/hero_beach_pier.jpg",
    alt: "Perhentian Island Crystal Waters and Pier, Malaysia",
    label: "Perhentian Island",
  },
  {
    id: 3,
    src: "/hero_kl_towers.jpg",
    alt: "Petronas Twin Towers & Kuala Lumpur Skyline at Night",
    label: "Petronas Twin Towers, KL",
  },
  {
    id: 4,
    src: "/hero_putrajaya_mosque.jpg",
    alt: "Putra Mosque Putrajaya, Malaysia",
    label: "Putra Mosque, Putrajaya",
  },
];

const nationalities = [
  "India",
  "China",
  "Bangladesh",
  "Indonesia",
  "Pakistan",
  "Sri Lanka",
  "Philippines",
  "Myanmar",
  "Nepal",
  "Vietnam",
  "Nigeria",
  "United Kingdom",
  "United States",
  "Australia",
  "Canada",
];

function MalaysiaVisaLandingPage({ onLoginClick, onOpenFaq }) {
  // Hero Image Carousel State (shifting left)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // Announcement Carousel State (shifting left, start on Slide 4 to match reference)
  const [currentAnnouncementSlide, setCurrentAnnouncementSlide] = useState(3);
  const [isAnnouncementPaused, setIsAnnouncementPaused] = useState(false);

  // Eligibility state
  const [selectedNationality, setSelectedNationality] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState(null);

  // Auto-advance hero carousel every 4 seconds unless paused on hover
  useEffect(() => {
    if (isHeroPaused) return;

    const heroTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(heroTimer);
  }, [isHeroPaused]);

  // Auto-advance announcement carousel every 5.5 seconds unless paused on hover
  useEffect(() => {
    if (isAnnouncementPaused) return;

    const annTimer = setInterval(() => {
      setCurrentAnnouncementSlide((prev) => (prev + 1) % announcements.length);
    }, 5500);

    return () => clearInterval(annTimer);
  }, [isAnnouncementPaused]);

  useEffect(() => {
    if (window.location.hash === "#photo-requirements") {
      setTimeout(() => {
        const el = document.getElementById("photo-requirements");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, []);

  const handlePrevHero = () => {
    setCurrentHeroSlide((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const handleNextHero = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrevAnnouncement = () => {
    setCurrentAnnouncementSlide((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const handleNextAnnouncement = () => {
    setCurrentAnnouncementSlide((prev) => (prev + 1) % announcements.length);
  };

  const handleCheckEligibility = (e) => {
    e.preventDefault();
    if (!selectedNationality) {
      alert("Please select your nationality from the list.");
      return;
    }

    if (selectedNationality === "India") {
      setEligibilityResult(
        "Indian Nationals: Visa exemption facility is valid for social visits until 31 December 2026. Mandatory eVISA will take effect from 1 January 2027. Applications can be submitted via MyVISA starting 1 December 2026."
      );
    } else if (selectedNationality === "China") {
      setEligibilityResult(
        "Chinese Nationals: Eligible for 30-day visa-free entry waiver until 31 December 2026. For stays exceeding 30 days or employment/study, an approved eVISA (VTR/VDR) is required."
      );
    } else {
      setEligibilityResult(
        `${selectedNationality} Passport Holders: eVISA (VTR / VDR) is required prior to travel to Malaysia. Ensure your passport has at least 6 months validity.`
      );
    }
  };

  return (
    <div className="my-landing-page">
      {/* 1. HERO SECTION */}
      <section className="my-hero-section">
        <div className="my-hero-section__inner">
          {/* Left Column: Title, Description, Link */}
          <div className="my-hero-section__left">
            <h1 className="my-hero-section__title">
              Official Malaysia eVISA Facilitation &amp; Services
            </h1>
            <p className="my-hero-section__desc">
              eVISA is an easy-to-use online platform that allows foreign nationals to apply for an electronic visa to visit Malaysia, all from the comfort of your home. Designed to be convenient and efficient, it ensures a smooth and professional application process, making your journey to Malaysia hassle-free.
            </p>

            <div className="my-hero-section__actions">
              <button
                type="button"
                className="my-hero-btn"
                onClick={onLoginClick}
              >
                Apply for Visa Now
              </button>
              <button
                type="button"
                className="my-hero-link"
                onClick={onLoginClick}
              >
                Visa Requirements <span className="my-hero-link__arrow">↗</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Sliding Image Carousel (Shifting to Left) */}
          <div className="my-hero-section__right">
            <div
              className="my-hero-slider"
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
              aria-label="Malaysia Travel Highlights Slideshow"
            >
              <div
                className="my-hero-slider__track"
                style={{
                  transform: `translateX(-${currentHeroSlide * 100}%)`,
                }}
              >
                {heroImages.map((img) => (
                  <div key={img.id} className="my-hero-slider__slide">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="my-hero-slider__img"
                    />
                    <div className="my-hero-slider__caption">
                      <span>{img.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. MOVING ANNOUNCEMENT CAROUSEL (SHIFTS TO LEFT ON ADVANCE) */}
        <div
          className="my-announcement-container"
          onMouseEnter={() => setIsAnnouncementPaused(true)}
          onMouseLeave={() => setIsAnnouncementPaused(false)}
          aria-label="Official Announcements Slider"
        >
          <div className="my-announcement-card">
            {/* Prev / Next Navigation Arrows */}
            <button
              type="button"
              className="my-carousel-arrow my-carousel-arrow--prev"
              onClick={handlePrevAnnouncement}
              aria-label="Previous Announcement"
            >
              ‹
            </button>

            <button
              type="button"
              className="my-carousel-arrow my-carousel-arrow--next"
              onClick={handleNextAnnouncement}
              aria-label="Next Announcement"
            >
              ›
            </button>

            {/* Sliding Track Window for Announcements */}
            <div className="my-announcement-track-window">
              <div
                className="my-announcement-track"
                style={{
                  transform: `translateX(-${currentAnnouncementSlide * 100}%)`,
                }}
              >
                {announcements.map((item) => (
                  <div key={item.id} className="my-announcement-slide">
                    <div className="my-announcement-script">Announcement</div>
                    <h2 className="my-announcement-title">{item.title}</h2>
                    <div className="my-announcement-date">{item.date}</div>

                    <div className="my-announcement-body">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE eVISA OPTIONS (Image 1) */}
      <section className="my-section my-section--white">
        <div className="my-section__inner my-options-layout">
          <div className="my-options-left">
            <h2 className="my-section-title">Explore eVISA Options</h2>
            <p className="my-section-desc">
              We invite you to explore our range of eVISA options, meticulously designed to meet your specific travel or business needs. Whether your purpose is leisure, work, or other endeavors, we offer a variety of eVISA options tailored to your requirements.
            </p>
          </div>

          <div className="my-options-right">
            {/* VTR Card */}
            <div className="my-opt-card">
              <div className="my-opt-card__icon-box">
                <svg viewBox="0 0 24 24" fill="currentColor" className="my-opt-icon">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <div className="my-opt-card__body">
                <h3 className="my-opt-card__title">
                  <span className="my-opt-code">VTR</span> Visa Without Reference
                </h3>
                <p className="my-opt-card__text">
                  Required for individuals seeking to enter the country for the purpose of a social visit. This visa is typically issued for those visiting family, friends, or engaging in other social activities.
                </p>
                <button
                  type="button"
                  className="my-opt-card__link-btn"
                  onClick={onLoginClick}
                >
                  Click here to learn more ↗
                </button>
              </div>
            </div>

            {/* VDR Card */}
            <div className="my-opt-card">
              <div className="my-opt-card__icon-box">
                <svg viewBox="0 0 24 24" fill="currentColor" className="my-opt-icon">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                </svg>
              </div>
              <div className="my-opt-card__body">
                <h3 className="my-opt-card__title">
                  <span className="my-opt-code">VDR</span> Visa With Reference
                </h3>
                <p className="my-opt-card__text">
                  Required for students, individuals seeking employment, dependents, and professionals on a visit pass. Before applying for an eVISA, please ensure you have obtained your VDR approval letter.
                </p>
                <p className="my-opt-card__subtext">
                  To learn more, check out the Reference Links section below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PASSPORT PHOTO REQUIREMENTS (Image 2) */}
      <section id="photo-requirements" className="my-section my-section--cyan">
        <div className="my-section__inner my-photo-layout">
          <div className="my-photo-left">
            <h2 className="my-section-title">
              Passport Photo Requirements <span className="my-info-icon">ⓘ</span>
            </h2>
            <p className="my-section-desc">
              Before you submit your application, make sure your passport-sized photo complies with the specification below. Non-compliant photos will lead to rejection of your application.
            </p>

            <ul className="my-photo-checklist">
              <li>
                <span className="my-check-mark">✓</span>
                <span>Full face, front view, with eyes open and a neutral expression.</span>
              </li>
              <li>
                <span className="my-check-mark">✓</span>
                <span>No head covering, except for religious reasons — the face must remain fully visible.</span>
              </li>
              <li>
                <span className="my-check-mark">✓</span>
                <span><strong>VTR Application:</strong> Plain white background, with no border or frame around the photo.</span>
              </li>
              <li>
                <span className="my-check-mark">✓</span>
                <span><strong>VDR Application:</strong> Plain white or plain blue background, with no border or frame around the photo.</span>
              </li>
              <li>
                <span className="my-check-mark">✓</span>
                <span>Photo size of 35mm (width) &times; 50mm (height).</span>
              </li>
              <li>
                <span className="my-check-mark">✓</span>
                <span>Head height of 30–35mm, measured from chin to crown.</span>
              </li>
              <li>
                <span className="my-check-mark">✓</span>
                <span>Top margin of about 5mm and a chin margin of 5–10mm.</span>
              </li>
              <li>
                <span className="my-check-mark">✓</span>
                <span>Image must be clear and sharp — not blurred, tilted, too far, or too small.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. FIND OUT YOUR VISA ELIGIBILITY (Image 3) */}
      <section className="my-section my-section--dark-navy">
        <div className="my-section__inner my-eligibility-layout">
          <div className="my-eligibility-script">Find Out Your Visa Eligibility</div>
          <p className="my-eligibility-desc">
            Check in seconds if you need a visa for your trip—just select your nationality and click 'Find Out Now'.
          </p>

          <form onSubmit={handleCheckEligibility} className="my-eligibility-form">
            <select
              value={selectedNationality}
              onChange={(e) => setSelectedNationality(e.target.value)}
              className="my-eligibility-select"
            >
              <option value="">SELECT YOUR NATIONALITY</option>
              {nationalities.map((country, idx) => (
                <option key={idx} value={country}>
                  {country.toUpperCase()}
                </option>
              ))}
            </select>

            <button type="submit" className="my-eligibility-btn">
              Find Out Now
            </button>
          </form>

          {eligibilityResult && (
            <div className="my-eligibility-result">
              <span className="my-eligibility-result__icon">ℹ️</span>
              <span>{eligibilityResult}</span>
            </div>
          )}
        </div>
      </section>

      {/* 6. DOCUMENT SUBMISSION REQUIREMENTS (Image 4) */}
      <section className="my-section my-section--cyan">
        <div className="my-section__inner my-doc-layout">
          <div className="my-doc-left">
            <img
              src="/form_filling.svg"
              alt="Document Application Form Completion"
              className="my-doc-img"
            />
          </div>

          <div className="my-doc-right">
            <h2 className="my-section-title">Document Submission Requirements</h2>
            <p className="my-section-desc">
              To ensure a smooth application process, kindly provide the following documents:
            </p>

            <div className="my-doc-header-banner">
              <span className="my-doc-code">VTR</span>
              <span>Visa Without Reference</span>
            </div>
            <ul className="my-doc-checklist">
              <li><span className="my-check-mark">✓</span> Passport sized studio photo.</li>
              <li><span className="my-check-mark">✓</span> Passport biodata page with passport validity more than six (6) months from travel date to Malaysia.</li>
              <li><span className="my-check-mark">✓</span> Passport page with previous passport number.</li>
              <li><span className="my-check-mark">✓</span> Round trip flight ticket/ proof of journey.</li>
              <li><span className="my-check-mark">✓</span> Proof of paid accommodation/hotel booking.</li>
              <li><span className="my-check-mark">✓</span> Proof of financial support.</li>
              <li><span className="my-check-mark">✓</span> Birth certificate for minor applicants.</li>
              <li><span className="my-check-mark">✓</span> Other supporting documents.</li>
            </ul>

            <div className="my-doc-header-banner">
              <span className="my-doc-code">VDR</span>
              <span>Visa With Reference</span>
            </div>
            <ul className="my-doc-checklist">
              <li><span className="my-check-mark">✓</span> Visa approval letter.</li>
              <li><span className="my-check-mark">✓</span> Passport biodata page with passport validity more than six (6) months from travel date to Malaysia.</li>
              <li><span className="my-check-mark">✓</span> Passport page with previous passport number.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. 3-STEP PROCESS: APPLY, PAYMENT, DOWNLOAD (Image 5) */}
      <section className="my-section my-section--white">
        <div className="my-section__inner">
          <div className="my-steps-row">
            {/* APPLY */}
            <div className="my-process-card">
              <div className="my-process-card__image-box">
                <img src="/apply_step.svg" alt="Apply for Visa" className="my-process-img" />
              </div>
              <div className="my-process-card__body">
                <h3 className="my-process-card__title">APPLY</h3>
                <p className="my-process-card__desc">
                  Discover and apply for a suitable visa, ensuring that all required documents are ready.
                </p>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="my-process-card">
              <div className="my-process-card__image-box">
                <img src="/payment_step.svg" alt="Make Payment" className="my-process-img" />
              </div>
              <div className="my-process-card__body">
                <h3 className="my-process-card__title">PAYMENT</h3>
                <p className="my-process-card__desc">
                  Proceed with making a payment through our secure payment gateway for your convenience.
                </p>
              </div>
            </div>

            {/* DOWNLOAD */}
            <div className="my-process-card">
              <div className="my-process-card__image-box">
                <img src="/download_step.svg" alt="Download eVISA" className="my-process-img" />
              </div>
              <div className="my-process-card__body">
                <h3 className="my-process-card__title">DOWNLOAD</h3>
                <p className="my-process-card__desc">
                  After approval, a visa download link will be sent to your email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MYVISA MOBILE APP BANNER & QUOTE STRIP (Image 6) */}
      <section className="my-section my-section--cyan my-app-banner-section">
        <div className="my-section__inner my-app-banner-layout">
          <div className="my-app-left">
            <h3 className="my-app-title">
              Take charge of your Malaysia experience with the MYVISA Mobile App.
            </h3>
            <p className="my-app-desc">
              Enjoy a seamless and efficient travel experience, designed to make your trip as smooth and enjoyable as possible.
            </p>

            <div className="my-app-download-row">
              <div className="my-app-badges-col">
                <span className="my-app-dl-label">Download Now!</span>
                <div className="my-app-badges">
                  {/* Google Play */}
                  <a href="#playstore" onClick={(e) => e.preventDefault()} className="my-store-badge">
                    <svg viewBox="0 0 24 24" className="my-store-icon" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a2.03 2.03 0 0 1-.22-.924V2.738c0-.342.08-.658.22-.924z" fill="#00C1FF"/>
                      <path d="M17.556 8.236L13.792 12l3.764 3.764 4.237-2.42c.868-.496.868-1.848 0-2.344l-4.237-2.764z" fill="#FFCE00"/>
                      <path d="M13.792 12L3.609 1.814c.383-.37 1.01-.424 1.572-.102l12.375 7.07-3.764 3.218z" fill="#00E676"/>
                      <path d="M13.792 12l3.764 3.764-12.375 7.07c-.562.322-1.189.268-1.572-.102L13.792 12z" fill="#FF334C"/>
                    </svg>
                    <div className="my-store-text">
                      <span className="my-store-badge__sub">GET IT ON</span>
                      <span className="my-store-badge__main">Google Play</span>
                    </div>
                  </a>

                  {/* App Store */}
                  <a href="#appstore" onClick={(e) => e.preventDefault()} className="my-store-badge">
                    <svg viewBox="0 0 24 24" className="my-store-icon" fill="#FFFFFF">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.77 1.04-1.85.93-2.93-.9.04-1.99.6-2.63 1.37-.58.68-1.08 1.77-.94 2.83 1 .08 2.02-.5 2.64-1.27z"/>
                    </svg>
                    <div className="my-store-text">
                      <span className="my-store-badge__sub">Download on the</span>
                      <span className="my-store-badge__main">App Store</span>
                    </div>
                  </a>

                  {/* AppGallery */}
                  <a href="#appgallery" onClick={(e) => e.preventDefault()} className="my-store-badge">
                    <svg viewBox="0 0 24 24" className="my-store-icon" fill="#E53935">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93c-2.83.48-5.33-1.42-5.81-4.25-.48-2.83 1.42-5.33 4.25-5.81 2.83-.48 5.33 1.42 5.81 4.25.48 2.83-1.42 5.33-4.25 5.81z"/>
                    </svg>
                    <div className="my-store-text">
                      <span className="my-store-badge__sub">EXPLORE IT ON</span>
                      <span className="my-store-badge__main">AppGallery</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="my-app-right">
            <img
              src="/app_phone_mockup.svg"
              alt="MYVISA Mobile App Mockup"
              className="my-app-phone-img"
            />
          </div>
        </div>
      </section>

      {/* Quote Strip below App Banner */}
      <section className="my-quote-strip">
        <div className="my-quote-strip__inner">
          <p className="my-quote-text">
            Discover a captivating world of cultural treasures, modern marvels, and unforgettable adventures.
          </p>
        </div>
      </section>

      {/* 9. FLOATING CUSTOMER HELP AGENT BUTTON */}
      <button
        type="button"
        className="my-floating-agent-btn"
        onClick={onOpenFaq}
        aria-label="Contact Customer Support & FAQ"
        title="Need Help? Click for FAQs and Support"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="my-agent-icon">
          <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9zM7 14v4H6c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h1zm11 3c0 .55-.45 1-1 1h-1v-4h1c.55 0 1 .45 1 1v2z"/>
        </svg>
      </button>
    </div>
  );
}

export default MalaysiaVisaLandingPage;

# Malaysia eVISA Inquiry & Verification Portal (Frontend)

An inspired, modern, and responsive web frontend for the **Malaysia eVISA Verification & Application Tracking System**, inspired by the official eVISA portal layout and aesthetic.

## Features
- **Official Styling & Branding:** Styled in accordance with Malaysian immigration portals with Deep Royal Navy (`#0B2545`), National Yellow/Gold (`#F4B41A`), and Crimson accents.
- **Full Backend Integration:** Communicates with the Express & MongoDB backend (`/get-client`) via `client.api.jsx`.
- **Step-by-Step Flow:**
  1. **Landing Page:** Hero introduction, quick search card, 3-step process guide, eVISA categories (Tourist, Student, Work/Expatriate), and travel advisory notes.
  2. **Security & Privacy Agreement:** Terms of use under the Malaysian data protection regulations.
  3. **Applicant Login Terminal:** Verification via registered Email and password access key.
  4. **Official eVISA Verification Note:** A4-styled digital verification statement featuring dynamic status badge (`APPROVED / ISSUED`, `PENDING / UNDER REVIEW`, `REFUSED`, `REVOKED`), passport details, administrative remarks, digital verification QR code, and barcode.
  5. **Interactive FAQ Modal:** Comprehensive answers to common eVISA inquiries.
  6. **Print / PDF Export Support:** Dedicated `@media print` styling to print or save official eVISA slips cleanly.

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

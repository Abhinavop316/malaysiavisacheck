const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  Category: {
    type: String,
    default: "eVISA (Single Entry)",
  },
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    default: "",
  },
  Gender: {
    type: String,
    default: "MALE",
  },
  Address: {
    type: String,
    default: "",
  },
  telephone: {
    type: String,
    default: "",
  },
  DOB: {
    type: Date,
    required: false,
  },
  POB: {
    type: String,
    default: "",
  },
  CountryofCitizenship: {
    type: String,
    default: "INDIA",
  },
  PassportNumber: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    default: "Issued",
  },
  Paragraph: {
    type: String,
    default: "Official eVISA entry clearance has been approved and issued by the Immigration Department of Malaysia.",
  },
  Password: {
    type: String,
    default: "client123",
  },
  // Auto-generated & specific eVISA fields
  eVisaNumber: {
    type: String, // e.g. EVLHVU485440411485001
    default: "",
  },
  refNo: {
    type: String, // e.g. EV/MLY/2026/00451789 or EVS/40411/OL825/XFTCA932
    default: "",
  },
  stickerNumber: {
    type: String, // e.g. EV7703447
    default: "",
  },
  issueDate: {
    type: String, // e.g. "16 Nov 2026" or "2026-11-20"
    default: "",
  },
  expiryDate: {
    type: String, // e.g. "15 Feb 2027" or "2027-02-20"
    default: "",
  },
  durationOfStay: {
    type: String, // e.g. "30 Days"
    default: "30 Days",
  },
  placeOfIssue: {
    type: String, // e.g. "CHENNAI, INDIA"
    default: "CHENNAI, INDIA",
  },
  remarks: {
    type: String, // e.g. "FOR ISSUE OF VP (SOCIAL) 30 DAYS ONLY"
    default: "FOR ISSUE OF VP (SOCIAL) 30 DAYS ONLY",
  },
  visaFee: {
    type: String, // e.g. "MYR 50.00"
    default: "MYR 50.00",
  },
  travelDocType: {
    type: String, // e.g. "INTERNATIONAL PASSPORT"
    default: "INTERNATIONAL PASSPORT",
  },
  travelDocIssue: {
    type: String,
    default: "",
  },
  travelDocExpiry: {
    type: String,
    default: "",
  },
  photo: {
    type: String, // Base64 data URL
    default: "",
  },
}, { timestamps: true });

const clientModel = mongoose.model('Client', clientSchema);

module.exports = clientModel;

const clientModel = require("../models/client.model");

exports.createClient = async (req, res) => {
    try {
        const {
            Category,
            FullName,
            Email,
            Password,
            Gender,
            Address,
            telephone,
            DOB,
            POB,
            CountryofCitizenship,
            PassportNumber,
            Status,
            Paragraph,
            eVisaNumber,
            refNo,
            stickerNumber,
            issueDate,
            expiryDate,
            durationOfStay,
            placeOfIssue,
            remarks,
            visaFee,
            travelDocType,
            travelDocIssue,
            travelDocExpiry,
            photo,
        } = req.body;

        if (!FullName || !PassportNumber) {
            return res.status(400).json({ message: "Full Name and Passport Number are required." });
        }

        const newClient = new clientModel({
            Category: Category || "eVISA (Single Entry)",
            FullName: FullName.trim(),
            Email: Email ? Email.trim() : `${PassportNumber.trim().toLowerCase()}@evisa.gov.my`,
            Password: Password ? Password.trim() : "client123",
            Gender: Gender || "MALE",
            Address: Address ? Address.trim() : "N/A",
            telephone: telephone ? telephone.trim() : "N/A",
            DOB: DOB || null,
            POB: POB ? POB.trim() : (CountryofCitizenship || "INDIA"),
            CountryofCitizenship: CountryofCitizenship ? CountryofCitizenship.trim() : "INDIA",
            PassportNumber: PassportNumber.trim().toUpperCase(),
            Status: Status || "Issued",
            Paragraph: Paragraph ? Paragraph.trim() : "Official eVISA entry clearance has been approved and issued by the Immigration Department of Malaysia.",
            eVisaNumber: eVisaNumber ? eVisaNumber.trim() : "",
            refNo: refNo ? refNo.trim() : "",
            stickerNumber: stickerNumber ? stickerNumber.trim() : "",
            issueDate: issueDate ? issueDate.trim() : "",
            expiryDate: expiryDate ? expiryDate.trim() : "",
            durationOfStay: durationOfStay ? durationOfStay.trim() : "30 Days",
            placeOfIssue: placeOfIssue ? placeOfIssue.trim() : "CHENNAI, INDIA",
            remarks: remarks ? remarks.trim() : "FOR ISSUE OF VP (SOCIAL) 30 DAYS ONLY",
            visaFee: visaFee ? visaFee.trim() : "MYR 50.00",
            travelDocType: travelDocType ? travelDocType.trim() : "INTERNATIONAL PASSPORT",
            travelDocIssue: travelDocIssue ? travelDocIssue.trim() : "",
            travelDocExpiry: travelDocExpiry ? travelDocExpiry.trim() : "",
            photo: photo || "",
        });

        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAClients = async (req, res) => {
    const { Email, Password, PassportNumber, identNum, stickerNumber, StickerNumber, refNo, eVisaNumber } = req.body;
    const passportToSearch = (PassportNumber || identNum || "").trim();
    const stickerToSearch = (stickerNumber || StickerNumber || "").trim();

    try {
        // If Password is sent, treat as User Login authentication
        if (Password !== undefined) {
            if (!Email || !Email.trim() || !Password || !Password.trim()) {
                return res.status(400).json({ message: "Email ID and Password are required." });
            }

            const client = await clientModel.findOne({
                Email: { $regex: new RegExp(`^${Email.trim()}$`, "i") }
            });

            if (!client || client.Password !== Password.trim()) {
                return res.status(400).json({ message: "Invalid Email ID or Password." });
            }

            return res.status(200).json(client);
        }

        let client = null;

        // 1. If both Passport and Sticker are provided, search match
        if (passportToSearch && stickerToSearch) {
            client = await clientModel.findOne({
                $and: [
                    { PassportNumber: { $regex: new RegExp(`^${passportToSearch}$`, "i") } },
                    { stickerNumber: { $regex: new RegExp(`^${stickerToSearch}$`, "i") } }
                ]
            });
            // Fallback: if existing record didn't have sticker saved, match by passport
            if (!client) {
                client = await clientModel.findOne({
                    PassportNumber: { $regex: new RegExp(`^${passportToSearch}$`, "i") }
                });
            }
        } else if (passportToSearch) {
            client = await clientModel.findOne({
                PassportNumber: { $regex: new RegExp(`^${passportToSearch}$`, "i") }
            });
        } else if (stickerToSearch) {
            client = await clientModel.findOne({
                stickerNumber: { $regex: new RegExp(`^${stickerToSearch}$`, "i") }
            });
        } else if (refNo && refNo.trim()) {
            client = await clientModel.findOne({
                refNo: { $regex: new RegExp(`^${refNo.trim()}$`, "i") }
            });
        } else if (eVisaNumber && eVisaNumber.trim()) {
            client = await clientModel.findOne({
                eVisaNumber: { $regex: new RegExp(`^${eVisaNumber.trim()}$`, "i") }
            });
        } else if (Email && Email.trim()) {
            client = await clientModel.findOne({
                Email: { $regex: new RegExp(`^${Email.trim()}$`, "i") }
            });
        }

        if (!client) {
            return res.status(404).json({
                message: "No matching eVISA record found. Please verify your Passport/Document Number and Sticker Number."
            });
        }

        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.editClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await clientModel.findById(id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        Object.assign(client, req.body);
        await client.save();
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

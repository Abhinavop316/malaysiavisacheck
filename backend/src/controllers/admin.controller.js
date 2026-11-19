const adminModel = require("../models/admin.model");

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const inputUser = String(username).trim();
        const inputPass = String(password).trim();

        // 1. Check environment variables
        const envUsername = (process.env.ADMIN_USERNAME || "admin").trim();
        const envPassword = (process.env.ADMIN_PASSWORD || "adminpassword123").trim();

        if (
            inputUser.toLowerCase() === envUsername.toLowerCase() &&
            (inputPass === envPassword || password === process.env.ADMIN_PASSWORD)
        ) {
            return res.status(200).json({
                success: true,
                message: "Admin authentication successful",
                token: "admin-session-authenticated-token"
            });
        }

        // 2. Check MongoDB Admin collection
        try {
            const dbAdmin = await adminModel.findOne({
                username: { $regex: new RegExp(`^${inputUser}$`, "i") }
            });
            if (dbAdmin && (dbAdmin.password === inputPass || dbAdmin.password === password)) {
                return res.status(200).json({
                    success: true,
                    message: "Admin authentication successful",
                    token: "admin-session-authenticated-token"
                });
            }
        } catch (dbErr) {
            console.error("Admin DB lookup error:", dbErr.message);
        }

        return res.status(401).json({
            success: false,
            message: "Invalid admin credentials. Please check your username and password."
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

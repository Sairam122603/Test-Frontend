require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary OTP storage (use a DB in production)
const otpStorage = {};

// 📌 Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📌 Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 📌 Send OTP API
app.post("/api/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required!" });

    const otp = generateOTP();
    otpStorage[email] = otp;

    try {
        console.log(`🔹 Sending OTP ${otp} to ${email}`);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is: ${otp}`,
        });

        res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending OTP:", error.message);
        res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }
});

// 📌 Resend OTP API
app.post("/api/resend-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required!" });

    const otp = generateOTP();
    otpStorage[email] = otp;

    try {
        console.log(`🔄 Resending OTP ${otp} to ${email}`);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Resent OTP Code",
            text: `Your new OTP is: ${otp}`,
        });

        res.status(200).json({ message: "OTP resent successfully!" });
    } catch (error) {
        console.error("❌ Error resending OTP:", error.message);
        res.status(500).json({ message: "Failed to resend OTP", error: error.message });
    }
});

// 📌 Validate OTP API
app.post("/api/validate-otp", (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required!" });

    if (otpStorage[email] === otp) {
        delete otpStorage[email]; // OTP is valid, remove it
        res.status(200).json({ message: "OTP verified successfully!" });
    } else {
        res.status(401).json({ message: "Invalid OTP" });
    }
});

// 📌 Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

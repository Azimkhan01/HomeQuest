const { user } = require("../Database/registerUsers.js");
const crypto = require("crypto"); // Import crypto for secure OTP generation
const nodemailer = require("nodemailer"); // Import Nodemailer for sending OTP email
const NodeCache = require("node-cache");
const bcrypt = require("bcrypt")
// const { json } = require("body-parser");
// const { get } = require("http");

// Set up cache to store OTPs temporarily
const otpCache = new NodeCache({ stdTTL: 120, checkperiod: 60 }); // TTL = 600s (10 minutes)

// Function to send OTP
const sendOtp = async (req, res) => {
    const verifyEmail = req.body.verifyEmail;  // Directly get verifyEmail from body
    // console.log("Received email:", verifyEmail);

    try {
        // Check if the user exists
        let result = await user.findOne({ "email": verifyEmail });
        // console.log("User found:", result);

        if (result) {
            // User exists, generate a secure OTP
            const otp = generateOtp();

            // Store OTP in cache or database (with an expiration time of 10 minutes)
            otpCache.set(verifyEmail, otp, 600); // Cache for 10 minutes (600 seconds)

            // Send OTP to the user's email
            await sendOtpEmail(verifyEmail, otp);

            // Respond with success message
            res.json({ status: "ok", message: "OTP sent successfully" });
        } else {
            // User not found
            res.status(400).json({ status: "wrong", message: "User not found" });
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

// Helper function to generate OTP using crypto
function generateOtp() {
    // Generate a random 6-digit OTP using crypto.randomBytes
    const otp = crypto.randomBytes(3).toString('hex'); // Generates 6 characters (3 bytes)
    return otp.toUpperCase(); // Return OTP in uppercase
}

// Function to send OTP email using Nodemailer
async function sendOtpEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.email,
            pass: process.env.emailpass,
        },
    });

    try {
        // Send the OTP via email
        await transporter.sendMail({
            from: process.env.email,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}`,
        });
        console.log("OTP sent to:", email);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Failed to send OTP email");
    }
}

const verifyOtp = (req, res) => {
    const { verifyEmailOtp, otp } = req.body; // Get email and OTP from the request body

    // Retrieve the OTP stored in cache for the provided email
    let cachedOtp = otpCache.get(verifyEmailOtp);

    // Check if the OTP from cache matches the one provided in the request
    if (cachedOtp && cachedOtp === otp) {
        otpCache.del(verifyEmailOtp);
        // OTP is correct, send a success response
        res.json({ status: "ok", message: "OTP verified successfully" });

    } else {
        // OTP is incorrect or expired (not found in cache)
        res.json({ status: "wrong", message: "Invalid or expired OTP" });
    }
};

const resetPassword = async (req, res) => {
    const { verifyEmailReset, newPassword } = req.body; // Get email and new password from request body

    try {
        // Find the user by email
        let userRecord = await user.findOne({ email: verifyEmailReset });

        if (!userRecord) {
            return res.status(404).json({ status: "wrong", message: "User not found" });
        }

        // Hash the new password using bcrypt
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Salt rounds = 10

        // Update the user's password in the database
        let updateUser = await user.updateOne({email:verifyEmailReset},{password:hashedPassword});

        // console.log(updateUser)
        // Send success response
        res.json({ status: "ok", message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

module.exports = { verifyOtp, sendOtp, resetPassword };

const jwt = require("jsonwebtoken");
const { listing } = require("../Database/registerUsers");

const getUserListing = async (req, res) => {
    try {
        // Check if token exists
        if (!req.cookies.token) {
            return res.status(403).json({ status: "403", message: "Unauthorized user" });
        }

        // Verify the token
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        // Fetch listings associated with the user
        const listingData = await listing.find({ 'owner': decoded.data["_id"] });

        // Return the fetched data
        res.status(200).json(listingData);
    } catch (error) {
        // Handle JWT errors or database issues
        console.error(error.message);

        // Send appropriate error response
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ status: "401", message: "Invalid or expired token" });
        }

        res.status(500).json({ status: "500", message: "Internal Server Error" });
    }
};

module.exports = { getUserListing };

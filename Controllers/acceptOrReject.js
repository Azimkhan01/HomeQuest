const jwt = require("jsonwebtoken");
const { appointmentConfirmMail } = require("./mailTo.js");
const { agent } = require("../Database/registerUsers.js");

const acceptOrReject = async (req, res) => {
    if (req.cookies.agentToken) {
        try {
            // Decode the JWT token
            const decoded = jwt.verify(req.cookies.agentToken, process.env.JWT_SECRET);
            
            // Handle 'accepted' status
            if (req.body.status === 'accepted') {
                // Send confirmation email
                await appointmentConfirmMail(
                    req.body.email,
                    req.body.username,
                    decoded.data.username,
                    req.body.date,
                    req.body.time,
                    req.body.mode
                );

                // Remove the appointment ID from the agent's appointment array
                await agent.updateOne(
                    { _id: decoded.data["_id"] },  // Find the user by _id
                    { $pull: { appointment: req.body.id } }  // Remove the specific appointment ID
                );

                // Optionally, add the appointment ID to the 'accept' array
                await agent.updateOne(
                    { _id: decoded.data["_id"] },  // Same user
                    { $push: { accept: req.body.id } }  // Add the appointment ID to the 'accept' array
                );

                // Respond with success
                res.status(201).json({ status: "accepted" });
            } 
            // Handle 'rejected' status
            else if (req.body.status === 'rejected') {
                // Remove the appointment ID from the agent's appointment array
                await agent.updateOne(
                    { _id: decoded.data["_id"] },  // Find the user by _id
                    { $pull: { appointment: req.body.id } }  // Remove the specific appointment ID
                );
                await agent.updateOne(
                    { _id: decoded.data["_id"] },  // Same user
                    { $push: { reject: req.body.id } }  // Add the appointment ID to the 'accept' array
                );

                // Respond with success for rejection
                res.status(201).json({ status: "rejected" });
            } 
            else {
                // If the status is neither 'accepted' nor 'rejected'
                res.status(400).json({ status: "error", message: "Invalid status" });
            }
        } catch (error) {
            console.error('Error during appointment acceptance/rejection:', error);
            res.status(500).json({ status: "error", message: "Internal server error" });
        }
    } else {
        res.status(401).json({ status: "error", message: "Unauthorized" });
    }
};

module.exports = { acceptOrReject };

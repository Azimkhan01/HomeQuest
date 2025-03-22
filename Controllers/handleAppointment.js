const jwt = require("jsonwebtoken");
const { agent } = require("../Database/registerUsers.js");
const {
  appointmentReceivedMail,
  appointmentNoticeMail,
} = require("../Controllers/mailTo.js");

// Secret key for JWT verification
const JWT_SECRET = process.env.JWT_SECRET;

const handleAppointment = async (req, res) => {
  try {
    // Check if the token is present
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token is missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Ensure the request body contains data
    if (!req.body || !req.body.agentID) {
      return res.status(400).json({ error: "Bad Request: Missing agent ID" });
    }

    const agentID = req.body.agentID;
    const clientID = decoded.data["_id"];

    // Check in `appointment`
    let result = await agent.findOne({ _id: agentID, appointment: clientID });
      // If found in any field, return false (appointment already exists)
      if (result) {
        return res.status(200).json({ status: false, message: "Appointment already processed" });
      }
    if (!result) {
      // Check in `accept`
      result = await agent.findOne({ _id: agentID, accept: clientID });
      if (result) {
        return res.status(200).json({ status: false, message: "Appointment is accpeted by Agent" });
      }
    }
    if (!result) {
      // Check in `reject`
      result = await agent.findOne({ _id: agentID, reject: clientID });
      if (result) {
        return res.status(200).json({ status: false, message: "Appointment is rejected by Agent" });
      }
    }

  

    // Add appointment to `appointment` array
    const updateResult = await agent.updateOne(
      { _id: agentID },
      { $push: { appointment: clientID } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(500).json({ error: "Failed to book appointment" });
    }

    // Extract appointment details
    const clientName = decoded.data.username || "Client";
    const clientEmail = decoded.data.email || "";
    const agentMail = req.body.agentmail || "";
    const agentName = req.body.agentname || "";

    // Send email notifications
    await Promise.all([
      appointmentNoticeMail(clientEmail, clientName, agentMail, agentName),
      appointmentReceivedMail(clientEmail, clientName),
    ]);

    // Respond with success
    res.status(200).json({ status: true, message: "Appointment booked successfully" });

  } catch (error) {
    console.error("Error handling appointment:", error);

    // Handle JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized: Token has expired" });
    }

    // Generic error response
    res.status(500).json({ error: "An error occurred while handling the appointment" });
  }
};

module.exports = { handleAppointment };

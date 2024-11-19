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
    // Check if the token or admin cookie is present
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
    if (!req.body) {
      return res.status(400).json({ error: "Bad Request: Missing data" });
    }

    // console.log(req.body)
    let result = await agent.findOne({
      _id: req.body.agentID,
      appointment: decoded.data["_id"],
    });
    if (result) {
      res.status(200).json({ status: false });
      // console.log( result)
    } else {
      let updateResultForAgentId = await agent.updateOne(
        { _id: req.body.agentID }, // Find the agent by its _id
        { $push: { appointment: [decoded.data["_id"]] } } // Push the decoded _id into the appointment array
      );

      // console.log(updateResultForAgentId)
      // Extract appointment details from the request body
      const clientName = decoded.data.username || "";
      const clientEmail = decoded.data.email || "";
      const agentMail = req.body.agentmail || "";
      const agentName = req.body.agentname || "";

      // Send notification to the agent and confirmation to the client
      await appointmentNoticeMail(
        clientEmail,
        clientName,
        agentMail,
        agentName
      );
      await appointmentReceivedMail(clientEmail, clientName);

      // Respond with success
      res.status(200).json({ status: true });
    }
  } catch (error) {
    console.error("Error handling appointment:", error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized: Token has expired" });
    }

    // Generic error response
    res
      .status(500)
      .json({ error: "An error occurred while handling the appointment" });
  }
};

module.exports = { handleAppointment };

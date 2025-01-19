const jwt = require('jsonwebtoken');
const { user, agent, listing } = require('../Database/registerUsers');
const { alotAgentSide, alotUserSide } = require('./mailTo');

const alot = async (req, res) => {
    // Check for token
    if (!req.cookies.token) {
        return res.json({ status: 403, message: "Unauthorized user" });
    }

    let decoded;
    try {
        decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(403).json({ status: false, message: "Invalid or expired token" });
    }

    // Check if the agent has already been contacted by this client
    const findAgentAsk = await agent.findOne({
        "_id": req.params.id,
        ask: { $in: [decoded.data['_id']] }
    });

    if (findAgentAsk) {
        return res.json({ status: false, message: "The ask allotment is already in process" });
    }

    // Initialize necessary data
    let agentEmail, agentName, clientData = {};
    const link = "https://chatgpt.com/c/678cdbcc-fd20-800a-a982-7c6182678990"; // Replace with actual link
    const clientEmail = decoded.data.email;

    // Fetch the agent's information
    const getAgent = await agent.findById(req.params.id);
    const updateAgent = await agent.findByIdAndUpdate(
        req.params.id,
        { $push: { ask: decoded.data['_id'] } },
        { new: true }
    );

    agentEmail = getAgent.email;
    agentName = getAgent.username;

    // Prepare client data
    clientData.username = decoded.data.username;
    clientData.contact = decoded.data.email;

    // Send emails
    try {
        await alotAgentSide(agentEmail, clientData, link);
        await alotUserSide(clientEmail, agentName);

        return res.json({ status: true, message: "The client and user email are sent, and the agent will respond soon!" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Error in sending emails." });
    }
}

module.exports = { alot };

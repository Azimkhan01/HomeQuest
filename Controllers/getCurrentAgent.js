const { agent, listing, feed } = require('../Database/registerUsers');
const jwt = require('jsonwebtoken');

const getCurrentAgent = async (req, res) => {
    try {
        // Check if token exists
        const token = req.cookies.agentToken;
        if (!token) {
            return res.status(401).json({ status: false, message: 'Authentication token missing' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.data) {
            return res.status(403).json({ status: false, message: 'Invalid token' });
        }

        // Fetch agent data
        const agentData = await agent.findOne({ _id: decoded.data._id }, { password: 0 });
        const feedData = await feed.find({ owner: decoded.data._id });
        const listingData = await listing.find({ owner: decoded.data._id });

        if (!agentData) {
            return res.status(404).json({ status: false, message: 'Agent not found' });
        }

        // Respond with agent, feed, and listing data
        return res.status(200).json({
            status: true,
            info: agentData,
            agentFeed: feedData,
            agentListing: listingData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

module.exports = { getCurrentAgent };

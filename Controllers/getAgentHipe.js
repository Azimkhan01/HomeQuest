const { listing, agent } = require('../Database/registerUsers');

const getAgentHipe = async (req, res) => {

  // console.log("request")

  try {
    // Check for unauthorized access
    if (!req.cookies.token) {
      return res.status(401).json({
        status: "Unauthorized user",
        message: "The API you are asking for is not available for unauthorized users",
      });
    }

    // Fetch agents with their `_id` and `listing`
    const agentData = await agent.find({}, { _id: 1, listing: 1 }).lean();
    // console.log("Agent Data:", agentData);

    // Extract `_id`s from agent data
    const extractedIds = agentData.map((item) => item._id);

    // Fetch listings associated with the agents
    const listingData = await listing
      .find({ owner: { $in: extractedIds } }, { views: 1, like: 1, owner: 1 })
      .lean();
    // console.log("Listing Data:", listingData);

    // Map agent data to include filtered listings
    const modifiedData = agentData.map((e) => {
      // Find matching listings for the agent
      const newls = listingData.filter((list) =>
        e.listing.map((id) => id.toString()).includes(list._id.toString())
      );

      // Return combined object for each agent
      return {
        hipe: newls, // Listings for this agent
        details: e,  // Agent details
      };
    });

    // console.log("Modified Data:", modifiedData[0]); // Example log for first agent
    res.json(modifiedData); // Return the modified data
  } catch (error) {
    console.error("Error in getAgentHipe:", error);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while processing the request.",
    });
  }
};

module.exports = { getAgentHipe };

const { agent, listing } = require("../Database/registerUsers");

const getAgent = async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"]; // Fetch the API key from headers
    const validApiKey = process.env.API_KEY; // Replace with your actual API key

    // Validate the API key
    if (!apiKey || apiKey !== validApiKey) {
      return res.status(401).json({ error: "Unauthorized: Invalid API key" });
    }

    let { id } = req.params;
    let offset = parseInt(id, 10); // Convert `id` to an integer
    let page = req.query.page
    let data;
    if (isNaN(offset) || offset < 0 || page) {
      // console.log("NaN running");

      // Fetch all agents and convert to plain objects
      data = await agent.find({}).limit(page * 10).lean();
      const maxCount = await agent.find({}).countDocuments();
      // Process each agent to find associated listings
      await Promise.all(
        data.map(async (element) => {
          const listings = await listing.find({ owner: element._id }, { views: 1, title: 1, thumbnail: 1 });
          if (listings.length > 0) {
            element.listAvailable = listings; // Add `listAvailable` to the agent object
          } else {
            element.listAvailable = []; // Ensure the field exists even if no listings
          }
        })
      );

      // console.log(data); // Debug: Check updated data in server logs
      return res.json({ 'data': data, 'maxCount': maxCount });
    } else {
      // Fetch paginated agents
      data = await agent.find({}).skip(offset).limit(10).lean(); // Use `.lean()` to get plain objects
      return res.json(data);
    }
  } catch (error) {
    console.error("Error retrieving agents:", error);
    res.status(500).json({ error: "An error occurred while retrieving agents" });
  }
};

module.exports = { getAgent };

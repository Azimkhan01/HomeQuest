const { agent } = require("../Database/registerUsers");

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

    let data;
    if (isNaN(offset) || offset < 0) {
      console.log("Nan running")
      data = await agent.find({}); // Return all agents
    } else {
      data = await agent.find({}).skip(offset).limit(10); // Paginated agent data
    }

    res.json(data);
  } catch (error) {
    console.error("Error retrieving agents:", error);
    res.status(500).json({ error: "An error occurred while retrieving agents" });
  }
};

module.exports = { getAgent };

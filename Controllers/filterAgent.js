const { agent ,listing } = require("../Database/registerUsers");

const filterAgent = async (req, res) => {
  try {
    // console.log("Filter Agent API called...");

    // Destructure parameters from the query string
    const {
      skip = 0, // Default skip value is 0 if not provided
      maxExperience = Infinity,
      minExperience = 0,
      specialization,
      state,
      maxDeals = Infinity,
      minDeals = 0,
      role="agent"
    } = req.query;

    // Build a query object based on available filters
  const query = {};

    if (specialization) query.specialization = specialization;
    if (state && state !== "") query.state = state;
    if (minExperience || maxExperience !== Infinity)
      query.experience = { $gte: Number(minExperience), $lte: Number(maxExperience) };
    if (minDeals || maxDeals !== Infinity)
      query.dealsClosed = { $gte: Number(minDeals), $lte: Number(maxDeals) };
    if(role) query.role = role

    // query.role = "agent"
    console.log('the query is ',role)
    // Count the total number of documents matching the filter
    const totalCount = await listing.countDocuments(query);
    // Fetch filtered agents with pagination
    const result = await listing
      .find(query)
      .skip(parseInt(skip, 10))
      .limit(10);
  console.log(result,totalCount)
    // Return the filtered agents and the total count for pagination
    res.json({
      agents: result,
      totalCount: totalCount,
    });
  } catch (error) {
    console.error("Error retrieving agents:", error);
    res.status(500).json({ error: "An error occurred while retrieving agents" });
  }
};

module.exports = { filterAgent };

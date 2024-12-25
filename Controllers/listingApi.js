
const { listing, user ,agent } = require("../Database/registerUsers");

const listingApi = async (req, res) => {
  try {
    let { id } = req.params;
    let offset = parseInt(id, 10); // Convert `id` to an integer
// console.log(offset)
    // Check if `id` is `NaN` or invalid; if so, retrieve all listings
    let data;
    if (isNaN(offset) || offset < 0) {
      data = await listing.find({'role':{$nin:["agent"]}},{comment:0,reply:0,like:0}); // Return all listings
    // console.log('data is loaded')
    } else {
      // Fetch listings with pagination
      data = await listing.find({'role':{$nin:["agent"]}},{comment:0,reply:0,like:0}).skip(offset).limit(10);
    }

    res.json(data);
  } catch (error) {
    console.error("Error retrieving listing:", error);
    res.status(500).json({ error: "An error occurred while retrieving listings" });
  }
};

const getPropertyDetails = async (req, res) => {
  try {
    // Check if the token exists
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Unauthorized: Token is required" });
    }

    // Check if ID is provided
    if (!req.params.id) {
      return res.status(400).json({ message: "Bad Request: ID parameter is missing" });
    }

    // Fetch property details from the database
    const details = await listing.findById(req.params.id);
    // Check if details exist
    if (details) {
      let byOwner =
            await user.findOne({
            _id:details.owner
            },{username:1,email:1,_id:0})
                                    ||
                                    await agent.findOne({
                                      _id:details.owner
                                    },{username:1,email:1,role:1,_id:0}) 
      // if(!byOwner)
      // {
      //   let byOwner = await agent.findOne({
      //     _id:details.owner
      //   },{username:1,email:1,_id:0}); 
      // }
      return res.status(200).json({details,byOwner});
    } else {
      return res
        .status(404)
        .json({ message: "Property not found: Invalid ID or does not exist" });
    }
  } catch (error) {
    // Catch any unexpected errors and respond
    console.error("Error fetching property details:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error: Unable to fetch details" });
  }
};


module.exports = { listingApi , getPropertyDetails };
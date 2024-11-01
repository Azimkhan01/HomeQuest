const { listing } = require("../Database/registerUsers");
const listingApi = async (req, res) => {
  let data = await listing.find({},{});
  res.json(data);
};

module.exports = { listingApi };

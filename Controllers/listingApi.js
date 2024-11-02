const express = require("express");
const router = express.Router();
const { listing } = require("../Database/registerUsers");

const listingApi = async (req, res) => {
  try {
    const { id } = req.params;
  console.log(Math.round(id / 10) * 10)

    if (id) {
      // If id is provided, find listing by id
      data = await listing.find({}).skip(Math.round(id / 10) * 10).limit(10);
    } else {
      // If no id is provided, retrieve all listings
      data = await listing.find({});
    }

    res.json(data);
  } catch (error) {
    console.error("Error retrieving listing:", error);
    res.status(500).json({ error: "An error occurred while retrieving listings" });
  }
};

router.route("/listing/:id?").get(listingApi);

module.exports = { listingApi };

const express = require("express");
const router = express.Router();
const { listing } = require("../Database/registerUsers");

const listingApi = async (req, res) => {
  try {
    let { id } = req.params;
    let offset = parseInt(id, 10); // Convert `id` to an integer
// console.log(offset)
    // Check if `id` is `NaN` or invalid; if so, retrieve all listings
    let data;
    if (isNaN(offset) || offset < 0) {
      data = await listing.find({}); // Return all listings
    // console.log('data is loaded')
    } else {
      // Fetch listings with pagination
      data = await listing.find({}).skip(offset).limit(10);
    }

    res.json(data);
  } catch (error) {
    console.error("Error retrieving listing:", error);
    res.status(500).json({ error: "An error occurred while retrieving listings" });
  }
};

module.exports = { listingApi };

const express = require("express");
const { listing } = require("../Database/registerUsers");

const filterApi = async (req, res) => {
  try {
    console.log("called...");

    // Destructure parameters from the query string
    const {
      skip = 0, // Default skip value is 0 if not provided
      propertyType,
      listingType,
      maxArea = Infinity,
      minArea = 0,
      maxPrice = Infinity,
      minPrice = 0,
      state,
    } = req.query;
    // console.log(req.query)
console.log(skip)
    // Build a query object based on available filters
    const query = {};
    // console.log( listingType,'',propertyType)

    if (propertyType) query.propertyType = propertyType;
    if ( listingType) query.listingType =  listingType;
    if (state && state != '') query.state = state;
    if (minArea || maxArea !== Infinity) query.area = { $gte: Number(minArea), $lte: Number(maxArea) };
    if (minPrice || maxPrice !== Infinity) query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };

    // console.log(query); // Logs the query for debugging

    // Count the total number of documents matching the filter
    const totalCount = await listing.countDocuments(query);

    // Fetch filtered listings with pagination
    const result = await listing
      .find(query)
      .skip(parseInt(skip, 10))
      .limit(10);

    // Return the filtered listings and the total count for pagination
    res.json({
      listings: result,
      totalCount: totalCount,
    });
  } catch (error) {
    console.error("Error retrieving listings:", error);
    res.status(500).json({ error: "An error occurred while retrieving listings" });
  }
};

module.exports = { filterApi };

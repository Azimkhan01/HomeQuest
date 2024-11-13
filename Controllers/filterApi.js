const express = require("express");
const { listing } = require("../Database/registerUsers");

const filterApi = async (req, res) => {
  try {
    // Destructure parameters from the URL
    const {
      skip = 0, // Default skip value is 0 if not provided
      propertyType,
      propertyListing,
      maxArea = Infinity,
      minArea = 0,
      maxPrice = Infinity,
      minPrice = 0,
      state,
      location
    } = req.params;

    // Fetch all listings initially
    let result = await listing.find({});
    
    // Filter the results based on the provided parameters
    const newResult = result.filter(item => {
      const matchesType = propertyType ? item.propertyType == propertyType : true;
      const matchesListing = propertyListing ? item.listingType ==  propertyListing : true;
      console.log(''+propertyListing+''+item.listingType)
      const matchesArea = item.area >= parseFloat(minArea) && item.area <= parseFloat(maxArea);
      const matchesPrice = item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice);
      const matchesState = state ? item.state == state : true;
      const matchesLocation = location ? item.location.toLowerCase().includes(location.toLowerCase()) : true;
console.log(''+matchesType + matchesListing + matchesArea + matchesPrice + matchesState + matchesLocation)
      // Return true if all conditions are met
      return matchesType && matchesListing && matchesArea && matchesPrice && matchesState && matchesLocation;
    });

    // Paginate the filtered results
    const paginatedResult = newResult.slice(parseInt(skip, 10), parseInt(skip, 10) + 10);

    res.json(paginatedResult);
  } catch (error) {
    console.error("Error retrieving listings:", error);
    res.status(500).json({ error: "An error occurred while retrieving listings" });
  }
};



module.exports = {filterApi};

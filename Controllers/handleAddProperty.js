const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { listing, user } = require("../Database/registerUsers");

const handleAddproperty = async (req, res) => {
  const {
    title,
    propertyType,
    listingType,
    price,
    location,
    area,
    bedrooms,
    bathrooms,
    longitude,
    latitude,
    state
  } = req.body;
console.log(req.body)
  var decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  // console.log(decoded);
  let addListing = await listing.create({
    owner: decoded.data["_id"],
    title: title,
    price: price,
    location: location,
    area: area,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    propertyType: propertyType,
    ListingType: listingType,
    longitude: longitude,
    latitude: latitude,
    state:state
  });

  const updateUserforIdOflisting = await user.updateOne(
    { _id: decoded.data["_id"] },
    { $addToSet: { listing: addListing["_id"] } } // Add only if "newItem" is not already present
  );

  let t = await user.findById(decoded.data["_id"]);
  // console.log(t);
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiration in 1 hour
      data: t, // Custom payload data
    },
    process.env.JWT_SECRET
  );
  res.clearCookie("token");

  // Set the new token as an HTTP-only, secure cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.render("propertyListing", {
    marginAfterFrom1: "10%",
    dispalyForm1: "none",
  });
  // console.log(req.file)
};

module.exports = { handleAddproperty };

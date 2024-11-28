const { listing, user } = require("../Database/registerUsers");
const jwt = require("jsonwebtoken");
const path = require("path");

const handleUploadImageListing = async (req, res) => {
  jwt.verify(
    req.cookies.token,
    process.env.JWT_SECRET,
    async function (err, decoded) {
      if (err) {
        return res.status(401).send("Unauthorized access");
      }

      let userInfo = decoded.data;
      // console.log(userInfo['_id'])
      const {
        location,
        title,
        propertyType,
        listingType,
        pincode,
        area,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        price,
        state,
      } = req.body;
      // console.log(req.files);
      const allImages = [];
      req.files.propertyImages.forEach((element) => {
        allImages.push(
          `/public/Assets/ListingImages/${element.filename}`
        );
      });

      // Save the thumbnail and all images
      const thumbnail =
        "/public/Assets/Thumbnails/" +
        req.files.thumbnail[0]["filename"];

      // console.log(req.files.thumbnail[0]['filename'])
      // console.log(allImages)
const video = req.files.propertyVideo[0].filename
      try {
        //   Create a new listing document with image paths
        const newListing = await listing.create({
          pincode,
          latitude,
          longitude,
          propertyType,
          listingType,
          state,
          owner: userInfo["_id"],
          title,
          price,
          location,
          area,
          bedrooms,
          bathrooms,
          thumbnail,
          thumbnailStatus: Boolean(thumbnail),
          AllImages: allImages,
          video:video,
          role:"user",
          view:0,
          like:0
        });

        // Find the user and update the listing array with the new listing ID
        await user.updateOne(
          { _id: userInfo["_id"] },
          { $push: { listing: newListing._id } } // Push the new listing ID into the listing array
        );

        // Re-fetch the user and generate a new token
        const updatedUser = await user.findById(userInfo["_id"]);
        if (!updatedUser) {
          return res.status(404).send("User not found");
        }

        const newToken = jwt.sign(
          { data: updatedUser },
          process.env.JWT_SECRET, // Use environment variable for the secret
          { expiresIn: "1h" }
        );

        res.cookie("token", newToken, { httpOnly: true, secure: true });
        res.redirect("/add-property");
      } catch (error) {
        console.error("Error saving listing:", error);
        res.status(500).send("Error saving listing");
      }
    }
  );
};

module.exports = { handleUploadImageListing };

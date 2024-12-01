const { listing, user, agent } = require("../Database/registerUsers");
const jwt = require("jsonwebtoken");

const handleUploadImageListing = async (req, res) => {
  jwt.verify(
    req.cookies.token || req.cookies.agentToken,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(401).send("Unauthorized access");
      }

      // console.log("Decoded JWT:", decoded); // Debugging: Check the structure of decoded

      const userInfo = decoded?.data; // Ensure decoded has a `data` property
      if (!userInfo || !userInfo.role) {
        console.error("Invalid decoded JWT structure:", userInfo);
        return res.status(400).send("Invalid token structure");
      }

      // console.log("User Role:", userInfo.role); // Debugging: Check user role
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

      try {
        let allImages = [];
        let videoPath = `/public/Assets/Videos/${req.files.propertyVideo[0].filename}`;
        let thumbnailPath = `/public/Assets/Thumbnails/${req.files.thumbnail[0].filename}`;
        let userRole = "";

        if (userInfo.role === "agent") {
          // Agent Logic
          if (!req.files.propertyImages360) {
            return res.status(400).send("Missing 360-degree property images");
          }
          allImages = req.files.propertyImages360.map(
            (file) => `/public/Assets/ListingImages360/${file.filename}`
          );
          userRole = "agent";
        } else {
          // Regular User Logic
          if (!req.files.propertyImages) {
            return res.status(400).send("Missing property images");
          }
          allImages = req.files.propertyImages.map(
            (file) => `/public/Assets/ListingImages/${file.filename}`
          );
          userRole = "user";
        }

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
          thumbnail: thumbnailPath,
          thumbnailStatus: Boolean(thumbnailPath),
          AllImages: allImages,
          video: videoPath,
          role: userRole,
          view: 0,
          like: 0,
        });

        const targetModel = userRole === "agent" ? agent : user;
        await targetModel.updateOne(
          { _id: userInfo["_id"] },
          { $push: { listing: newListing._id } }
        );

        const updatedUser = await targetModel.findById(userInfo["_id"]);
        if (!updatedUser) {
          return res.status(404).send("User/Agent not found");
        }

        const newToken = jwt.sign(
          { data: updatedUser },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        if (userRole === "agent") {
          res.cookie("agentToken", newToken, { httpOnly: true, secure: true });
          res.redirect("/add-agent-property");
        } else {
          res.cookie("token", newToken, { httpOnly: true, secure: true });
          res.redirect("/add-property");
        }
      } catch (error) {
        console.error("Error saving listing:", error);
        res.status(500).send("Error saving listing");
      }
    }
  );
};

module.exports = { handleUploadImageListing };

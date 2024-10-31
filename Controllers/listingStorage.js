const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { user } = require("../Database/registerUsers");

const listingStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = path.join(__dirname, "../public/Assets/ListingImage");
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          cb(err); // Handle error if token verification fails
          return;
        }
        const userId = decoded.data["_id"]; // Get user ID from decoded token
        const timestamp = Date.now(); // Unique timestamp for each upload
        const fileExtension = path.extname(file.originalname); // File extension (e.g., .jpg, .png)
        let filename;

        // Differentiate filename based on field name
        if (file.fieldname === "thumbnail") {
          filename = `${userId}-thumbnail-${timestamp}${fileExtension}.jpg`;
        } else if (file.fieldname === "propertyImages") {
          filename = `${userId}-property-${timestamp}${fileExtension}.jpg`;
        }

        cb(null, filename);

        // // Update database with appropriate image path
        // const imagePath = `http://127.0.0.1:8000/public/Assets/UserImage/${filename}`;
        // if (file.fieldname === 'thumbnail') {
        //     await user.updateOne(
        //         { _id: userId },
        //         { $set: { thumbnailStatus: true, thumbnail: imagePath } }
        //     );
        // } else if (file.fieldname === 'propertyImages') {
        //     await user.updateOne(
        //         { _id: userId },
        //         { $addToSet: { propertyImages: imagePath } } // Add image path to an array
        //     );
        // }
      }
    );
  },
});

module.exports = { listingStorage };

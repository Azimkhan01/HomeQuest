const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const listingStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let directory;
// console.log(file)
    if (file.fieldname === "propertyImages") {
      directory = path.join(__dirname, "../public/Assets/ListingImages");
    } else if (file.fieldname === "propertyVideo") {
      directory = path.join(__dirname, "../public/Assets/ListingVideos");
    } else if (file.fieldname === "thumbnail") {
      directory = path.join(__dirname, "../public/Assets/Thumbnails");
    } else {
      return cb(new Error("Invalid file field name"));
    }

    // Ensure the directory exists
    fs.mkdirSync(directory, { recursive: true });

    cb(null, directory);
  },
  filename: function (req, file, cb) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return cb(err);
        }

        const userId = decoded.data["_id"];
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);

        let filename;
        if (file.fieldname === "thumbnail") {
          filename = `${userId}-thumbnail-${timestamp}${fileExtension}`;
        } else if (file.fieldname === "propertyImages") {
          filename = `${userId}-property-${timestamp}${fileExtension}`;
        } else if (file.fieldname === "propertyVideo") {
          filename = `${userId}-video-${timestamp}${fileExtension}`;
        } else {
          return cb(new Error("Invalid file field name"));
        }

        cb(null, filename);
      }
    );
  },
});

module.exports = { listingStorage };

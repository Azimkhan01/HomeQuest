const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { user,listing } = require("../Database/registerUsers");

const listingStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = path.join(__dirname, "../public/Assets/ListingImages");
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
        

        // Differentiate filename based on field name
        if (file.fieldname === "thumbnail") {
          filename = `${userId}-thumbnail-${timestamp}${fileExtension}`;
        } else if (file.fieldname === "propertyImages") {
          filename = `${userId}-property-${timestamp}${fileExtension}`;
        }

        cb(null, filename);

        
      }
    );
  },
});

module.exports = { listingStorage };

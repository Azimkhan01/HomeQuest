const express = require("express");
const router = express.Router();
let { user } = require("../Database/registerUsers");
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination : function (req,file,cb){
// return cb(null,"./uploads")
//     },
//     filename : function (req,file,cb){
//         console.log(file)
//       return cb(null,`${Date.now()}-${file.originalname}`);
//     }
//    })

// const upload = multer({storage});

const { signup } = require("../Controllers/signup");
const { signupUser } = require("../Controllers/signupUser");
const { login } = require("../Controllers/login");
const { loginUser } = require("../Controllers/loginUser");
const { about } = require("../Controllers/about");
const { home } = require("../Controllers/home");
const { handleHome } = require("../Controllers/handleHome");
const { error } = require("../Controllers/error");
const { main } = require("../Controllers/main");
// const { mainup } = require("../Controllers/mainup");
// const { userApi } = require("../Controllers/userApi");
const { profile } = require("../Controllers/profile");
const {
  handleProfile,
  handleReset,
  handleLogout,
} = require("../Controllers/handleProfile");
const { addProperty } = require("../Controllers/addProperty");

//image

const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const {
  handleUploadImageListing,
} = require("../Controllers/handleUploadImageListing");
const { listingStorage } = require("../Controllers/listingStorage.js");
const { states } = require("../Controllers/states.js");
const { listingApi } = require("../Controllers/listingApi.js");
const { getLoginUser } = require("../Controllers/getLoginUser.js");
const { list } = require("../Controllers/list.js");
const { deleteListing } = require("../Controllers/deleteListing.js");
// const { dir } = require("console");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = path.join(__dirname, "../public/Assets/UserImage");
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        const userId = decoded.data["_id"]; // Get the user ID from the decoded token
        const filename = `${userId}.jpg`;
        cb(null, decoded.data["_id"] + ".jpg");
        // http://127.0.0.1:8000/public/Assets/Default/defaultimage-removebg-preview.png
        let result = await user.updateOne(
          { _id: decoded.data["_id"] },
          {
            $set: {
              imgStatus: true,
              image: `http://127.0.0.1:8000/public/Assets/UserImage/${filename}`,
            },
          }
        );
        let newToken = await user.findById(decoded.data["_id"], {
          password: 0,
        });
        console.log(newToken);
        console, log(result);
        const token = jwt.sign(
          { data: await user.findById },
          process.env.JWT_SECRET, // Replace with environment variable
          { expiresIn: "1d" }
        );
      }
    );
  },
});

const upload = multer({ storage: storage });
const uploadToListing = multer({ storage: listingStorage }).fields([
  { name: "thumbnail", maxCount: 1 }, // One file for thumbnail
  { name: "propertyImages", maxCount: 10 }, // Up to 10 files for property images
]);
//image

router.route(["/signup"]).get(signup);
router.route("/signup").post(signupUser);
router.route("/login").get(login);
router.route("/login").post(loginUser);
router.route("/about").get(about);
router.route("/home").get(home);
router.route(["/", "/main"]).get(main);
router.route("/home").post(handleHome);
router.route("/profile").get(profile);
router.route("/profile/edit-details").post(handleProfile);
router.route("/profile/reset-password").post(handleReset);
router.route("/profile/logout").get(handleLogout);
router.route("/profile/image").post(upload.single("image"), profile);
router.route("/add-property").get(addProperty);
router
  .route("/upload-property")
  .post(uploadToListing, handleUploadImageListing);
router.route("/list").get(list);
//apis
router.route("/delete-listing/:id").get(deleteListing)
router.route("/getStates").get(states);
router.route("/listing/:id?").get(listingApi);
router.route("/getLoginUser").get(getLoginUser);
//error
router.route("*").get(error);

module.exports = { router };

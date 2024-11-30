const express = require("express");
const router = express.Router();
const fs = require("fs");
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
const { listingApi, getPropertyDetails } = require("../Controllers/listingApi.js");
const { getLoginUser } = require("../Controllers/getLoginUser.js");
const { getViews} = require("../Controllers/getViews")
const { list } = require("../Controllers/list.js");
const { deleteListing } = require("../Controllers/deleteListing.js");

const { stream } = require("../Controllers/stream.js");
const { property } = require("../Controllers/property.js");
const { filterApi } = require("../Controllers/filterApi.js");
const {
  sendOtp,
  verifyOtp,
  resetPassword,
} = require("../Controllers/sendOtp.js");
const { agent } = require("../Controllers/agent.js");
const { admin } = require("../Controllers/admin.js");
const { getAgent } = require("../Controllers/getAgent.js");
const { agentStorage, handleAdmin } = require("../Controllers/handleAdmin.js");
const { agentListing } = require("../Controllers/agentListing.js");
const { filterAgent } = require("../Controllers/filterAgent.js");
const {handleAppointment} = require("../Controllers/handleAppointment.js");
const { agentDashboard } = require("../Controllers/agentDashboard.js");
const { getAppointment } = require("../Controllers/getAppointments.js");
const { acceptOrReject } = require("../Controllers/acceptOrReject.js");
const { propertyDetails } = require("../Controllers/propertyDetails.js");
const { addComment } = require("../Controllers/addComment.js");
const { getComment } = require("../Controllers/getComment.js");
const { addReply } = require("../Controllers/addReply.js");
const { getLike } = require("../Controllers/getLike.js");
const { linkAgent } = require("../Controllers/linkAgent.js");
const { addLink } = require("../Controllers/addLink.js");
const { sendLink } = require("../Controllers/sendLink.js");
// const { decode } = require("punycode");

// const { stream } = require("../Controllers/stream.js");
// const {apiKeyMiddleware} = require("../Controllers/identitiKey.js");

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
              image: `/public/Assets/UserImage/${filename}`,
            },
          }
        );
        let newToken = await user.findById(decoded.data["_id"], {
          password: 0,
        });
        if (decoded.imgStatus) {
          function deleteFileSync(filePath) {
            try {
              fs.unlinkSync(filePath);
              console.log("File deleted successfully");
            } catch (err) {
              console.error(`Error deleting file: ${err}`);
            }
          }

          // Usage
          deleteFileSync(path.join(__dirname, decoded.image));
        }
        // console.log(newToken);
        // console, log(result);
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
  { name: "propertyVideo", maxCount: 1 }, // One file for property video
]);
const uploadAgent = multer({ storage: agentStorage });
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
router.route("/property/:id").get(property);
router.route("/agent").get(agent);
router.route("/admin").get(admin);
router.route("/getAgent").get(getAgent);
router.route("/Dashboard").get(agentDashboard)
router.route("/getAppointments").get(getAppointment)
router.route("/acceptOrReject").post(acceptOrReject)
router.route("/property-details").get(propertyDetails)
//apis
router.route("/delete-listing/:id").get(deleteListing);
router.route("/getStates").get(states);
router.route("/listing/:id?").get(listingApi);
router.route("/getLoginUser").get(getLoginUser);
router.route("/stream/:id").get(stream);
router.route("/filterApi").get(filterApi);
router.route("/verifyOtp").post(verifyOtp);
router.route("/resetPassword").post(resetPassword);
router.route("/sendOtp").post(sendOtp);
router.post("/handleAdmin", uploadAgent.single("photo"), handleAdmin);
router.route("/agentList/:id?").get(agentListing)
router.route("/filterAgent").get(filterAgent);
router.route("/handleAppointment").post(handleAppointment)
router.route("/getAppointments").get(getAppointment)
router.route("/getPropertyDetails/:id").get(getPropertyDetails)
router.route("/getViews/:id").get(getViews)
router.route("/addComment/:id").post(addComment)
router.route("/getComment/:id").get(getComment)
router.route("/addReply/:id").post(addReply)
router.route("/getLike/:id").get(getLike)
router.route("/agentLink/:id?").get(linkAgent)
router.route("/addLink").get(addLink)
router.route("/sendLink").post(sendLink)
//error
router.route("*").get(error);

module.exports = { router };

const express = require('express');
const router = express.Router();
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

const {signup} = require("../Controllers/signup");
const {signupUser} = require("../Controllers/signupUser");
const {login} = require("../Controllers/login");
const {loginUser} =require("../Controllers/loginUser");
const {about} = require("../Controllers/about");
const {home} = require("../Controllers/home");
const {handleHome} = require("../Controllers/handleHome")
const {error} = require("../Controllers/error");
const {main} = require("../Controllers/main");
const {mainup} = require("../Controllers/mainup");
const {userApi} = require("../Controllers/userApi")

router.route(['/signup']).get(signup);
router.route('/signup').post(signupUser);
router.route('/login').get(login);
router.route('/login').post(loginUser);
router.route('/about').get(about);
router.route('/home').get(home);
router.route(['/','/main']).get(main);
router.route("/home").post(handleHome);

//apis

//error
router.route("*").get(error);



module.exports = {router};
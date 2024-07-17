const express = require('express');
const router = express.Router();


const {signup} = require("../Controllers/signup");
const {signupUser} = require("../Controllers/signupUser");
const {login} = require("../Controllers/login");
const {loginUser} =require("../Controllers/loginUser");
const {about} = require("../Controllers/about");
const {home} = require("../Controllers/home");
const {error} = require("../Controllers/error");
const {main} = require("../Controllers/main");
const {userApi} = require("../Controllers/userApi")

router.route(['/signup']).get(signup);
router.route('/signup').post(signupUser);
router.route('/login').get(login);
router.route('/login').post(loginUser);
router.route('/about').get(about);
router.route('/home').get(home);
router.route(['/','']).get(main);
//apis
router.route("/api").get(userApi)
//error
router.route("*").get(error);



module.exports = {router};
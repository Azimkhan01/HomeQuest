const express = require('express');
const router = express.Router();

const {signup} = require("../Controllers/signup");
const {signupUser} = require("../Controllers/signupUser");
const {login} = require("../Controllers/login");
const {loginUser} =require("../Controllers/loginUser");

router.route(['/signup','/']).get(signup);
router.route('/signup').post(signupUser);
router.route('/login').get(login);
router.route('/login').post(loginUser);

module.exports = {router};
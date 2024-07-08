const express = require('express');
const router = express.Router();

const {signup} = require("../Controllers/signup");
const {home} = require("../Controllers/home.js");
const {login} = require("../Controllers/login.js");

router.route('/').get(signup);
router.route('/login').post(login);
router.route('/loginUser').get(login);
router.route('/home').post(home)
module.exports = {router};
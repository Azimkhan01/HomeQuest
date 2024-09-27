var jwt = require("jsonwebtoken");
require("dotenv").config();
const home = (req, res) => {
  let access = req.cookies.token;
  try {
    let decoded = jwt.verify(access, process.env.JWT_SECRET);
    res.render("home", {
      home: "this is home page brother.....",
    });
  } catch (err) {
    res.render("login", {
      error: "Login to access the home page",
    });
    console.log("this is wrong");
  }
};

module.exports = { home };

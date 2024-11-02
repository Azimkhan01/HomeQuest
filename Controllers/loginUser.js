const bcrypt = require("bcrypt");
const colors = require("colors");
var jwt = require("jsonwebtoken");
const { mail } = require("./mailToLogin");
const { user } = require("../Database/registerUsers");
require("dotenv").config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing email or password
    if (!email || !password) {
      return res.render("login", {
        error: "Email and Password are required",
      });
    }

    const result = await user.findOne({ email: email });

    if (result) {
      const isPasswordValid = await bcrypt.compare(password, result.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { data: result },
          process.env.JWT_SECRET , // Replace with environment variable
          { expiresIn: "1d" }
        );

        res.cookie("token", token);

        if (!req.cookies.token) {
          await mail(result.email, result.username);
        }
        // console.log(res)
        return res.redirect("home");
      } else {
        return res.render("login", {
          error: "Incorrect email or password",
        });
      }
    } else {
      return res.render("login", {
        error: "User not found, please try again later",
      });
    }
  } catch (error) {
    console.error(colors.red("Error in loginUser function: "), error);
    return res.render("login", {
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

module.exports = { loginUser };

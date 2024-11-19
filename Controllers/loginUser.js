const bcrypt = require("bcrypt");
const colors = require("colors");
var jwt = require("jsonwebtoken");
const { mail } = require("./mailToLogin");
const { user, agent } = require("../Database/registerUsers");
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

    const agentResult = await agent.findOne({ email: email });

    if (agentResult) {
      if (agentResult.role == "agent") {
        // console.log(agentResult);

        // res.cookie("admin", adminToken);

        bcrypt.compare(password, agentResult.password).then(function (correct) {
          console.log(correct);
          if (correct) {
            let agentToken = jwt.sign(
              { data: agentResult },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );
            res.cookie("agentToken", agentToken);
            res.redirect("/Dashboard");
          } else {
            res.render("login", {
              error: "password or username is wrong",
            });
          }
        });
      }
    } else {
      const result = await user.findOne({ email: email });
      if (result) {
        if (result.role == "admin") {
          // console.log(result.role)

          let adminToken = jwt.sign({ data: result }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.cookie("admin", adminToken);
          if (result.password == password) {
            res.redirect("/admin");
          }
        }
      } else {
        if (result) {
          const isPasswordValid = await bcrypt.compare(
            password,
            result.password
          );

          if (isPasswordValid) {
            const token = jwt.sign(
              { data: result },
              process.env.JWT_SECRET, // Replace with environment variable
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
      }
    }
  } catch (error) {
    console.error(colors.red("Error in loginUser function: "), error);
    return res.render("login", {
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

module.exports = { loginUser };

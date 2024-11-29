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

    // Check if the user is an agent
    const agentResult = await agent.findOne({ email: email });
    if (agentResult) {
      if (agentResult.role === "agent") {
        const correct = await bcrypt.compare(password, agentResult.password);
        if (correct) {
          const agentToken = jwt.sign(
            { data: agentResult },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          res.cookie("agentToken", agentToken);
          return res.redirect("/Dashboard");
        } else {
          return res.render("login", {
            error: "Incorrect email or password",
          });
        }
      }
    }

    // Check if the user is an admin or regular user
    const result = await user.findOne({ email: email });
    if (result) {
      const isPasswordValid = await bcrypt.compare(password, result.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { data: result },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        // Set cookie based on role
        if (result.role === "admin") {
          res.cookie("admin", token);
          return res.redirect("/admin");
        } else {
          res.cookie("token", token);

          // Send login email if no cookie exists
          if (!req.cookies.token) {
            await mail(result.email, result.username);
          }
          return res.redirect("/home");
        }
      } else {
        return res.render("login", {
          error: "Incorrect email or password",
        });
      }
    }

    // If no user or agent was found
    return res.render("login", {
      error: "No user found with this email. Please register first.",
    });
  } catch (error) {
    console.error(colors.red("Error in loginUser function: "), error);
    return res.render("login", {
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

module.exports = { loginUser };

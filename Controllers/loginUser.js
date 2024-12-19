const bcrypt = require("bcrypt");
const colors = require("colors");
const jwt = require("jsonwebtoken");
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

    // First check for agent
    const agentResult = await agent.findOne({ email });
    if (agentResult) {
      const correct = await bcrypt.compare(password, agentResult.password);
      if (correct) {
        const agentToken = jwt.sign(
          {
            data: {
              _id: agentResult._id,
              role: agentResult.role,
              email: agentResult.email
            },
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("agentToken", agentToken, { httpOnly: true, secure: true });
        return res.redirect("/Dashboard");
      } else {
        return res.render("login", { error: "Incorrect email or password" });
      }
    }

    // Check for user or admin
    const result = await user.findOne({ email });
    if (result) {
      const isPasswordValid = await bcrypt.compare(password, result.password);
      if (isPasswordValid) {
        let tokenName = "";
        const token = jwt.sign(
          { data: { _id: result._id, role: result.role, email: result.email } },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        // Determine token name based on role
        if (result.role === "admin") {
          tokenName = "admin";
          res.cookie("admin", token, { httpOnly: true, secure: true });
          return res.redirect("/admin");
        } else if (result.role === "agent") {
          tokenName = "agentToken";
          res.cookie("agentToken", token, { httpOnly: true, secure: true });
          return res.redirect("/Dashboard");
        } else {
          tokenName = "token";
          res.cookie("token", token, { httpOnly: true, secure: true });
          // Send login email if no cookie exists
          if (!req.cookies.token) {
            await mail(result.email, result.username);
          }
          return res.redirect("/home");
        }
      } else {
        return res.render("login", { error: "Incorrect email or password" });
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

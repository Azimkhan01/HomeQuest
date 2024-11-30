const mongoose = require("mongoose");
const colors = require("colors");
const bcrypt = require("bcrypt");
const { mail } = require("./mailTo");
const { user } = require("../Database/registerUsers");

const signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !password) {
    return res.render("signup", {
      error: "Password or Username is required",
    });
  }

  if (!email) {
    console.log(colors.bgYellow("Email is required"));
    return res.render("signup", {
      error: "Email is required",
    });
  }

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      console.log(colors.bgYellow("Email already exists"));
      return res.render("signup", {
        error: "Email already exists",
      });
    }

    const saltRounds = parseInt(process.env.SALTROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await user.create({
      username,
      email,
      password: hashedPassword,
      viewed:[],
      like:[]
    });

    // console.log(colors.green("User added successfully: " + colors.cyan(newUser)));
    res.render("login");

    // Send welcome email
    mail(email, username);
  } catch (error) {
    console.error(colors.red("Error during user signup:", error));
    res.render("signup", {
      error: "An error occurred. Please try again later.",
    });
  }
};

const forAdmin =async (password)=>{
  const saltRounds = parseInt(process.env.SALTROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await user.updateOne({_id:"673987cbaaa824e874cc8988"},{$set:{password:hashedPassword}})
}

forAdmin('123456')

module.exports = { signupUser };

const { user } = require("../Database/signupUsers");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, email, password } = await req.body;
  const saltRounds = 10;
  const myPlaintextPassword = password;
  const someOtherPlaintextPassword = password;

  console.log(username + " " + password + " " + email);
  if (
    (await { username, email, password }) == "" ||
    (await username) == "" ||
    (await password) == ""
  ) {
    await res.render("signup", {
      error: "Username and Password and Email is required",
    });
  } else if (await user.find({ email: email })) {
    console.log("error occurred while finding email in db");
   await res.render("signup", {
      error: "Email already exist",
    });
  } else if (await email) {
    await bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        user
          .create({
            username: username,
            email: email,
            password: hash,
          })
          .catch(async function (MongoServerError) {
            if (await MongoServerError) {
              await res.render("signup", {
                error: "Email already exist",
              });
            }
            console.log(
              "error in inserting the data;\n" + MongoServerError + " <<<<<<<<<"
            );
          });
          await res.render("login")
      });
    });
  } else {
    res.render("login");
  }
};

module.exports = { login };

const mongoose = require("mongoose");
const colors = require("colors");
const { userSchema, dataScehma } = require("../DatabaseSchema/Users");
mongoose
  .connect("mongodb://localhost:27017/HomeQuest")
  .then(async () => {
    console.log(
      colors.bgBlue.blue(
        "Database Connected Succesfully ::  url(mongodb://localhost:27017/) ::  Database: HomeQuest"
      )
    );
  })
  .catch((err) => {
    console.log(colors.red("while connecting database error occurs:" + err));
  });

const user = mongoose.model("users", userSchema);
const data = mongoose.model("datas", dataScehma);

module.exports = { user, data };
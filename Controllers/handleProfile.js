const jwt = require("jsonwebtoken");
const { user } = require("../Database/registerUsers");
const bcrypt = require("bcrypt");
const { profile } = require("./profile");
const handleProfile = (req, res) => {
  if (req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        let d = decoded.data["_id"];
        let result1 = await user.updateOne(
          { _id: d },
          { $set: { name: req.body.name, phone: req.body.phone } }
        );
        let result = await user.findById(d);
        const displayName = result.name || "-";
        const displaySrc = result.image || "-";
        const displayPhone = result.phone || "-";
        result
          ? res.render("profile", {
              imgStatus: result.imgStatus,
              src: displaySrc,
              name: displayName,
              email: result.email,
              phone: displayPhone,
              username: result.username,
              id: result._id,
              listings: "",
              color: "#00B98E",
              error: "Profile edited succesfully",
            })
          : res.render("profile", {
              imgStatus: result.imgStatus,
              src: displaySrc,
              name: displayName,
              email: result.email,
              phone: displayPhone,
              username: result.username,
              id: result._id,
              listings: "",
              color: "tomato",
              error: "Fail to edit try in sometime",
            });
      }
    );
  } else {
    res.redirect("/login");
  }
};

const handleReset = (req, res) => {
  if (req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        let d = decoded.data["_id"];
        let result = await user.findById(d);
        const displayName = result.name || "-";
        const displaySrc = result.image || "-";
        const displayPhone = result.phone || "-";
        let hash = result.password;
        let myPlaintextPassword = req.body["old-password"];

        bcrypt.compare(myPlaintextPassword, hash, function (err, r) {
          if (!r) {
            res.render("profile", {
              imgStatus: result.imgStatus,
              src: displaySrc,
              name: displayName,
              email: result.email,
              phone: displayPhone,
              username: result.username,
              id: result._id,
              listings: "",
              color1: "tomato",
              error2: "Failed try in sometime",
            });
          }
          // result == true
          bcrypt
            .hash(req.body["confirm-password"], parseInt(process.env.saltRounds))
            .then(async function (h) {
              let updates = await user.updateOne(
                { _id: result["_id"] },
                { $set: { password: h } }
              );

              // console.log(updates);

              r
                ? res.render("profile", {
                    imgStatus: result.imgStatus,
                    src: displaySrc,
                    name: displayName,
                    email: result.email,
                    phone: displayPhone,
                    username: result.username,
                    id: result._id,
                    color1: "#00B98E",
                    listings: "",
                    error2: "Password reset succesfully",
                  })
                : res.render("profile", {
                    imgStatus: result.imgStatus,
                    src: displaySrc,
                    name: displayName,
                    email: result.email,
                    phone: displayPhone,
                    username: result.username,
                    id: result._id,
                    listings: "",
                    color1: "tomato",
                    error2: "Failed try in sometime",
                  });
            });
        });
      }
    );
  } else {
    res.redirect("/login");
  }
};

const handleLogout = (req, res) => {
  res.clearCookie("token");
  res.render("login");
};



module.exports = { handleLogout, handleProfile, handleReset,};

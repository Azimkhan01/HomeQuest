let jwt = require("jsonwebtoken");
let {user,agent} = require("../Database/registerUsers.js")
const getLoginUser = async(req, res) => {
  if (req.cookies.agentToken) {
    jwt.verify(
      req.cookies.agentToken,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err) {
          res.render("login");
        } else {
          let result = await agent.findById(decoded.data["_id"],{password:0})
          // console.log(result)
          res.json(result)
        }
      }
    );
  } else if (req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
     async function (err, decoded) {
        if (err) {
          res.render("login");
        } else {
          let result = await user.findById(decoded.data["_id"],{password:0})
          // console.log(result)
          res.json(result)
        }
      }
    );
  } else {
    res.status(401).json({ status: "error" });
  }
};



module.exports = { getLoginUser};

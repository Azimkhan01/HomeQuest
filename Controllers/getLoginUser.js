let jwt = require("jsonwebtoken");
const getLoginUser = (req, res) => {
  if (req.cookies.agentToken) {
    jwt.verify(
      req.cookies.agentToken,
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) {
          res.render("login");
        } else {
          res.json(decoded.data);
        }
      }
    );
  } else if (req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) {
          res.render("login");
        } else {
          res.json(decoded.data);
        }
      }
    );
  } else {
    res.status(401).json({ status: "error" });
  }
};



module.exports = { getLoginUser};

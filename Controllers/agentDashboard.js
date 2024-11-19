const agentDashboard = (req, res) => {
  if (req.cookies.agentToken) {
    res.render("agentDashboard");
  } else {
    // console.log(req.cookies.agentToken)
    // console.log("the token issue")
    res.redirect("/login");
  }
};

module.exports = { agentDashboard };

const login = (req, res) => {
  if (req.cookies.token && req.cookies.agentToken) {
    res.clearCookie("token");
    res.clearCookie("agentToken");
  } else {
    if (req.cookies.token || req.cookies.agentToken) {
      setTimeout(() => {
        req.cookies.agentToken ? res.redirect("/Dashboard") : res.redirect("/home")

      }, 1500);
    } else {
      res.render("login");
    }
  }
};

module.exports = { login };

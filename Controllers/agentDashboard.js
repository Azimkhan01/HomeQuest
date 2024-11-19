const agentDashboard = (req, res) => {
  if (req.cookies.agentToken) {
    if(req.cookies.agentToken && (req.cookies.token || req.cookies.admin))
      {
        if(req.cookies.admin)
        {
          res.clearCookie('admin')
        }
        if(req.cookies.token)
        {
          res.clearCookie('token');
        }
        
        console.log("the token and agentCome in at the same time may be the agent have the user accoount also so we can retrive what agent is looking for in the user account for making more in the agent account !!")
      }
    res.render("agentDashboard");
  } else {
    // console.log(req.cookies.agentToken)
    // console.log("the token issue")
    res.redirect("/login");
  }
};

module.exports = { agentDashboard };

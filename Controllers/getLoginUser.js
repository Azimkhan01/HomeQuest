let jwt = require("jsonwebtoken")
const getLoginUser = (req,res)=>{
if(req.cookies.token)
{
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            res.render('login')
        }else{
            res.json(decoded.data)
        }
      });
}
else{
    res.render('login')
}
}

module.exports = {getLoginUser}
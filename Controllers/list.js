
const list = (req,res)=>{
req.cookies.token ? res.render("list") : res.render("login")
}

module.exports = {list}
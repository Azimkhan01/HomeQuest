const agentProfile = (req,res)=>{
if(req.cookies.agentToken)
{

    res.render("agentProfile")

}else{
    res.redirect("/login")
}
}

module.exports = {agentProfile}
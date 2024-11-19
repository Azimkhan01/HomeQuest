

const agentListing = (req,res)=>{
if(req.cookies.token)
{
    res.render("agentListing")
}else{
    res.redirect("/login")
}
}

module.exports = {agentListing}
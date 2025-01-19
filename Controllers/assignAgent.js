
const assignAgent = (req,res)=>{
    if(req.cookies.token)
    {
        res.render("assignAgent");    
    }else{
        res.redirect("/login");
    }
}

module.exports = {assignAgent}
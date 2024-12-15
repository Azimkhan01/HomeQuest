const pages = (req,res)=>{

    if(req.cookies.token)
    {
        res.render("pages");
    }else{
        res.redirect("/login");
    }

}

module.exports = {pages}
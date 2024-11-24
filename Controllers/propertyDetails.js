const propertyDetails = (req,res)=>{
    console.log(req.query)
    if(req.cookies.token)
    {
        res.render("propertyDetails")
    }else{
        res.redirect("/login")
    }

}

module.exports = {propertyDetails}
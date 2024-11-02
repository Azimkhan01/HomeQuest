
const addProperty= (req,res)=>{

if(req.cookies.token)
{
    res.render("propertyListing")
}
else{
    res.render("login")
}
}

module.exports = {addProperty}
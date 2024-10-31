
const addProperty= (req,res)=>{

if(req.cookies.token)
{
    res.render("propertyListing",
        {
            disableStatus:false
        }
    )
}
else{
    res.render("login")
}
}

module.exports = {addProperty}
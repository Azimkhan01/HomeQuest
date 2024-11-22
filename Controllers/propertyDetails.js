const propertyDetails = (req,res)=>{
    console.log(req.query)
res.render("propertyDetails")
}

module.exports = {propertyDetails}
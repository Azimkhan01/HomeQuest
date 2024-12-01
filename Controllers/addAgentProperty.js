
const addAgentProperty= (req,res)=>{

    if(req.cookies.agentToken)
    {
        res.render("propertyAgentListing")
    }
    else{
        res.render("login")
    }
    }
    
    module.exports = {addAgentProperty}
const {sendLinkTo} = require("../Controllers/mailTo")
const sendLink = async(req,res)=>{
    if(req.cookies.admin)
    {
        sendLinkTo(req.body.email,req.body.link)
        res.json({'status':"ok"})
    }else{
        res.json({"status":"the admin is only allowed."})
    }
   
}



  

module.exports = {sendLink}
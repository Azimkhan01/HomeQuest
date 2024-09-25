const {user} = require("../Database/registerUsers");
const {data} = require("../Database/registerUsers");
const userApi = async (req,res)=>{
  let d =  await user.find()
//   console.log(users+req.params.id)
    res.json(d);
    // console.log(req.params.name,req.params.country,req.params.availibility)
} 

module.exports = {userApi};
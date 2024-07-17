const {user} = require("../Database/registerUsers");
const {data} = require("../Database/registerUsers");
const userApi = async (req,res)=>{
  let d =  await data.find({})
//   console.log(users+req.params.id)
    res.json(d);
}

module.exports = {userApi};
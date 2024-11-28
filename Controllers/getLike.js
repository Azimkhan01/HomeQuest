let jwt = require("jsonwebtoken")
let {user,listing} = require("../Database/registerUsers.js")
const getLike = async (req,res)=>{
    if(req.cookies.token)
    {
        const decoded = jwt.decode(req.cookies.token);
        const  id = req.params.id 
        if(req.query.action == "add")
        {
            let addidInuser = await user.updateOne(
                { "_id": decoded.data['_id'] },{$push: { like: id }});
            let incLikeinListin = await listing.updateOne({"_id":id},{$inc:{like:1}});
            if(addidInuser && incLikeinListin)
res.json({'status':'add'})
        }
        if(req.query.action == 'remove')
        {
let removeFromUser = await user.updateOne({"_id":decoded.data['_id']},{$pull:{like:id}});
  let decrementLikeInListing = await listing.updateOne({"_id":id },{ $inc:{like:-1}});
if(removeFromUser && decrementLikeInListing)
res.json({'status':'removed'})
        }
    }

}

module.exports = {getLike}
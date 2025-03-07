const jwt = require('jsonwebtoken');
const { agent, user, listing } = require("../Database/registerUsers");
const agentThree = async (req, res) => {
    try {
        if (!req.cookies.agentToken) {
            return res.status(401).json({ message: "Only allowed agent can access the data." });
        }

        let box = parseInt(req.params.case);

        let decoded;
        try {
            decoded = jwt.verify(req.cookies.agentToken, process.env.JWT_SECRET);

            if (decoded.data.role == "agent") {

                const agentData = await agent.findById(decoded.data["_id"])
                switch (box) {
                    case 1:
                        {
                            if (agentData.accept.length > 0) {
                                let acceptUser = await user.find({ _id: { $in: agentData.askAccept } }, { _id: 1, username: 1, email: 1, image:1, phone: 1 })
                                if (acceptUser) {
                                    res.json({ acceptUser })
                                } else {
                                    res.status(404).json({ message: "May be some error happen try in sometime" })
                                }
                            } else {
                                res.status(200).json({ message: "The data is less than 0", length: 0 })
                            }
                            break;
                        }

                    case 2:

                    {
                        // accepted allotment
                        if(agentData.askAccept.length > 0)
                        {

                            let acceptedUser = await user.find({_id:{$in:agentData.askAccept}})
                            if (acceptedUser)
                                res.status(200).json(acceptedUser)
                            else
                                res.status(400).json({message:"Some Error Occur"});

                        }else{
                            res.status(200).json({ message: "The data is less than 0", length: 0 })
                        }
                        break;
                    }
                       
                    case 3:
                        {
                            if (agentData.ask.length > 0) {
                                let askUser = await user.find({ _id: { $in: agentData.ask } }, { _id: 1, username: 1, email: 1, listing: 1, image:1, phone:1 }).lean()
                                let findListingOfUser = await listing.find({ owner: { $in: agentData.ask } },{_id:0}).lean()
                                let combi =  askUser.map((user)=>{
                                    let temp = user
                                 let ownerList =  findListingOfUser.filter((listing)=> listing.owner == user['_id'] )
                                 temp["listing"] = ownerList
                                    return temp
                                })
                                // console.log(combi)
                                res.status(200).json(combi)
                            }
                            else {
                                res.status(200).json({ message: "The data is less than 0", length: 0 })
                            }
                            break;
                        }
                    default:
                        return res.status(400).json({ message: "The given parameter is not within the allowed range (1-3)." });
                }

                // res.status(200).json({ message: "Operation executed successfully." });
            } else {
                res.status(401).json({ message: "unauthorised access not allowed !!" })
            }

        } catch (err) {
            console.log(err)
            return res.status(403).json({ message: "Invalid or expired token." });
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};


const handle_slot_action =async (req,res)=>{
    let c = req.params.case
    let id = req.params.id
    decoded = jwt.verify(req.cookies.agentToken, process.env.JWT_SECRET);
    if(c == 1)
    {
        let acceptAsk = await agent.updateOne({_id:decoded.data['_id']},{$push:{askAccept:id}})
        let removeAsk = await agent.updateOne({_id:decoded.data['_id']},{$pull:{ask:id}})

        if(acceptAsk && removeAsk)
            res.status(200).json({message:`The id : ${id} is accepted succesfully`,status:true })
        else
            res.status(400).json({message:"Some error happen why rejecting the slot which is asked for ..."})


    }else if( c == 2)
    {
        let rejectAsk = await agent.updateOne({_id:decoded.data['_id']},{$push:{askReject:id}})
        let removeAsk = await agent.updateOne({_id:decoded.data['_id']},{$pull:{ask:id}})
        if(rejectAsk && removeAsk )
        res.status(200).json({message:`The id : ${id} is accepted succesfully`,status:true })
        else
        res.status(400).json({message:"Some error happen why rejecting the slot which is asked for ..."})

    }else{
        res.status(401).json({message:"The parameter is not in the required range ..."})
    }
}


module.exports = { agentThree , handle_slot_action };

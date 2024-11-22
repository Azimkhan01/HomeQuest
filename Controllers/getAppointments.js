const jwt = require("jsonwebtoken");
const { agent, user } = require("../Database/registerUsers.js");
const mongoose = require("mongoose")
const getAppointment = async (req, res) => {
//   console.log("running");
  if (req.cookies.agentToken) {
    jwt.verify(
      req.cookies.agentToken,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        // console.log(decoded.data)
        let agentId = decoded.data["_id"];
        // console.log(agentId);
        let result = await agent.findOne({ _id: agentId }, { appointment: 1 });
        let ids = result.appointment.map(id => new mongoose.Types.ObjectId(id));
        console.log(result.appointment)
        let userResult = await user.find({ "_id": { $in: ids } },{username:1,phone:1,email:1,image:1});
        res.json(userResult);
      }
    );
  }
};

module.exports = { getAppointment };

const jwt = require('jsonwebtoken');
const { user, listing } = require("../Database/registerUsers");

const getViews = async (req, res) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.render("login"); // Redirect to login page if the token is invalid
      }

      try {
        let id = req.params.id;
        // Check if the user has already viewed the listing ID
        let result = await user.findOne({ "_id": decoded.data["_id"], viewed: id });

        if (!result) {
          // If not already in the viewed array, push it
          let updateResult = await user.updateOne(
            { "_id": decoded.data["_id"] },
            { $push: { viewed: id } }
          );

          let listingUpdate = await listing.updateOne(
            { "_id": id },               
            { $inc: { views: 1 } }        
          );
          

          console.log("Updated user viewed array:", updateResult);
        } else {
          console.log("ID already in viewed array.");
        }

        // Respond with user data
        res.status(200).json({"status":"ok"});

      } catch (dbError) {
        console.error("Database error:", dbError.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
    });
  } else {
    res.status(401).json({ status: "error", message: "Unauthorized: No token provided" });
  }
};



module.exports = { getViews };
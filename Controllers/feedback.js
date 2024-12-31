const { user, feedback: FeedbackModel } = require('../Database/registerUsers');
const jwt = require('jsonwebtoken');

const handleFeedback = async (req, res) => {
    try {
        const token = req.cookies?.token; // Optional chaining to avoid errors if cookies are missing
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized user" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ status: false, message: "Invalid token" });
        }

        const userId = decoded?.data?._id;
        if (!userId) {
            return res.status(400).json({ status: false, message: "User ID not found in token" });
        }

        const { feedback } = req.body;
        if (!feedback) {
            return res.status(400).json({ status: false, message: "Feedback is required" });
        }

        const handleFeedback = await FeedbackModel.create({ feedback, userId });
        if (handleFeedback) {
            return res.json({ status: true, message: "Feedback successfully saved to the database" });
        } else {
            return res.status(500).json({ status: false, message: "Failed to save feedback to the database" });
        }
    } catch (error) {
        console.error("Error in feedback handler:", error);
        return res.status(500).json({ status: false, message: "An unexpected error occurred" });
    }
};

const getFeedback = async(req,res)=>{

    if(req.cookies.admin)
    {
        let feedbackData = await FeedbackModel.find({})
        if (feedbackData)
            res.json({status:true,feedback:feedbackData})
        else 
        res.json({status:false,message:"the feedback from db side some error happen"})
    }else{
        res.json({status:'only admin can access !!'})
    }

}

module.exports = { handleFeedback , getFeedback };

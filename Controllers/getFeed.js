const { feed, agent, user } = require("../Database/registerUsers");
const jwt = require("jsonwebtoken");

const getFeed = async (req, res) => {
    if (req.cookies.token) {
        console.table(req.query);
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const userId = decoded.data._id;

        let f = await feed.find().skip(Number(req.query.current)).limit(Number(req.query.limit)).lean();

        for (let e of f) {
            let a = await agent.findOne({ _id: e.owner }, { username: 1, image: 1, imageStatus: 1 });
            if (a) {
                e.ownerDetails = a;
            }

            if (e.viewedUser && e.viewedUser.includes(userId)) {
                console.log(`User has already viewed post ${e._id}. No update needed.`);
            } else {
                const updateResult = await feed.updateOne(
                    { _id: e._id },
                    { 
                        $push: { viewedUser: userId },
                        $inc: { views: 1 }
                    }
                );
                console.log(`Update result for post ${e._id}:`, updateResult);
                console.log(`View count updated for post ${e._id}. New view count: ${e.views + 1}`);
            }
        }

        res.json({ 'status': "ok", 'feed': f });
    } else {
        res.json({ "status": "error", "message": "Authentication required" });
    }
};

module.exports = { getFeed };

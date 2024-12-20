const { feed, agent } = require("../Database/registerUsers");
const jwt = require("jsonwebtoken");

const feedState = new Map(); // Temporary store for user feed state

const getFeed = async (req, res) => {
    if (req.cookies.token) {
        console.table(req.query);
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const userId = decoded.data._id;

        // Fetch the current state for the user
        let userFeedState = feedState.get(userId);

        if (!userFeedState) {
            // Initialize feed state for the user
            const allFeedIds = (await feed.find({}, { _id: 1 }).lean()).map(f => f._id);
            userFeedState = {
                remainingFeeds: allFeedIds.sort(() => 0.5 - Math.random()), // Shuffle feed IDs
                deliveredFeeds: [],
                exhausted: false, // Tracks if all feeds have been delivered
            };
            feedState.set(userId, userFeedState);
        }

        // If all feeds are delivered, send "end" message
        if (userFeedState.exhausted) {
            return res.json({ status: "end", message: "All feed data delivered" });
        }

        const { limit = 2 } = req.query;

        // Fetch random feeds based on the shuffled list
        const randomFeedIds = userFeedState.remainingFeeds.splice(0, Number(limit));
        userFeedState.deliveredFeeds.push(...randomFeedIds);

        if (randomFeedIds.length === 0) {
            // Mark state as exhausted if no more feeds are available
            userFeedState.exhausted = true;
            feedState.set(userId, userFeedState); // Update the state in the map
            return res.json({ status: "end", message: "All feed data delivered",'feed':[] });
        }

        let f = await feed.find({ _id: { $in: randomFeedIds } }).lean();

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
                console.log(`View count updated for post ${e._id}.`);
            }
        }
        // console.log(feedState);
        res.json({ status: "ok", feed: f });
    } else {
        res.json({ status: "error", message: "Authentication required" });
    }
};

module.exports = { getFeed };

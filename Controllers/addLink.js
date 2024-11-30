const { link } = require("../Database/registerUsers.js");

const addLink = async (req, res) => {
    if (req.cookies.admin) {
        try {
            const currentTime = new Date();
            const timeInHHMMSS = String(currentTime.getHours()).padStart(2, '0') + 
                String(currentTime.getMinutes()).padStart(2, '0') + 
                String(currentTime.getSeconds()).padStart(2, '0');
            const result = await link.create({ timestamp: currentTime, time: timeInHHMMSS });
            console.log(result);
            res.json({ 'id': result["_id"] });
        } catch (error) {
            console.error("Error creating link:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        console.log("Unauthorized access attempt!");
        res.status(403).json({ message: "Unauthorized: Admin access required" });
    }
};

module.exports = { addLink };

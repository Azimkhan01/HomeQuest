const { link } = require("../Database/registerUsers.js");

const linkAgent = async (req, res) => {
    const id = req.params.id;
    
    try {
        const result = await link.findById(id);
        if (result) {
            // console.log(result);
            clearAllCookies(req.cookies,res);
            res.cookie("temporary", "agent", {
                maxAge: 3600 * 1000, // 1 day in milliseconds
                httpOnly: true, // Prevent client-side JavaScript access
                secure: true, // Only sent over HTTPS
              });
            // Check if the time is within 6 hours
            if (isTimeWithin6Hours(result.timestamp, result.time)) {
                return res.render("temporaryAgentForm");
            } else {
                // If time is more than 6 hours away, delete the document
                console.log("Time is more than 6 hours away. Deleting the document.");
                await link.findByIdAndDelete(id);  // Delete the document

                return res.send("The Link is expire please try in some time");  // Redirect after deletion
            }
        } else {
            console.log("Agent not found!");
            return res.redirect("/error");
        }
    } catch (error) {
        console.error("Error retrieving or deleting link:", error);
        return res.send(`<br>&nbsp<i style=color:"#05C46B">The link is Expired !!</i> <br><br> &nbsp Kindly contact to the admin for new Link..`)
    }
};

function isTimeWithin6Hours(timestamp, time) {
    const dateTimeStr = timestamp.toISOString().split('T')[0] + 'T' + 
                        time.substring(0, 2) + ':' + time.substring(2, 4) + ':' + time.substring(4, 6);
    
    const targetDateTime = new Date(dateTimeStr);
    const currentDateTime = new Date();
    const diffInMillis = currentDateTime - targetDateTime;
    const diffInHours = diffInMillis / (1000 * 60 * 60);
    
    // Return true if the time is within 6 hours, else false
    return diffInHours < 6 && diffInHours >= 0;
}

const clearAllCookies = (cookies,res)=>{
    for (const cookieName in cookies) {
        res.clearCookie(cookieName, { path: "/" }); // Clear the cookie
      }
}

module.exports = { linkAgent };

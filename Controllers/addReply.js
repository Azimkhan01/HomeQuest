const { listing } = require("../Database/registerUsers.js");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token decoding

const addReply = async (req, res) => {
    console.log("request received for reply")
  try {
    console.log("Adding reply to comment...");

    // Check for token in cookies
    const token = req.cookies.token;
    if (!token) {
        console.log("no token")
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Verify and decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace `process.env.JWT_SECRET` with your secret key
    } catch (error) {
      console.error("Invalid token:", error);
      return res.status(401).json({ error: "Invalid token. Access denied." });
    }

    // Log the decoded token payload for debugging
    // console.log("Token decoded:", decoded);

    // Validate `id` parameter
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID parameter is missing." });
    }

    // Validate `reply` and `index` in request body
    const replyText = req.body.text;
    const index = req.body.index; // Index of the comment to which the reply is being added
    if (!replyText || typeof replyText !== "string" || replyText.trim() === "") {
      return res.status(400).json({ error: "Reply text is required and must be a non-empty string." });
    }

    if (index === undefined || index < 0) {
      return res.status(400).json({ error: "Invalid comment index." });
    }

    // Log request details for debugging
    console.log(`Reply text: ${replyText}, Comment Index: ${index}, Listing ID: ${id}`);

    // Add the reply to the specified comment in the database
    const result = await listing.updateOne(
      { _id: id, [`comment.${index}`]: { $exists: true } }, // Ensure that the comment at the specified index exists
      {
        $push: {
          [`comment.${index}.reply`]: { // Add the reply to the specified comment's reply array
            text: req.body.text, // Add the reply text
            image: decoded.data.image, // Add the user's image
            username: decoded.data.username, // Add the username of the person replying
            userId: decoded.data['_id'], // Add the user ID of the person replying
            date: new Date(), // Add the timestamp
          }
        }
      }
    );
console.log(result)
    // Check if the update was successful
    // if (result.modifiedCount === 0) {
    //   return res.status(404).json({ error: "Document not found or no update made." });
    // }

    // Send success response
    res.json({ message: "Reply added successfully.", result });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ error: "An error occurred while adding the reply." });
  }
};

module.exports = { addReply };

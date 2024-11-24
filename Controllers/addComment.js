const { listing } = require("../Database/registerUsers.js");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token decoding

const addComment = async (req, res) => {
  try {
    console.log("Adding comment...");

    // Check for token in cookies
    const token = req.cookies.token;
    if (!token) {
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
    console.log("Token decoded:", decoded);
    // Validate `id` parameter
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID parameter is missing." });
    }

    // Validate `comment` in request body
    const comment = req.body.comment;
    if (!comment || typeof comment !== "string" || comment.trim() === "") {
      return res.status(400).json({ error: "Comment is required and must be a non-empty string." });
    }

    // Log request details for debugging
    console.log(`Comment: ${comment}, ID: ${id}`);

    // Add the comment to the database
    const result = await listing.updateOne(
      { _id: id },
      { $push: { comment: { text: comment,image:decoded.data.image,username:decoded.data.username, userId: decoded.data['_id'], date: new Date() } } } // Store comment with user ID and timestamp
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Document not found or no update made." });
    }

    // Send success response
    res.json({ message: "Comment added successfully.", result });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "An error occurred while adding the comment." });
  }
};

module.exports = { addComment };

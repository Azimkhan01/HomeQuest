const { listing } = require('../Database/registerUsers.js');

const getComment = async (req, res) => {
  try {
    // Extract ID and token from the request
    const id = req.params.id;
    const token = req.cookies.token;

    // Validate ID and token
    if (!id || !token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized access or missing ID.",
      });
    }

    // Fetch comments from the database
    const details = await listing.findOne({ _id: id }, { comment: 1, _id: 0 });

    if (!details) {
      return res.status(404).json({
        status: "error",
        message: "No comments found for the given ID.",
      });
    }

    // Respond with the comments
    res.status(200).json({
      status: "success",
      data: details.comment,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching comments.",
    });
  }
};

module.exports = { getComment };

require("dotenv").config();

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.query.apiKey || req.headers["x-api-key"];
  if (apiKey && apiKey === process.env.API_KEY) {
    next(); // API key is valid, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }
};

module.exports = apiKeyMiddleware;
let jwt = require("jsonwebtoken");

const getLoginUser = (req, res) => {
    // Check if 'agentToken' exists in the cookies
    if (req.cookies.agentToken) {
        // Decode the 'agentToken' if it exists
        jwt.verify(req.cookies.agentToken, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                // If there's an error decoding the 'agentToken', render the login page
                res.render('login');
            } else {
                // If the token is valid, send the decoded user data
                res.json(decoded.data);
            }
        });
    } 
    // If 'agentToken' is not found, check for 'token'
    else if (req.cookies.token) {
        // Decode the 'token' if it exists
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                // If there's an error decoding the 'token', render the login page
                res.render('login');
            } else {
                // If the token is valid, send the decoded user data
                res.json(decoded.data);
            }
        });
    } 
    else {
        // If neither 'agentToken' nor 'token' is found in the cookies, render the login page
        res.status(401).json({"status":"error"})
    }
};

module.exports = { getLoginUser };

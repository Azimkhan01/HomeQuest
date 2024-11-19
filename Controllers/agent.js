const agent = (req, res) => {
    if (req.cookies.token) {
        res.status(200).render("agent"); // Use status(200) if you want to explicitly set a success status code
    } else {
        res.status(401).render("login"); // Handle cases where the token is missing
    }
};

module.exports = { agent };

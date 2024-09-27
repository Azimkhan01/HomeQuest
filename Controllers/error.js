const error = (req, res) => {
  res.render("error", {
    error: "404 Not Found",
  });
};

module.exports = { error };

const handleHome = (req, res) => {
  console.log(req.body);
  res.render("home");
};

module.exports = { handleHome };

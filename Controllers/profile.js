const jwt = require("jsonwebtoken");
const { user } = require("../Database/registerUsers");

const profile = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).render("login");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).render("login");
    }

    // Access decoded information, such as user ID
    // console.log("User ID from token:", decoded);
    // console.log("Token:", token);
    let customer = await user
      .findById(decoded.data._id, { password: 0 })
      .catch((err) => {
        console.log("Error occur in feching the data");
      });
    // console.log(customer)
    const displayName = customer.name || "-";
    const displaySrc = customer.image || "-";
    const displayPhone = customer.phone || "-";
    console.log(displaySrc)
    //define listing here
       
    // Render profile page
    res.render("profile", {
      imgStatus: customer.imgStatus,
      src: displaySrc,
      name: displayName,
      email: customer.email,
      phone: displayPhone,
      username: customer.username,
      id: customer._id,
      listings:""
      
    }); // Pass user data to the profile page if needed
  });
};

module.exports = { profile };

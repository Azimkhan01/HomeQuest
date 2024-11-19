const jwt = require("jsonwebtoken");
const { user, listing, agent } = require("../Database/registerUsers");

const profile = async (req, res) => {
  const token = req.cookies.token;
  console.log(token)
  // console.log(! req.cookies.agentToken)
  // console.log(!token && !req.cookies.agentToken);
  if (!token && !req.cookies.agentToken) {
    return res.status(401).render("login");
  }

  if(req.cookies.agentToken && token)
  {
    res.clearCookie('token');
    console.log("the token and agentCome in at the same time may be the agent have the user accoount also so we can retrive what agent is looking for in the user account for making more in the agent account !!")
  }

  jwt.verify(
    token || req.cookies.agentToken,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        // console.log("err")
        return res.status(401).render("login");
      }

      // Access decoded information, such as user ID
      console.log("User ID from token:", decoded);
      // console.log("Token:", token);
      if (req.cookies.agentToken) {
        let customer = await agent
          .findById(decoded.data._id, { password: 0 })
          .catch((err) => {
            console.log("Error occur in feching the data");
          });
        console.log(customer.name);
        const displayName = customer.name || "-";
        const displaySrc = customer.image || "-";
        const displayPhone = customer.phone || "-";
        // console.log(displaySrc)
        //define listing here
        const token = jwt.sign(
          { data: customer },
          process.env.JWT_SECRET, // Replace with environment variable
          { expiresIn: "1d" }
        );
        res.cookie("token", token);

        let displayListing = await listing.find({
          _id: { $in: customer.listing },
        });
        // console.log(displayListing)

        // Render profile page
        res.render("profile", {
          imgStatus: customer.imgStatus,
          src: displaySrc,
          name: displayName,
          email: customer.email,
          phone: displayPhone,
          username: customer.username,
          id: customer._id,
          listings: displayListing,
        }); // Pass user data to the profile page if needed
      } else {
        let customer = await user
          .findById(decoded.data._id, { password: 0 })
          .catch((err) => {
            console.log("Error occur in feching the data");
          });
        // console.log(customer)
        const displayName = customer.name || "-";
        const displaySrc = customer.image || "-";
        const displayPhone = customer.phone || "-";
        // console.log(displaySrc)
        //define listing here
        const token = jwt.sign(
          { data: customer },
          process.env.JWT_SECRET, // Replace with environment variable
          { expiresIn: "1d" }
        );
        res.cookie("token", token);

        let displayListing = await listing.find({
          _id: { $in: customer.listing },
        });
        // console.log(displayListing)

        // Render profile page
        res.render("profile", {
          imgStatus: customer.imgStatus,
          src: displaySrc,
          name: displayName,
          email: customer.email,
          phone: displayPhone,
          username: customer.username,
          id: customer._id,
          listings: displayListing,
        }); // Pass user data to the profile page if needed
      }
    }
  );
};

module.exports = { profile };

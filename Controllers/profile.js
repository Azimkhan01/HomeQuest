const jwt = require("jsonwebtoken");
const { user, listing, agent } = require("../Database/registerUsers");

const profile = async (req, res) => {
  const token = req.cookies.token || req.cookies.agentToken;

  if (!token) {
    return res.status(401).render("login", {
      error: "Unauthorized access. Please log in.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).render("login", {
        error: "Session expired. Please log in again.",
      });
    }

    try {
      const isAgent = !!req.cookies.agentToken;
      const entity = isAgent
        ? await agent.findById(decoded.data._id, { password: 0 })
        : await user.findById(decoded.data._id, { password: 0 });

      if (!entity) {
        return res.status(404).render("login", {
          error: isAgent
            ? "Agent not found. Please contact support."
            : "User not found. Please register or log in.",
        });
      }

      const newToken = jwt.sign(
        { data: entity },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie(isAgent ? "agentToken" : "token", newToken);

      let displayListing = [];
      if (!isAgent) {
        displayListing = await listing.find({ _id: { $in: entity.listing } });
      }

      res.render("profile", {
        imgStatus: entity.imgStatus || false,
        src: entity.image || "-",
        name: entity.name || "-",
        email: entity.email || "-",
        phone: entity.phone || "-",
        username: entity.username || "-",
        id: entity._id,
        listings: displayListing || [],
        isAgent,
        role: isAgent ? "agent" : "user", // Pass role for template rendering
      });
    } catch (error) {
      res.status(500).render("error", { message: "Internal server error" });
    }
  });
};

module.exports = { profile };


// const jwt = require("jsonwebtoken");
// const { user, listing,agent } = require("../Database/registerUsers");

// const profile = async (req, res) => {
//   const token = req.cookies.token || req.cookies.agentToken;

//   console.log(token);

//   // Check if no token is available, redirect to login
//   if (!token) {
//     return res.status(401).render("login");
//   }

//   jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//     if (err) {
//       console.log("Token verification error");
//       return res.status(401).render("login");
//     }

//     // console.log("User ID from token:", decoded);

//     try {
//       // Fetch the user data based on the decoded token
//       const customer = await user.findById(decoded.data._id, { password: 0 }).catch(err => {
//         console.error("Error fetching user data:", err);
//         return null;
//       });

//       // If no user is found, show login page
//       if (!customer) {
//         console.log("Customer not found");
//         return res.status(404).render("login"); // Return error if customer not found
//       }

//       // Prepare data for profile page rendering
//       const displayName = customer.name || "-";
//       const displaySrc = customer.image || '-';
//       const displayPhone = customer.phone || "-";

//       // Generate a new token for the customer
//       const newToken = jwt.sign(
//         { data: customer },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//       );
//       res.cookie("token", newToken);

//       // Fetch listings associated with the user
//       let displayListing = await listing.find({
//         _id: { $in: customer.listing },
//       });

//       // Render profile page with user data
//       res.render("profile", {
//         imgStatus: customer.imgStatus,
//         src: displaySrc,
//         name: displayName,
//         email: customer.email,
//         phone: displayPhone,
//         username: customer.username,
//         id: customer._id,
//         listings: displayListing,
//       });
//     } catch (error) {
//       console.error("Error while processing the profile:", error);
//       res.status(500).render("error", { message: "Internal server error" });
//     }
//   });
// };

// module.exports = { profile };

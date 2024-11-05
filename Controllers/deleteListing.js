let { listing, user } = require("../Database/registerUsers");
let path = require("path");
let fs = require("fs");
function removeBaseUrl(url) {
  const baseUrl = "http://127.0.0.1:8000";
  return url.replace(baseUrl, "");
}

function unlinkFile(filePath) {
  return new Promise((resolve, reject) => {
    // Ensure the file path is absolute
    const absolutePath = path.resolve(filePath);
    // console.log(absolutePath)
    fs.unlink(absolutePath, (err) => {
      if (err) {
        return reject(err); // Reject the promise with the error
      }
      resolve(); // Resolve the promise when the file is deleted
    });
  });
}

const deleteListing = async (req, res) => {
  let deleteId = req.params.id;

  try {
    // Find the listing to get the owner's ID
    let getUser = await listing.findOne({ _id: deleteId });

    if (!getUser) {
      return res.status(404).send("Listing not found"); // Handle listing not found
    }

    let trimThumbnail = getUser.thumbnail.replace("http://127.0.0.1:8000/", "");
    unlinkFile(removeBaseUrl("./" + trimThumbnail))
      .then(() => {
        console.log("File deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
    let trimImages;
    getUser.AllImages.forEach((e) => {
      // console.log(e)
      trimImages = e.replace("http://127.0.0.1:8000/", "");

      unlinkFile("./" + trimImages)
        .then(() => {
          console.log(`Listing From  ${getUser.owner} is deleted succesfully.`);
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    });

    let p = getUser.video;
    let real = path.join(__dirname, `../public/Assets/ListingVideos/${p}`);
    unlinkFile(real);
    let ownerId = getUser.owner; // Get owner's ID

    // Remove the listing ID from the owner's listing array
    let updateUSer = await user.updateOne(
      { _id: ownerId },
      { $pull: { listing: deleteId } } // Remove the deleteId from the listing array
    );

    // Optionally, delete the listing from the listings collection
    // console.log(updateUSer);
    let result = await listing.deleteOne({ _id: deleteId });
    console.log(result);

    res.redirect("/profile"); // Redirect to profile after successful deletion
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).send("Internal server error"); // Handle errors
  }
};

module.exports = { deleteListing };

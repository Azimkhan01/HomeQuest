let { listing, user } = require("../Database/registerUsers"); 

const deleteListing = async (req, res) => {
    let deleteId = req.params.id;

    try {
        // Find the listing to get the owner's ID
        let getUser = await listing.findOne({ _id: deleteId });

        if (!getUser) {
            return res.status(404).send('Listing not found'); // Handle listing not found
        }

        let ownerId = getUser.owner; // Get owner's ID

        // Remove the listing ID from the owner's listing array
       let updateUSer =  await user.updateOne(
            { "_id": ownerId },
            { '$pull': { listing: deleteId } } // Remove the deleteId from the listing array
        );

        // Optionally, delete the listing from the listings collection
        console.log(updateUSer)
        let result = await listing.deleteOne({ _id: deleteId });
        console.log(result)

        res.redirect("/profile"); // Redirect to profile after successful deletion
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).send('Internal server error'); // Handle errors
    }
}

module.exports = { deleteListing };

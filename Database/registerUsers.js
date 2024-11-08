const mongoose = require("mongoose");
const colors = require("colors");
const path = require("path")
const fs = require("fs")
const { userSchema ,ListingSchema} = require("../DatabaseSchema/Users");
mongoose
  .connect("mongodb://localhost:27017/HomeQuest")
  .then(async () => {
    console.log(
      colors.bgBlue.blue(
        "Database Connected Succesfully ::  url(mongodb://localhost:27017/) ::  Database: HomeQuest"
      )
    );
  })
  .catch((err) => {
    console.log(colors.red("while connecting database error occurs:" + err));
  });

const user = mongoose.model("users", userSchema);
const listing = mongoose.model("listings",ListingSchema)

// {
//   const { MongoClient } = require('mongodb');

// // Replace with your MongoDB URI
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);

// async function addListings() {
//     try {
//         await client.connect();
//         const database = client.db('HomeQuest'); // Replace with your database name
//         const collection = database.collection('listings'); // Replace with your collection name

//         const baseListing = {
//             owner: "6729be69495f0a6815ebd007",
//             title: "Luxury apartment front facing",
//             price: 500000,
//             location: "Raheja complex Road, Raheja Co-op housing Society, Kalyan, Kalyan-Dombivli, Kalyan Taluka, Thane, Maharashtra, 421306, India",
//             area: 600,
//             bedrooms: 2,
//             bathrooms: 1,
//             thumbnail: "http://127.0.0.1:8000/public/Assets/Thumbnails/6729be69495f0a6815ebd007-thumbnail-1730901026601.jpeg",
//             thumbnailStatus: true,
//             AllImages: [
//                 "http://127.0.0.1:8000/public/Assets/ListingImages/6729be69495f0a6815ebd007-property-1730901026602.jpeg",
//                 "http://127.0.0.1:8000/public/Assets/ListingImages/6729be69495f0a6815ebd007-property-1730901026603.jpeg",
//                 "http://127.0.0.1:8000/public/Assets/ListingImages/6729be69495f0a6815ebd007-property-1730901026604.jpeg",
//                 "http://127.0.0.1:8000/public/Assets/ListingImages/6729be69495f0a6815ebd007-property-1730901026605.jpeg"
//             ],
//             video: "6729be69495f0a6815ebd007-video-1730901026065.mp4",
//             propertyType: "Apartment",
//             listingType: "For Sale",
//             state: "Maharashtra",
//             pincode: "421301"
//         };

//         // Generate 50 listings with different latitude and longitude
//         const listings = Array.from({ length: 50 }, (_, i) => {
//             return {
//                 ...baseListing,
//                 latitude: (19.2339 + i * 0.001).toFixed(6),  // Adjust latitude slightly for each listing
//                 longitude: (73.1225 + i * 0.001).toFixed(6), // Adjust longitude slightly for each listing
//             };
//         });

//         // Insert multiple listings
//         const result = await collection.insertMany(listings);
//         console.log(`${result.insertedCount} listings added successfully!`);
//     } finally {
//         await client.close();
//     }
// }

// addListings().catch(console.error);

// }


module.exports = { user,listing};
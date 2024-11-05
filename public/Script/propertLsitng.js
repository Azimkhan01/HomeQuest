let title = document.getElementById("propertyTitle");
let propertyType = document.getElementById("propertyType");
let listingType = document.getElementById("listingType");
let price = document.getElementById("price");
let loc = document.getElementById("location");
let area = document.getElementById("area");
let bedrooms = document.getElementById("bedrooms");
let bathrooms = document.getElementById("bathrooms");
let Propertytitle = document.getElementById("property-title");

title.addEventListener("input", (e) => {
  Propertytitle.innerHTML = `<a href="#">${title.value}</a>`;
  if (e.target.value == "") {
    e.target.value = "";
    Propertytitle.innerHTML = "Property Title";
  }
});

let property_type = document.getElementById("property-type");
propertyType.addEventListener("change", (e) => {
  property_type.innerHTML = e.target.value;
  // console.log(change)
});

let property_listing = document.getElementById("listing-type");
listingType.addEventListener("change", (e) => {
  property_listing.innerHTML = e.target.value;
  // console.log(change)
});

let pricePreview = document.getElementById("pricePreview");

price.addEventListener("input", (e) => {
  pricePreview.innerHTML = e.target.value + " ₹";
  if (e.target.value == "") {
    pricePreview.innerHTML = "Price here";
    e.target.value = "Price";
  }
});

let loca = document.getElementById("loca");
loc.addEventListener("input", (e) => {
  loca.innerHTML = `<span style="color:#00B98E"><i class="fa-solid fa-location-dot"></i></span> ${e.target.value}`;
  if (e.target.value == "") {
    loca.innerHTML = "Location Here";
  }
});

area.addEventListener("input", (e) => {
  let value = e.target.value;

  // Check if the value is a valid number
  if (!isNaN(value) && value.trim() !== "") {
    value = Number(value); // Convert the value to a number

    // Set constraints
    const minArea = 10; // Minimum area (adjust as needed)
    const maxArea = 10000; // Maximum area (adjust as needed)

    // Validate area constraints
    if (value < minArea) {
      areapreview.innerHTML = `Minimum area is ${minArea}.`;
      // area.value = minArea; // Set the input to minimum value if below
    } else if (value > maxArea) {
      areapreview.innerHTML = `Maximum area is ${maxArea}.`;
      // area.value = maxArea; // Set the input to maximum value if above
    } else {
      // If value is within the valid range, update the preview
      areapreview.innerHTML = value + "Sqft";
    }
  } else {
    // If the value is not a valid number
    areapreview.innerHTML = "Sqft";
  }
});

let bedPreview = document.getElementById("bedPreview");
bedrooms.addEventListener("input", (e) => {
  let value = e.target.value;

  // Check if the value is a valid integer
  if (!isNaN(value) && value.trim() !== "") {
    value = Number(value); // Convert the value to a number

    // Set constraints for bedrooms
    const minBedrooms = 1; // Minimum number of bedrooms (adjust as needed)
    const maxBedrooms = 100; // Maximum number of bedrooms (adjust as needed)

    // Validate bedrooms constraints
    if (value < minBedrooms) {
      bedPreview.innerHTML = `Minimum number of bedrooms is ${minBedrooms}.`;
      bedrooms.value = minBedrooms; // Set the input to minimum value if below
    } else if (value > maxBedrooms) {
      bedPreview.innerHTML = `Maximum number of bedrooms is ${maxBedrooms}.`;
      bedrooms.value = maxBedrooms; // Set the input to maximum value if above
    } else {
      // If value is within the valid range, update the preview
      bedPreview.innerHTML = value + " Beds";
    }
  } else {
    // If the value is not a valid number
    bedPreview.innerHTML = "Rooms";
  }
});

let washRoom = document.getElementById("washRoom");
bathrooms.addEventListener("input", (e) => {
  let value = e.target.value;

  // Check if the value is a valid integer
  if (!isNaN(value) && value.trim() !== "") {
    value = Number(value); // Convert the value to a number

    // Set constraints for bathrooms
    const minBathrooms = 0; // Minimum number of bathrooms (adjust as needed)
    const maxBathrooms = 50; // Maximum number of bathrooms (adjust as needed)

    // Validate bathrooms constraints
    if (value < minBathrooms) {
      washRoom.innerHTML = `Minimum number of bathrooms is ${minBathrooms}.`;
      bathrooms.value = minBathrooms; // Set the input to minimum value if below
    } else if (value > maxBathrooms) {
      washRoom.innerHTML = `Maximum number of bathrooms is ${maxBathrooms}.`;
      bathrooms.value = maxBathrooms; // Set the input to maximum value if above
    } else {
      // If value is within the valid range, update the preview
      washRoom.innerHTML = value + " Baths";
    }
  } else {
    // If the value is not a valid number
    washRoom.innerHTML = "Please enter a valid number.";
  }
});

let thumbnailImage = document.getElementById("thumbnailImage"); // Input file for image
let imgpreview = document.getElementById("imgpreview"); // Image tag for preview

thumbnailImage.addEventListener("change", (e) => {
  const file = e.target.files[0]; // Get the first file from the input

  if (file) {
    const reader = new FileReader(); // Create a new FileReader

    // Define what happens when the file is read
    reader.onload = function (event) {
      imgpreview.src = event.target.result; // Set the src of the img tag to the file data
    };

    // Read the image file as a data URL
    reader.readAsDataURL(file);
  } else {
    imgpreview.src = ""; // Clear the image preview if no file is selected
  }
});



const map = L.map("map").setView([20.5937, 78.9629], 5); // Set initial view to India

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);
var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
})
  .on("markgeocode", function (e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest(),
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  .addTo(map);
// L.Control.geocoder().addTo(map);

const locationInput = document.getElementById("location");
const suggestionsDiv = document.getElementById("suggestions");
let marker; // Variable to store the marker

async function fetchLocationSuggestions(query) {
  // Bounding box for India
  const viewbox = "68.162,8.069,97.397,37.377"; // southwest and northeast corners
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}&bounded=1&viewbox=${viewbox}`;
  //https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationInput)}&format=json&addressdetails=1

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    return [];
  }
}

function showSuggestions(suggestions) {
  suggestionsDiv.innerHTML = "";
  if (suggestions.length > 0) {
    suggestionsDiv.style.display = "flex";
    suggestionsDiv.style.flexDirection = "column";
    suggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = suggestion.display_name;
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.style.padding = "8px";
      suggestionItem.style.cursor = "pointer";


      suggestionItem.addEventListener("click", () => {
        locationInput.value = suggestion.display_name;
        suggestionsDiv.style.display = "none";

        // Center the map on the selected location
        const lat = suggestion.lat;
        const lon = suggestion.lon;
        map.setView([lat, lon], 13); // Adjust zoom level as needed
let latitude = document.getElementById("latitude")
let longitude = document.getElementById("longitude")
        // Place a marker at the selected location
        if (marker) {
         
          marker.setLatLng([lat, lon]);
        } else {
          // Assuming lat, lon, and title are defined and available
// Set initial latitude and longitude
const initialLat = lat; // Store the initial latitude
const initialLng = lon; // Store the initial longitude
latitude.value = initialLat;
longitude.value = initialLng;

// Create a fixed circle at the initial coordinates
const radius = 2000; // Set the desired radius in meters
const circle = L.circle([initialLat, initialLng], {
  color: 'red', // Circle color
  fillColor: '#30f', // Fill color
  fillOpacity: 0.5, // Fill opacity
  radius: radius // Circle radius
}).addTo(map);

// Create a draggable marker at the initial coordinates
let marker = L.marker([initialLat, initialLng], { draggable: true })
  .addTo(map)
  .bindPopup(title.value);

// Function to check if the marker is within the circle
function isInsideCircle(latLng) {
  const center = circle.getLatLng();
  const distance = center.distanceTo(latLng); // Get the distance from the center to the marker position
  return distance <= radius; // Check if within radius
}

// Update the marker's position when it is dragged
marker.on('drag', function(event) {
  const position = marker.getLatLng(); // Get the current position of the marker

  // Check if the new position is within the circle
  if (isInsideCircle(position)) {
    latitude.value = position.lat; // Update latitude input
    longitude.value = position.lng; // Update longitude input
  } else {
    const mapElement = document.getElementById('map');

    // Get the position and size of the #map element
    const rect = mapElement.getBoundingClientRect();

    // Extract position values
    const top = rect.top;    // Distance from the top of the viewport
    const left = rect.left;  // Distance from the left of the viewport
    const width = rect.width; // Width of the element
    const height = rect.height; // Height of the element

    let errorStatus = document.getElementById("locationStatus")

errorStatus.style.display = "flex"
errorStatus.style.top = top+500
console.log(errorStatus.style.top)
errorStatus.style.left = left
const firstChild = errorStatus.children[0];
firstChild.innerHTML = "Select Location with in the radius or change the location "
setTimeout(()=>{
errorStatus.style.display = "none"
},3000)
    // If outside the radius, reset marker to the original position
    marker.setLatLng([initialLat, initialLng]); // Reset to initial position
  }
});

// Update the circle's position when the marker is dragged and dropped
marker.on('dragend', function(event) {
  const position = marker.getLatLng(); // Get the new position of the marker

  // Check if the marker is still within the circle after dragging ends
  if (isInsideCircle(position)) {
    latitude.value = position.lat; // Update latitude input
    longitude.value = position.lng; // Update longitude input
  } else {
    // If outside the radius, reset marker to the original position
    marker.setLatLng([initialLat, initialLng]); // Reset to initial position
  }
});


        }
      });

      suggestionsDiv.appendChild(suggestionItem);
    });
  } else {
    suggestionsDiv.style.display = "none";
  }
}

locationInput.addEventListener("input", async () => {
  const query = locationInput.value;
  if (query.length > 3) {
    const suggestions = await fetchLocationSuggestions(query);
    showSuggestions(suggestions);
  } else {
    suggestionsDiv.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (!suggestionsDiv.contains(e.target) && e.target !== locationInput) {
    suggestionsDiv.style.display = "none";
  }
});

{
  let state = document.getElementById("state");
  fetch("http://127.0.0.1:8000/getStates")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      data.forEach((item) => {
        let option = document.createElement("option");
        option.value = item.name;
        option.textContent = item["name"]; // Set the text of the option
        state.appendChild(option); // Append the option to the select element
        // console.log(item.name);
      });
    })
    .catch((error) => {
      console.error("Error fetching states:", error);
    });

  let pincode = document.getElementById("pincode");
  pincode.addEventListener("input", (e) => {
    let pin = e.target.value; // Get the current input value

    // Check if the pincode is a valid length and is numeric
    if (pin.length >= 6 && !isNaN(pin)) {
      fetch("http://127.0.0.1:8000/getStates")
        .then((response) => response.json())
        .then((data) => {
          let matchedState = null; // Initialize variable to store matched state

          // Loop through the fetched data to find a matching state
          for (let i = 0; i < data.length; i++) {
            if (
              Number(pin) >= data[i]["minPincode"] &&
              Number(pin) <= data[i]["maxPincode"]
            ) {
              matchedState = data[i]; // Store the matching state
              break; // Exit the loop once a match is found
            }
          }

          // Log the matched state if found
          if (matchedState) {
            if (state.value >= 3) {
              return;0
            } else {
              setTimeout(() => {
                pincodeStatus.innerHTML = "";
              }, 1000);
              state.value = matchedState["name"];
            }

            // Log the matching state
            // Optionally, you can set a dropdown or any other UI element with matchedState.name
          } else {
            // console.log("No matching state found for the given pincode.");
          }
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    } else {
      if (pin.length > 2 || pin.length < 6 || pin.length > 6) {
        let pincodeStatus = document.getElementById("pincodeStatus");
        pincodeStatus.innerHTML = "Enter A valid address";
      }
    }
  });
}

{
  const videoInput = document.getElementById("propertyVideo");
const imageInput = document.getElementById("propertyImages");
const videoErrorDiv = document.getElementById("videoError");
const imageErrorDiv = document.getElementById("imageError");
const submitButton = document.getElementById("submit");

videoInput.addEventListener("change", function() {
    const file = this.files[0];
    videoErrorDiv.textContent = ""; // Clear previous error message
    videoErrorDiv.style.opacity = "0"; // Hide error message initially

    if (file) {
        const maxSize = 120 * 1024 * 1024; // 120 MB in bytes
        if (file.size > maxSize) {
            videoErrorDiv.textContent = "The video file size exceeds 120 MB. Please upload a smaller file.";
            this.value = ""; // Clear the file input
            videoErrorDiv.style.opacity = "1"; // Show the error message
            submitButton.disabled = true; // Disable the submit button
            
            // Fade out the error message after 2 seconds
            setTimeout(() => {
              // console.log("erro")
                videoErrorDiv.style.opacity = "0"; // Fade out
                setTimeout(() => {
                    videoErrorDiv.textContent = ""; // Clear the message after fade out
                }, 500); // Match this time with the CSS transition duration
            }, 2000); // 2 seconds
        } else {
            submitButton.disabled = false; // Enable the submit button if no error
        }
    }
});

imageInput.addEventListener("change", function() {
    const files = this.files;
    imageErrorDiv.textContent = ""; // Clear previous error message
    imageErrorDiv.style.opacity = "0"; // Hide error message initially

    const maxImages = 10; // Maximum number of images allowed

    if (files.length > maxImages) {
        imageErrorDiv.textContent = `You can upload a maximum of ${maxImages} images. Please select fewer images.`;
        this.value = ""; // Clear the file input
        imageErrorDiv.style.opacity = "1"; // Show the error message
        submitButton.disabled = true; // Disable the submit button
        
        // Fade out the error message after 2 seconds
        setTimeout(() => {
            imageErrorDiv.style.opacity = "0"; // Fade out
            setTimeout(() => {
                imageErrorDiv.textContent = ""; // Clear the message after fade out
            }, 500); // Match this time with the CSS transition duration
        }, 2000); // 2 seconds
    } else {
        submitButton.disabled = false; // Enable the submit button if no error
    }
});
}



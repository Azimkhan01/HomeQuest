let propertyTypeFilter = document.getElementById("stateFilter");
fetch(
  `${window.location.protocol}//${window.location.hostname}:${window.location.port}/getStates`
)
  .then((data) => data.json())
  .then((r) => {
    r.forEach((e) => {
      let option = document.createElement("option");
      option.value = e.name;
      option.innerHTML = `${e.name}`;
      propertyTypeFilter.appendChild(option);
    });
  });

let filterBtn = document.getElementById("filterBtn");
let filterContainers = document.getElementsByClassName("filter-container");
if (filterContainers.length > 0) {
  filterBtn.addEventListener("click", (e) => {
    let filterContainer = filterContainers[0];
    filterContainer.style.display =
      filterContainer.style.display === "none" ? "flex" : "none";
  });
}
// Update area values display
function updateAreaValues() {
  document.getElementById("minAreaValue").textContent =
    document.getElementById("minArea").value;
  document.getElementById("maxAreaValue").textContent =
    document.getElementById("maxArea").value;
}
// Get current location
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (error) => reject(error)
      );
    }
  });
}

// Fetch and display sorted listings
getCurrentLocation().then((location) => {
  console.log(
    `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
  );

  const userLatitude = location.latitude;
  const userLongitude = location.longitude;
});

//function to fetch and display

// let propertyBox = document.getElementById("property-box");
// let navigationButton = document.getElementById("navigation-button");
// let dynamicBtn = document.getElementById("dynamicBtn");
// let previous = document.getElementById("previous");
// let next = document.getElementById("next");
// let current = null;

// const fetchData = async (offset) => {
//   try {
//     const response = await fetch(
//       `${window.location.protocol}//${window.location.hostname}:${window.location.port}/listing/${offset}`
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     // console.log(data)
//     return data; // Return the data if needed elsewhere
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// fetchData(Number(0)).then((d) => {
//   let iter = "";
//   propertyBox.innerHTML = "";
//   d.forEach((e) => {
//     let formattedAmount = new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(e.price);

//     iter += `

//     <div class="card">
//                             <div class="card-image">
//                                 <div class="property-image">
//                                  <a href="/property/${e["_id"]}">
//                                    <img src="${e.thumbnail}">
//                                  </a>
//                                  <div style="background-image:url(${e.thumbnail})"  class="background-blur"></div>
//                                 </div>
//                                 <div  class="property-listing">${e.listingType}</div>
//                                 <div class="propertyType">${e.propertyType}</div>
//                             </div>
//                             <div class="card-content">
//                                 <div><p>${formattedAmount}</p></div>
//                                 <div><a href="/property/${e["_id"]}"><h3>${e.title}</h3></a></div>
//                                 <div><p><i class="fa-solid fa-location-dot"></i>
//                                         ${e.location}</p></div>
//                                 <div class="amenities">
//                                     <div><i
//                                             class="fa-solid fa-ruler-combined"></i>
//                                         ${e.area} sqft</div>
//                                     <div><i class="fa-solid fa-bed"></i>
//                                        ${e.bedrooms} Bedrooms</div>
//                                     <div><i class="fa-solid fa-bath"></i>
//                                       ${e.bathrooms}  Bathrooms</div>
//                                 </div>
//                             </div>
//                         </div>

//     `;
//   });

//   propertyBox.innerHTML = iter;
// });

// fetchData(NaN).then((data) => {
//   dynamicBtn.innerHTML = "";
//   // console.log(data.length);
//   let total = Math.ceil(data.length / 10);
//   // console.log(total);

//   for (let i = 1; i <= total; i++) {
//     let p = document.createElement("p");
//     p.innerHTML = i;
//     p.style.cssText = i === 1 ? "color:#00B98E;background-color:white" : "";

//     p.addEventListener("click", () => {
//       let offset = (i - 1) * 10; // Calculate offset based on page number
//       // console.log("clicked")
//       fetchData(offset).then((d) => {
//         let iter = "";
//         propertyBox.innerHTML = "";

//         d.forEach((e) => {
//           let formattedAmount = new Intl.NumberFormat("en-IN", {
//             style: "currency",
//             currency: "INR",
//           }).format(e.price);

//           iter += `

//           <div class="card">
//                                   <div class="card-image">
//                                       <div class="property-image">
//                                        <a href="/property/${e["_id"]}">
//                                          <img src="${e.thumbnail}">
//                                        </a>
//                                        <div style="background-image:url(${e.thumbnail})"  class="background-blur"></div>
//                                       </div>
//                                       <div  class="property-listing">${e.listingType}</div>
//                                       <div class="propertyType">${e.propertyType}</div>
//                                   </div>
//                                   <div class="card-content">
//                                       <div><p>${formattedAmount}</p></div>
//                                       <div><a href="/property/${e["_id"]}"><h3>${e.title}</h3></a></div>
//                                       <div><p><i class="fa-solid fa-location-dot"></i>
//                                               ${e.location}</p></div>
//                                       <div class="amenities">
//                                           <div><i
//                                                   class="fa-solid fa-ruler-combined"></i>
//                                               ${e.area} sqft</div>
//                                           <div><i class="fa-solid fa-bed"></i>
//                                              ${e.bedrooms} Bedrooms</div>
//                                           <div><i class="fa-solid fa-bath"></i>
//                                             ${e.bathrooms}  Bathrooms</div>
//                                       </div>
//                                   </div>
//                               </div>

//           `;
//         });

//         propertyBox.innerHTML = iter;
//       });

//       // Update pagination button styling
//       Array.from(dynamicBtn.children).forEach(
//         (child) => (child.style.cssText = "")
//       );
//       p.style.cssText = "color:#00B98E;background-color:white";
//     });

//     dynamicBtn.appendChild(p);
//   }
// });

// //next and previous hadnling here

// let isProcessing = false; // A flag to check if a timeout is active

// next.addEventListener("click", () => {
//   // Prevent triggering the next event if processing is ongoing
//   if (isProcessing) return;

//   const childrenArray = Array.from(dynamicBtn.children);
//   // Find the index of the element with background color 'white'
//   const index = childrenArray.findIndex((e) => {
//     // Normalize the background color to check for 'white'
//     return (
//       e.style.backgroundColor === "white" ||
//       window.getComputedStyle(e).backgroundColor === "rgb(255, 255, 255)"
//     );
//   });

//   // If the index is found and valid, update current
//   if (index !== -1) {
//     current = index;
//   }

//   // Ensure `current` is valid before dispatching the event
//   if (current !== -1) {
//     // Disable the button during processing
//     isProcessing = true;
//     next.disabled = true; // Disable the "next" button

//     // Add a delay of 500ms
//     setTimeout(() => {
//       const event = new Event("click");

//       // Check if current is the last element, reset to 0 if needed
//       if (current >= dynamicBtn.children.length - 1) {
//         current = 0; // Reset to the first child
//       } else {
//         current++; // Move to the next element
//       }

//       // Ensure current is within bounds
//       if (current < dynamicBtn.children.length) {
//         dynamicBtn.children[current].dispatchEvent(event); // Dispatch the event on the element at the 'current' index
//       } else {
//         console.log("Invalid index: ", current); // Log if the index is invalid (shouldn't happen)
//       }

//       // Re-enable the button after the timeout
//       isProcessing = false;
//       next.disabled = false; // Re-enable the "next" button
//     }, 500); // 500ms delay
//   }
// });

// previous.addEventListener("click", () => {
//   // Prevent triggering the previous event if processing is ongoing
//   if (isProcessing) return;

//   const childrenArray = Array.from(dynamicBtn.children);
//   // Find the index of the element with background color 'white'
//   const index = childrenArray.findIndex((e) => {
//     // Normalize the background color to check for 'white'
//     return (
//       e.style.backgroundColor === "white" ||
//       window.getComputedStyle(e).backgroundColor === "rgb(255, 255, 255)"
//     );
//   });

//   // If the index is found and valid, update current
//   if (index !== -1) {
//     current = index;
//   }

//   // Ensure `current` is valid before dispatching the event
//   if (current !== -1) {
//     // Disable the button during processing
//     isProcessing = true;
//     previous.disabled = true; // Disable the "previous" button

//     // Add a delay of 500ms
//     setTimeout(() => {
//       const event = new Event("click");

//       // Check if current is the first element, reset to the last child if needed
//       if (current <= 0) {
//         current = dynamicBtn.children.length - 1; // Set to the last child
//       } else {
//         current--; // Move to the previous element
//       }

//       // Ensure current is within bounds
//       if (current >= 0 && current < dynamicBtn.children.length) {
//         dynamicBtn.children[current].dispatchEvent(event); // Dispatch the event on the element at the 'current' index
//       } else {
//         console.log("Invalid index: ", current); // Log if the index is invalid (shouldn't happen)
//       }

//       // Re-enable the button after the timeout
//       isProcessing = false;
//       previous.disabled = false; // Re-enable the "previous" button
//     }, 500); // 500ms delay
//   }
// });
// {
//   const applyFilter = document.getElementById("applyFilter");

// applyFilter.addEventListener("click", async (e) => {
//   // Get filter values
//   const skip = 0; // Pagination offset, can be updated based on your pagination logic
//   const listingTypeFilter = document.getElementById('listingTypeFilter') ? document.getElementById('listingTypeFilter').value : ''; // Default to empty string if not found
//   const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
//   const maxPrice = parseFloat(document.getElementById("maxPrice").value) || 1000000000000000000;
//   const propertyType = document.getElementById("propertyTypeFilter").value || ''; // Default to empty string if not found
//   const minArea = parseFloat(document.getElementById("minArea").value) || 0;
//   const maxArea = parseFloat(document.getElementById("maxArea").value) || 100000000000000000000000;
//   const state = document.getElementById("stateFilter").value || '';
//   const location = document.getElementById("locationSearch").value.toLowerCase() || '';

//   // Construct the URL with parameters directly in the path
//   const apiEndpoint = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/filterApi/${skip}/${propertyType}/${listingTypeFilter}/${maxArea}/${minArea}/${maxPrice}/${minPrice}/${state}/${location}`;

//   // Fetch data with filters applied in the URL path
//   fetch(apiEndpoint)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data); // Logs filtered results
//       // Update the UI with the fetched data (e.g., render the listings)
//     })
//     .catch((error) => console.error("Error fetching listings:", error));
// });

// }
/*  ******************************************************** */
//filter searching

// Define the getListing function to fetch data
let getListing = async (offset = 0) => {
  try {
    const response = await fetch(
      `${window.location.protocol}//${window.location.host}/listing/${offset}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Function to load the property box
let updatePropertyBox = (d) => {
  let propertyBox = document.getElementById("property-box");
  propertyBox.innerHTML = "";
  let storedCard = "";
  d.forEach((e) => {
    storedCard += `
      <div class="card">
        <div class="card-image">
          <div class="property-image"><a href="#"><img src=${e.thumbnail}></a></div>
          <div class="property-listing">${e.listingType}</div>
          <div class="propertyType">${e.propertyType}</div>
        </div>
        <div class="card-content">
          <div><p>${e.price}</p></div>
          <div><a href="#"><h3>${e.title}</h3></a></div>
          <div><p><i class="fa-solid fa-location-dot"></i>${e.location}</p></div>
          <div class="amenities">
            <div><i class="fa-solid fa-ruler-combined"></i>${e.area}sqft</div>
            <div><i class="fa-solid fa-bed"></i>${e.bedrooms} Bedrooms</div>
            <div><i class="fa-solid fa-bath"></i>${e.bathrooms} Bathrooms</div>
          </div>
        </div>
      </div>
    `;
  });
  propertyBox.innerHTML = storedCard;
};

// Load the initial property listings and pagination
getListing(0).then((d) => updatePropertyBox(d));

// Function to dynamically generate pagination buttons
function paginationBtn(offset = 1) {
  let dynamicBtn = document.getElementById("dynamicBtn");

  getListing(-1).then((d) => {
    let totalPages = Math.ceil(d.length / 10);
    let s = "";
    for (let i = 1; i <= totalPages; i++) {
      s += `<p style="background-color: ${
        i === offset ? "white" : "#00B98E"
      }; color: ${
        i === offset ? "#00B98E" : "white"
      }" id="pageNo${i}">${i}</p>`;
    }

    dynamicBtn.innerHTML = s;

    // Add click event listeners to pagination buttons
    Array.from(dynamicBtn.children).forEach((child, index) => {
      child.addEventListener("click", () => {
        getListing(index * 10).then((d) => {
          // Reset button styles
          Array.from(dynamicBtn.children).forEach((btn) => {
            btn.style.color = "white";
            btn.style.backgroundColor = "#00B98E";
          });
          // Highlight the clicked button
          child.style.color = "#00B98E";
          child.style.backgroundColor = "white";
          // Update the property box
          updatePropertyBox(d);
        });
      });
    });
  });
}

// Initialize pagination
paginationBtn();

// Logic for the "Next" button
// Add the Next button logic as before
let next = document.getElementById("next");
next.addEventListener("click", (e) => {
  let currentIndex = Array.from(dynamicBtn.children).findIndex(
    (child) => child.style.backgroundColor === "white"
  );

  let nextIndex = currentIndex + 1;

  // Check if the next index is within bounds
  getListing(-1).then((data) => {
    if (nextIndex * 10 < data.length) {
      getListing(nextIndex * 10).then((d) => {
        // Update the pagination button styles
        Array.from(dynamicBtn.children).forEach((child) => {
          child.style.color = "white";
          child.style.backgroundColor = "#00B98E";
        });
        dynamicBtn.children[nextIndex].style.color = "#00B98E";
        dynamicBtn.children[nextIndex].style.backgroundColor = "white";
        // Update the property box
        updatePropertyBox(d);
      });
    } else {
      console.log("No more listings available");
    }
  });
});

// Add the Previous button logic
let previous = document.getElementById("previous");
previous.addEventListener("click", (e) => {
  let currentIndex = Array.from(dynamicBtn.children).findIndex(
    (child) => child.style.backgroundColor === "white"
  );

  let previousIndex = currentIndex - 1;

  // Check if the previous index is within bounds (should be >= 0)
  if (previousIndex >= 0) {
    getListing(previousIndex * 10).then((d) => {
      // Update the pagination button styles
      Array.from(dynamicBtn.children).forEach((child) => {
        child.style.color = "white";
        child.style.backgroundColor = "#00B98E";
      });
      dynamicBtn.children[previousIndex].style.color = "#00B98E";
      dynamicBtn.children[previousIndex].style.backgroundColor = "white";
      // Update the property box
      updatePropertyBox(d);
    });
  } else {
    console.log("Already at the first listing");
  }
});

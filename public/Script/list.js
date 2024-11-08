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
  filterBtn.addEventListener("click", () => {
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

let propertyBox = document.getElementById("property-box");
let navigationButton = document.getElementById("navigation-button");
let dynamicBtn = document.getElementById("dynamicBtn");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let current = null;

const fetchData = async (offset) => {
  try {
    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/listing/${offset}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data)
    return data; // Return the data if needed elsewhere
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData(Number(0)).then((d) => {
  let iter = "";
  propertyBox.innerHTML = "";
  d.forEach((e) => {
    iter += `
    
    <div class="card">
                            <div class="card-image">
                                <div class="property-image"><a href="#"><img
                                        src="${e.thumbnail}"></a>
                                </div>
                                <div class="property-listing">${e.listingType}</div>
                                <div class="propertyType">${e.propertyType}</div>
                            </div>
                            <div class="card-content">
                                <div><p>${e.price}</p></div>
                                <div><a href="#"><h3>${e.title}</h3></a></div>
                                <div><p><i class="fa-solid fa-location-dot"></i>
                                        ${e.location}</p></div>
                                <div class="amenities">
                                    <div><i
                                            class="fa-solid fa-ruler-combined"></i>
                                        ${e.area} sqft</div>
                                    <div><i class="fa-solid fa-bed"></i>
                                       ${e.bedrooms} Bedrooms</div>
                                    <div><i class="fa-solid fa-bath"></i>
                                      ${e.bathrooms}  Bathrooms</div>
                                </div>
                            </div>
                        </div>
    
    `;
  });

  propertyBox.innerHTML = iter;
});

fetchData(NaN).then((data) => {
  dynamicBtn.innerHTML = "";
  // console.log(data.length);
  let total = Math.ceil(data.length / 10);
  // console.log(total);

  for (let i = 1; i <= total; i++) {
    let p = document.createElement("p");
    p.innerHTML = i;
    p.style.cssText = i === 1 ? "color:#00B98E;background-color:white" : "";

    p.addEventListener("click", () => {
      let offset = (i - 1) * 10; // Calculate offset based on page number
// console.log("clicked")
      fetchData(offset).then((d) => {
        let iter = "";
        propertyBox.innerHTML = "";

        d.forEach((e) => {
          iter += `
            <div class="card">
              <div class="card-image">
                <div class="property-image"><a href="#"><img src="${e.thumbnail}"></a></div>
                <div class="property-listing">${e.listingType}</div>
                <div class="propertyType">${e.propertyType}</div>
              </div>
              <div class="card-content">
                <div><p>${e.price}</p></div>
                <div><a href="#"><h3>${e.title}</h3></a></div>
                <div><p><i class="fa-solid fa-location-dot"></i> ${e.location}</p></div>
                <div class="amenities">
                  <div><i class="fa-solid fa-ruler-combined"></i> ${e.area} sqft</div>
                  <div><i class="fa-solid fa-bed"></i> ${e.bedrooms} Bedrooms</div>
                  <div><i class="fa-solid fa-bath"></i> ${e.bathrooms} Bathrooms</div>
                </div>
              </div>
            </div>
          `;
        });

        propertyBox.innerHTML = iter;
      });

      // Update pagination button styling
      Array.from(dynamicBtn.children).forEach(
        (child) => (child.style.cssText = "")
      );
      p.style.cssText = "color:#00B98E;background-color:white";
    });

    dynamicBtn.appendChild(p);
  }
});

//next and previous hadnling here

let isProcessing = false; // A flag to check if a timeout is active

next.addEventListener("click", () => {
  // Prevent triggering the next event if processing is ongoing
  if (isProcessing) return;

  const childrenArray = Array.from(dynamicBtn.children);
  // Find the index of the element with background color 'white'
  const index = childrenArray.findIndex((e) => {
    // Normalize the background color to check for 'white'
    return e.style.backgroundColor === "white" || window.getComputedStyle(e).backgroundColor === "rgb(255, 255, 255)";
  });

  // If the index is found and valid, update current
  if (index !== -1) {
    current = index;
  }

  // Ensure `current` is valid before dispatching the event
  if (current !== -1) {
    // Disable the button during processing
    isProcessing = true;
    next.disabled = true;  // Disable the "next" button

    // Add a delay of 500ms
    setTimeout(() => {
      const event = new Event("click");

      // Check if current is the last element, reset to 0 if needed
      if (current >= dynamicBtn.children.length - 1) {
        current = 0; // Reset to the first child
      } else {
        current++; // Move to the next element
      }

      // Ensure current is within bounds
      if (current < dynamicBtn.children.length) {
        dynamicBtn.children[current].dispatchEvent(event); // Dispatch the event on the element at the 'current' index
      } else {
        console.log("Invalid index: ", current); // Log if the index is invalid (shouldn't happen)
      }

      // Re-enable the button after the timeout
      isProcessing = false;
      next.disabled = false;  // Re-enable the "next" button
    }, 500); // 500ms delay
  }
});

previous.addEventListener("click", () => {
  // Prevent triggering the previous event if processing is ongoing
  if (isProcessing) return;

  const childrenArray = Array.from(dynamicBtn.children);
  // Find the index of the element with background color 'white'
  const index = childrenArray.findIndex((e) => {
    // Normalize the background color to check for 'white'
    return e.style.backgroundColor === "white" || window.getComputedStyle(e).backgroundColor === "rgb(255, 255, 255)";
  });

  // If the index is found and valid, update current
  if (index !== -1) {
    current = index;
  }

  // Ensure `current` is valid before dispatching the event
  if (current !== -1) {
    // Disable the button during processing
    isProcessing = true;
    previous.disabled = true;  // Disable the "previous" button

    // Add a delay of 500ms
    setTimeout(() => {
      const event = new Event("click");

      // Check if current is the first element, reset to the last child if needed
      if (current <= 0) {
        current = dynamicBtn.children.length - 1; // Set to the last child
      } else {
        current--; // Move to the previous element
      }

      // Ensure current is within bounds
      if (current >= 0 && current < dynamicBtn.children.length) {
        dynamicBtn.children[current].dispatchEvent(event); // Dispatch the event on the element at the 'current' index
      } else {
        console.log("Invalid index: ", current); // Log if the index is invalid (shouldn't happen)
      }

      // Re-enable the button after the timeout
      isProcessing = false;
      previous.disabled = false;  // Re-enable the "previous" button
    }, 500); // 500ms delay
  }
});


 

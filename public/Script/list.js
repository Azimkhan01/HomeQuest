let propertyTypeFilter = document.getElementById("stateFilter");
var q = "";

//error status after the pagination we will see
let loading = document.getElementById("loading")
function showErr(status)
{

  loading.style.display = "flex"
  document.getElementById("errorStatus").innerHTML = status
  setTimeout(()=>{
loading.style.display = "none"
  },8000)

}

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
getCurrentLocation()
  .then((location) => {
    console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
  })
  .catch((error) => {
    console.error("Error fetching location:", error); // Log the full error object
  });

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
          <div class="property-image"><a href='${'/'+'property-details'+'?id='+e["_id"]}'><img src=${window.location.origin+e.thumbnail} lazy></a></div>
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
// Next button logic
let next = document.getElementById("next");

next.addEventListener("click", (e) => {
  // Find the current active pagination button
  let currentIndex = Array.from(dynamicBtn.children).findIndex(
    (child) => child.style.backgroundColor === "white"
  );

  let nextIndex = currentIndex + 1; // Calculate the next index

  // Fetch data with the filter and pagination parameters
  fetch(
    `${window.location.protocol}//${window.location.hostname}:${window.location.port}/filterApi?${q}&skip=0`
  )
    .then((response) => response.json())
    .then((data) => {
      if (nextIndex * 10 < data.totalCount) {
        // Dispatch a click event on the next pagination button
        dynamicBtn.children[nextIndex].dispatchEvent(new Event("click"));
      } else {
        showErr("No More Listing Available")
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Previous button logic
let previous = document.getElementById("previous");
previous.addEventListener("click", (e) => {
  let currentIndex = Array.from(dynamicBtn.children).findIndex(
    (child) => child.style.backgroundColor === "white"
  );

  let previousIndex = currentIndex - 1;

  // Check if the previous index is within bounds (should be >= 0)
  if (previousIndex >= 0) {
    // Dispatch a click event on the previous pagination button
    dynamicBtn.children[previousIndex].dispatchEvent(new Event("click"));
  } else {
    showErr("No More Listing Available")
  }
});

//applying filter logic

let applyFilter = document.getElementById("applyFilter");
function handleApplyFilter() {
  {
    const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
    const maxPrice =
      parseInt(document.getElementById("maxPrice").value) || 10 ** 6;
    const propertyType =
      document.getElementById("propertyTypeFilter").value || null;
    const listingType =
      document.getElementById("listingTypeFilter").value || null;
    const minArea = parseInt(document.getElementById("minArea").value) || 0;
    const maxArea =
      parseInt(document.getElementById("maxArea").value) || 100000;
    const state = document.getElementById("stateFilter").value || null;

    const queryParams = new URLSearchParams({
      minPrice,
      maxPrice: maxPrice !== Infinity ? maxPrice : "",
      propertyType: propertyType || "",
      listingType: listingType || "",
      minArea,
      maxArea,
      state: state || "",
    });
    q = queryParams;

    fetch(
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/filterApi?${queryParams}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.listings || data.listings.length === 0) {
          document.getElementById("dynamicBtn").innerHTML =
            "<p>No listings found</p>";
          return;
        }

        updatePropertyBox(data.listings);

        const dynamicBtn = document.getElementById("dynamicBtn");
        let totalPages = Math.ceil(data.totalCount / 10);
        let offset = 0; // Default to first page
        let s = "";

        for (let i = 0; i < totalPages; i++) {
          s += `<p style="background-color: ${
            i === offset ? "white" : "#00B98E"
          }; color: ${i === offset ? "#00B98E" : "white"}" id="pageNo${
            i + 1
          }">${i + 1}</p>`;
        }

        dynamicBtn.innerHTML = s;

        Array.from(dynamicBtn.children).forEach((child, index) => {
          child.addEventListener("click", () => {
            skip = index * 10;

            fetch(
              `${window.location.protocol}//${window.location.hostname}:${window.location.port}/filterApi?${queryParams}&skip=${skip}`
            )
              .then((d) => d.json())
              .then((r) => {
                Array.from(dynamicBtn.children).forEach((btn) => {
                  btn.style.color = "white";
                  btn.style.backgroundColor = "#00B98E";
                });
                child.style.color = "#00B98E";
                child.style.backgroundColor = "white";
                updatePropertyBox(r.listings);
              });
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
        document.getElementById("errorContainer").textContent =
          "Failed to load listings. Please try again.";
      });
  }
}

//applyfilter handler
applyFilter.addEventListener("click", () => {
  let clickEvent = new Event("click");
  filterBtn.dispatchEvent(clickEvent);
  // Call the function with a delay and promise
  handleApplyFilterWithDelay();
});

function handleApplyFilterWithDelay() {
  let propertyBox = document.getElementById("property-box");
  propertyBox.innerHTML = "<p>loading ......</p>";
  console.log("waiting........");
  // Create a promise with a simulated delay using setTimeout
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Resolve the promise after the delay
    }, 2000); // Simulated 2-second delay
  })
    .then(() => {
      console.log("Executing handleApplyFilter...");
      handleApplyFilter(); // Call the main filter function
    })
    .catch((error) => {
      console.error("Error in promise:", error);
    });
}

//
// Select all filter elements
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const propertyTypeInput = document.getElementById("propertyTypeFilter");
const listingTypeInput = document.getElementById("listingTypeFilter");
const minAreaInput = document.getElementById("minArea");
const maxAreaInput = document.getElementById("maxArea");
const stateFilterInput = document.getElementById("stateFilter");

// Function to fetch filtered data
function fetchFilteredData() {
  const minPrice = parseInt(minPriceInput.value) || 0;
  const maxPrice = parseInt(maxPriceInput.value) || 10 ** 6; // Default to a very high number
  const propertyType = propertyTypeInput.value || null;
  const listingType = listingTypeInput.value || null;
  const minArea = parseInt(minAreaInput.value) || 0;
  const maxArea = parseInt(maxAreaInput.value) || 100000;
  const state = stateFilterInput.value || null;

  // Construct the query string with URLSearchParams
  const queryParams = new URLSearchParams({
    minPrice: minPrice,
    maxPrice: maxPrice !== Infinity ? maxPrice : "", // Handle Infinity case
    propertyType: propertyType || "",
    listingType: listingType || "",
    minArea: minArea,
    maxArea: maxArea,
    state: state || "",
  });

  // Log the query params to the console (optional)
  // console.log(queryParams.toString());

  // Fetch the filtered data from the API
  fetch(
    `${window.location.protocol}//${window.location.hostname}:${
      window.location.port
    }/filterApi?${queryParams.toString()}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.totalCount);
      document.querySelector(
        "#applyFilter"
      ).innerHTML = `Filter <span style="color:#6e6e6e">(${data.totalCount})</span>`;
    })
    .catch((error) => console.error("Error fetching filtered data:", error));
}

// Attach event listeners to the filter inputs
minPriceInput.addEventListener("change", fetchFilteredData);
maxPriceInput.addEventListener("change", fetchFilteredData);
propertyTypeInput.addEventListener("change", fetchFilteredData);
listingTypeInput.addEventListener("change", fetchFilteredData);
minAreaInput.addEventListener("change", fetchFilteredData);
maxAreaInput.addEventListener("change", fetchFilteredData);
stateFilterInput.addEventListener("change", fetchFilteredData);

// Optional: Call fetchFilteredData initially to load data
// fetchFilteredData();



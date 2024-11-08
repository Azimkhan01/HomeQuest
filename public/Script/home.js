//searchbox dropdown box
 // Initialize the map
 {
  const map = L.map('map').setView([20, 77], 4.5); // Center on India by default

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
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
  // Create a LayerGroup to hold all markers and circles
  const markersLayerGroup = L.layerGroup().addTo(map);

  // Function to load markers from the API and add to the LayerGroup
  function loadMarkers() {
      fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/listing`)
          .then(response => response.json())
          .then(data => {
              data.forEach(listing => {
                  const { latitude, longitude, title, price, thumbnail } = listing;

                  // Check if both latitude and longitude are available
                  if (latitude && longitude) {
                      // Create a marker
                      const marker = L.marker([latitude, longitude]);
                      marker.bindPopup(`
                        <a style="font-size:14px" href="https://www.youtube.com/watch?v=RBCk1SyC1PA&list=RD_51KXfwcPMs&index=21" target="_blank">${title}</a><br>
                        ${price}<br><br>
                        <img style="height:50px;width:50px;border-radius:5px" alt="thumbnail" src="${thumbnail}">
                      `);

                      // Add the marker to the LayerGroup
                      markersLayerGroup.addLayer(marker);

                      // Create a circle around the marker and add it to the LayerGroup
                      const circle = L.circle([latitude, longitude], {
                          color: 'blue',       // Border color
                          fillColor: 'lightblue', // Fill color
                          fillOpacity: 0.3,    // Fill opacity
                          radius: 500          // Radius in meters
                      });
                      markersLayerGroup.addLayer(circle);
                  }
              });
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  // Function to clear all markers and circles
  function clearMarkers() {
      markersLayerGroup.clearLayers(); // Clears all markers and circles from the LayerGroup
  }

  // Load markers initially
  loadMarkers();
//search box
{  
  let searchTxt = document.getElementById("searchTxt");
let property = document.getElementById("property");
let location = document.getElementById("location");
let markersLayerGroup = L.layerGroup().addTo(map);  // Assuming 'map' is your Leaflet map instance

let fetchData = async () => {
    try {
        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/listing`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

let clearMarkers = () => {
    markersLayerGroup.clearLayers();
};

let updateMarkers = async () => {
    if (location.value !== "" && property.value !== "" || searchTxt.value.length >= 3) {
        searchTxt.readOnly = false; 
        let data = await fetchData();
        clearMarkers();  // Clear previous markers

        let filteredData = data.filter(item =>
            item.location.toLowerCase().includes(searchTxt.value.toLowerCase()) &&
            item.state.toLowerCase().includes(location.value.toLowerCase()) &&
            item.propertyType.toLowerCase().includes(property.value.toLowerCase())
        );

        // console.log(filteredData);

        filteredData.forEach(item => {
            const { latitude, longitude, title, price, thumbnail } = item;
            
            if (latitude && longitude) {
                const marker = L.marker([latitude, longitude]);
                marker.bindPopup(`
                    <a href="https://www.youtube.com/watch?v=RBCk1SyC1PA&list=RD_51KXfwcPMs&index=21" target="_blank">${title}</a><br>
                    ${price}<br><br>
                    <img style="height:50px;width:50px;border-radius:5px" alt="thumbnail" src="${thumbnail}">
                `);
                
                markersLayerGroup.addLayer(marker);

                const circle = L.circle([latitude, longitude], {
                    color: 'red',
                    fillColor: 'lightblue',
                    fillOpacity: 0.3,
                    radius: 500
                });
                markersLayerGroup.addLayer(circle);
            }
        });
    }
};

// Event listeners
searchTxt.addEventListener("input", updateMarkers);
location.addEventListener("change", updateMarkers);
property.addEventListener("change", updateMarkers);

  
  // Example: Clear all markers and circles after 5 seconds
  // setTimeout(clearMarkers, 5000); // Clears markers after 5 seconds for demonstration
}
 }

//leftHOuse and rightHouse
{
  let i = 0;
  let HouseImage = [
    "https://demo.htmlcodex.com/2259/real-estate-html-template/img/carousel-1.jpg",
    "https://demo.htmlcodex.com/2259/real-estate-html-template/img/carousel-2.jpg",
  ];

  let ChangingImage = document.querySelector("#topic-template-2 div img");
  // console.log(ChangingImage);
  let leftHouse = document.getElementById("leftHouse");
  let rightHouse = document.getElementById("rightHouse");

  function updateImage() {
    ChangingImage.classList.remove("fade-in"); // Remove fade-in class to reset the effect
    void ChangingImage.offsetWidth; // Trigger reflow to restart animation
    ChangingImage.src = HouseImage[i];
    ChangingImage.classList.add("fade-in"); // Add fade-in class to start transition
  }

  leftHouse.addEventListener("click", () => {
    i = (i - 1 + HouseImage.length) % HouseImage.length; // Decrement index, loop back if negative
    updateImage();
  });

  rightHouse.addEventListener("click", () => {
    i = (i + 1) % HouseImage.length; // Increment index, loop back if out of bounds
    updateImage();
  });
}


  {
    let location = document.getElementById("location");
    
    fetch("http://127.0.0.1:8000/getStates")
      .then(d => d.json())
      .then(r => {
        r.forEach(e => {
          let option = document.createElement("option"); // Create a new option for each state
          option.value = e.name;
          option.textContent = e.name;
          location.appendChild(option); 
        });
      })
      .catch(error => console.error('Error fetching states:', error));
  }
  

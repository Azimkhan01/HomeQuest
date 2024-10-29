//searchbox dropdown box
{
  const propertiesData = [
    {
      address: "123 Main St, Kalyan",
      property: "house",
      location: "Maharashtra",
    },
    {
      address: "456 Park Ave, Dombivli",
      property: "apartment",
      location: "Delhi",
    },
    {
      address: "789 Elm St, Sion",
      property: "condo",
      location: "Uttar Pradesh",
    },
    {
      address: "321 Maple St, Mulund",
      property: "villa",
      location: "Uttra Khand",
    },
    { address: "654 Oak St, CSMT", property: "house", location: "Gujrat" },
    {
      address: "135 Pine St, Kalyan",
      property: "apartment",
      location: "Maharashtra",
    },
    { address: "246 Cedar St, Dombivli", property: "condo", location: "Delhi" },
    {
      address: "357 Birch St, Sion",
      property: "villa",
      location: "Uttar Pradesh",
    },
    {
      address: "468 Walnut St, Mulund",
      property: "house",
      location: "Uttra Khand",
    },
    {
      address: "579 Maple St, CSMT",
      property: "apartment",
      location: "Gujrat",
    },
    {
      address: "680 Spruce St, Kalyan",
      property: "condo",
      location: "Maharashtra",
    },
    { address: "791 Fir St, Dombivli", property: "villa", location: "Delhi" },
    {
      address: "802 Larch St, Sion",
      property: "house",
      location: "Uttar Pradesh",
    },
    {
      address: "913 Cypress St, Mulund",
      property: "apartment",
      location: "Uttra Khand",
    },
    { address: "1020 Pine St, CSMT", property: "condo", location: "Gujrat" },
    {
      address: "1111 Maple St, Kalyan",
      property: "villa",
      location: "Maharashtra",
    },
    {
      address: "1212 Birch St, Dombivli",
      property: "house",
      location: "Delhi",
    },
    {
      address: "1313 Cedar St, Sion",
      property: "apartment",
      location: "Uttar Pradesh",
    },
    {
      address: "1414 Walnut St, Mulund",
      property: "condo",
      location: "Uttra Khand",
    },
    { address: "1515 Oak St, CSMT", property: "villa", location: "Gujrat" },
    {
      address: "1616 Spruce St, Kalyan",
      property: "house",
      location: "Maharashtra",
    },
  ];

  // Sort properties by location
  propertiesData.sort((a, b) => {
    if (a.location < b.location) return -1; // a comes before b
    if (a.location > b.location) return 1; // a comes after b
    return 0; // a and b are equal
  });

  // Function to apply filtering based on user input
  function apply(e) {
    const searchValue = searchTxt.value.toLowerCase();

    // Check if input criteria are met
    if (
      searchValue.length > 2 &&
      location.value !== "" &&
      property.value !== ""
    ) {
      dropdownBox.style.display = "flex";
      dropdownBox.innerHTML = ""; // Clear previous results

      let ul = document.createElement("ul"); // Create a new <ul>

      // Filter and sort properties
      for (let i = 0; i < propertiesData.length; i++) {
        const e = propertiesData[i]; // Access the current property object
        // Check if the property matches the search criteria
        if (
          e.address.toLowerCase().includes(searchValue) &&
          e.property.toLowerCase() === property.value.toLowerCase() &&
          e.location.toLowerCase() === location.value.toLowerCase()
        ) {
          ul.innerHTML = "";
          // Create a new list item for matching property
          let li = document.createElement("li");
          li.innerHTML = `<a href="${e.address}/${e.property}/${e.location}">${e.address}</a>`; // Create the link
          ul.appendChild(li); // Append list item to the <ul>
        }

        if (ul.children.length < 1) {
          ul.innerHTML = `<li style="font-weight:700;font-family:heebo,sans-serif">Not Found - <span style="color:tomato;font-size:20px;font-weight:700;font-family:heebo,sans-serif">${searchValue}</span> </li>`;
        }
      }

      dropdownBox.appendChild(ul); // Append the <ul> to the dropdown box
    } else if (
      searchValue.length === 0 ||
      location.value === "" ||
      property.value === ""
    ) {
      dropdownBox.style.display = "none"; // Hide dropdown if input is empty
    }

    e.preventDefault();
  }

  // DOM Elements
  let dropdownBox = document.getElementById("dropdownBox");
  let searchTxt = document.getElementById("searchTxt");
  let location = document.getElementById("location");
  let property = document.getElementById("property");

  // Event listeners for inputs
  location.addEventListener("change", apply);
  searchTxt.addEventListener("input", apply);
  property.addEventListener("change", apply);
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

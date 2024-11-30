//get whether the link is right or not

let links = ['instagram', 'whatsapp', 'youtube'];
let addAgent = document.getElementById("addAgent");
let error = document.getElementById("error");

// Function to validate link format
function isValidLinkFormat(url) {
  const regexPatterns = {
      instagram: /^https:\/\/(www\.)?instagram\.com\/.+/,
      whatsapp: /^https:\/\/(wa\.me|api\.whatsapp\.com|wa\.link)\/.+/,
      youtube: /^https:\/\/(www\.)?youtube\.com\/watch\?v=.+/
  };

  // Check if the URL matches any of the platform patterns
  return Object.values(regexPatterns).some(regex => regex.test(url));
}


// Add event listeners to each input field
links.forEach((id) => {
    document.getElementById(id).addEventListener("input", (e) => {
        const value = e.target.value.trim(); // Trim whitespace
        if (value.length >= 4) {
            if (isValidLinkFormat(value)) {
                addAgent.disabled = false; // Enable button
                error.innerText = ""; // Clear error message
            } else {
                addAgent.disabled = true; // Disable button
                error.innerText = "The link is not valid";
                alert("The link is not valid");
            }
        }
    });
});




// Dynamic URL based on the current window's location
const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/getAgent`;  // Complete API URL

// Function to fetch agent data
async function getAgentData() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'qwertyuiopasdfghjklzxcvbnm' // Replace with your actual API key
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    let agentCards = document.getElementById("agent-cards")
    // console.log(data)
    let s = ''
    data.forEach(e => {
      s += `<div class="card">
  <div class="image">
    <img src="${window.location.protocol}//${window.location.hostname}:${window.location.port}${e.image}" alt="thumbnail" lazy>
  </div>
  <div class="content">
    <a href="#" class="title">
      ${e.username}
    </a>
    <p class="desc">
      ${e.bio}
    </p>
    <div class="stats">
      <p class="totalListing">${e.listing.length} Listings</p>
      <p class="views">${e.views ? e.views : 0} Views</p>

    </div>
    <a class="action" href="#">See More →</a>
  </div>
</div>
`
agentCards.innerHTML = s
    }); // Log the response data (agent details)
  } catch (error) {
    console.error('Error:', error); // Log any error that occurs
  }
}

// Call the function to fetch agent data
getAgentData();

// image restriction

document.getElementById("agentPhoto").addEventListener("change", function (event) {
  const maxFiles = 3;
  const fileInput = event.target;

  if (fileInput.files.length > maxFiles) {
    alert(`You can only upload up to ${maxFiles} images.`);
    fileInput.value = ""; // Clear the file input
  }
});



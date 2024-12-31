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
const url = `${window.location.origin}/getAgent`;  // Complete API URL

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
    console.log(data)
    let s = ''
    data.data.forEach(e => {
      s += `<div class="card">
  <div class="image">
    <img src="${window.location.origin}${e.image}" alt="thumbnail" lazy>
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

let adminMain = document.getElementById("admin-main") 
adminMain.style.display = "none"
let turnForm = document.getElementById("turnForm")
turnForm.addEventListener('click',()=>{
  if(turnForm.checked)
  {
    adminMain.style.display = "block"
  }else{
    adminMain.style.display = "none"
  }
})

const getLink = document.getElementById("getLink");
const handleEmail = document.getElementById('handleEmail')
getLink.addEventListener('click', (e) => {
  // The link you want to copy
  let  linkToCopy;
  try{
fetch(`${window.location.origin}/addLink`).then(data => data.json()).then((r)=>{
linkToCopy = `${window.location.origin}/agentLink/${r['id']}`
const tempInput = document.createElement("input");
tempInput.value = linkToCopy;
document.body.appendChild(tempInput);
tempInput.select();
document.execCommand("copy");
document.body.removeChild(tempInput);
let p = document.createElement("a")
p.href = linkToCopy
p.style.background = "white"
p.style.color = "#05C46B"
p.innerText = linkToCopy
getLink.appendChild(p)
setTimeout(()=>{
getLink.removeChild(p)
},20000)
handleEmail.style.display = "block"
})
  } catch(err){
console.error(err+"error happen while fetching for the link")
  }
 
});
handleEmail.style.display = "none"
let sendButton = document.getElementById('sendButton')
document.getElementById("sendButton").addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  try {
    let link = document.getElementById("link").value;
    let email = document.getElementById("email").value;

    // Send a POST request with email and link data
    let response = await fetch(`${window.location.origin}/sendLink`, {
      method: "POST", // Specify the method as POST
      headers: {
        "Content-Type": "application/json" // Specify the content type as JSON
      },
      body: JSON.stringify({ 'email':email, 'link':link }) // Send the email and link as JSON
    });

    if (response.ok) {
      setTimeout(()=>{
        document.getElementById("handleEmail").style.display = "none";
      },2000)
      // If the response is successful, hide the form
    
      // alert("Link sent successfully!");

    } else {
      // Handle server errors or unsuccessful response
      console.error("Failed to send link:", response.status);
      alert("There was an error sending the link. Please try again.");
    }
  } catch (error) {
    // Catch any errors in the fetch request
    console.error(error);
    alert("An error occurred. Please try again.");
  }
});

const feedbacks = document.getElementById('feedbacks')
try{

  fetch(`${window.location.origin}/getFeedback`).then(r=>r.json()).then((data)=>{
   if(data.status)
   {
    let s =''
    if(data.feedback.length <0)
      s = "<p>No FeedBack</p>"
    else{
      data.feedback.forEach((e)=>{
        s += ` <div class="feedback-card">
        <div>
         <p class="small">UserId : <a href="#">${e.userId}</a></p> 
        </div>
        <div>
          <p>Feed Back : ${e.feedback} </p>
        </div>
    </div>`
      })
      feedbacks.innerHTML = s
    }
   }else{
    alert(data.message)
   }
  })

}catch(error){
console.log('====================================')
console.log(error)
console.log('====================================')
}

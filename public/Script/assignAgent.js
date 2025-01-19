let getdata =  fetch(`${window.location.origin}/getAgent`,{
    method:"GET",
    headers:{
        "x-api-key":"qwertyuiopasdfghjklzxcvbnm"
    }
}).then(res=>res.json())
let getHipeData =  fetch(`${window.location.origin}/getAgentHipe`).then(res=>res.json())
//

async function getPagination(initial, limit) {
    try {
      // Fetch data
      const dataResponse = await getdata;
      const hipeResponse = await getHipeData;
      // console.log(dataResponse)
      // console.log(hipeResponse)
      // Store listing data in localStorage
      // localStorage.clear()
      localStorage.setItem("listing_data", JSON.stringify(dataResponse.data));
      // console.log(JSON.parse(localStorage.getItem("listing_data")))

      // Get listing data and hipe data
      const listingData = JSON.parse(localStorage.getItem("listing_data"));
      const filteredAgents = listingData.slice(initial, initial + limit);
  
      // Render HTML for agents
      const listingCard = document.getElementById("listing_card");
      let s = "";
  
      filteredAgents.forEach((agent) => {
        // Filter hipe data for the current agent
        const matchingHipe = hipeResponse.find(
          (z) => z.details["_id"] === agent["_id"]
        );
  
        let totalLikes = 0;
        let totalViews = 0;
  
        // Accumulate likes and views from hipe data
        if (matchingHipe && matchingHipe.hipe.length > 0) {
          matchingHipe.hipe.forEach((lv) => {
            totalLikes += lv.like || 0;
            totalViews += lv.views || 0;
          });
        }
  
        // Generate HTML for the agent
        s += `<div id="${agent["_id"]}" class="agent_card">
                <div class="agent_card_img">
                    <img src="${window.location.origin}${agent.image}">
                </div>
                <div class="agent_card_info">
                    <div class="agent_username">
                        <p>${agent.username} <i class="fa-solid fa-ranking-star"></i></p>
                    </div>
                    <div class="agent_bio"> 
                        <p>${agent.bio}</p>   
                    </div>
                    <div class="agent_socialView">
                        <p style="display:${agent.listing.length > 0 ? "" : "none"}"><i class="fa-solid fa-house"></i> ${
                          agent.listing.length || "Na"
                        } property</p>
                        <p><i class="fa-solid fa-eye"></i> ${totalViews} views</p>
                        <p><i class="fa-solid fa-thumbs-up"></i> ${totalLikes} likes</p>
                    </div>
                    <div class="agent_contact">
                        <div class="agent_contact_info">
                            <p><i class="fa-solid fa-envelope"></i> ${agent.email || "NA"}</p>
                        </div>
                        <div class="agent_contact_info">
                            <p><i class="fa-solid fa-phone"></i> ${agent.phone || "NA"}</p>
                        </div>
                    </div>
                    <div class="ask_agent">
                        <button onClick="handleAlot('${agent["_id"]}')" >Alot ✨</button>
                    </div>
                </div>
            </div>`;
      });
  
      // Update the HTML content of the listing card
      listingCard.innerHTML = s;
    } catch (error) {
      console.error("Error in getPagination:", error);
    }
  }
  
 

  const pagination = { initial: 0, limit: 10 };
  getPagination(pagination.initial , pagination.limit)
  // Fetch data once and calculate total length
  const listingData = JSON.parse(localStorage.getItem('listing_data')) || [];
  const totalDataCount = listingData.length;
  
  // Initial Pagination Call
  if (totalDataCount > 0) {
    getPagination(pagination.initial, pagination.limit);
  } else {
    console.log("No data available to paginate!");
  }

  const showError = document.getElementById("showError")
  const showErrorMessage = document.getElementById('showErrorMessage')
          showError.style.display = "none"
  // Handle Previous Button Click
  function handlePreviousButton() {

    if (pagination.initial > 0) {
        showError.style.display = "none"
      pagination.initial -= pagination.limit;
      getPagination(pagination.initial, pagination.limit);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        showError.style.display ="flex"
        showErrorMessage.textContent = "You're already on the first page!"
      console.log("You're already on the first page!");
    }
  }
  
  // Handle Next Button Click
  function handleNextButton() {
    if (pagination.initial + pagination.limit < totalDataCount) {
      showError.style.display = "none"
        pagination.initial += pagination.limit;
      getPagination(pagination.initial, pagination.limit);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        showError.style.display = "flex"
        showErrorMessage.textContent = "You are at the end"
      console.log("No more data to fetch!");
    }
  }
  
  // alot handling function here

  async function getUserListingData()
  {

    return await fetch(`${window.location.origin}/getUserListing`).then(res=>res.json())

  } 

  // this is additional featue may be it will be after added it has some problem csss of the give n below template is already addded and it is not added to the comment

//   async function handleAlot(id) {
//     getUserListingData().then((data) => {
//         localStorage.setItem("user_listing", JSON.stringify(data));
//     });

//     let edit = document.getElementById(id);

//     // Remove any previously added div
//     const existingDiv = edit.nextElementSibling; // Check the next sibling for the appended div
//     if (existingDiv && existingDiv.classList.contains('user_listing_container')) {
//         existingDiv.remove();
//     }

//     let s = '';
//     let div = document.createElement("div");
//     div.className = "user_listing_container"; // Add a class for styling

//     JSON.parse(localStorage.getItem("user_listing")).forEach((e) => {
//         // console.log(e);
//       if( ! e.aloted?.status == true )
//       {
//         s += `
//         <div class="user_temp_card">
//           <div class="user_temp_listing_img">
//             <img src="${e.thumbnail || '/public/Assets/Default/home (1).svg'}" alt="${e.title}" />
//           </div>
      
//           <div class="user_temp_info">
//             <div class="user_temp_h1"><h3>${e.title}</h3><input type="checkbox" value="${e['_id']}" /></div>
//             <p>${e.location}</p>
//           </div>
          
//         </div>
//         `;
//       }
//     });

//     let btn = `<div class="askbutton"><button>Ask</button></div>`

//     div.innerHTML = s + btn;

//     // Append the new div after the edit element
//     edit.insertAdjacentElement("afterend", div);
// }

const cross = document.getElementById("cross")
const message = document.getElementById('message')
const msg1= document.getElementById("msg_1")
const msg2 = document.getElementById("msg_2")
cross.addEventListener("click",(e)=>{
message.style.display = "none"
})

const laoding = document.getElementById("loading")
async function handleAlot(id) {
  laoding.style.display = "flex"
  fetch(`${window.location.origin}/alotAgent/${id}`).then(res=>res.json()).then((data)=>{
    console.log(data)
    if(!data.status)
    {
      console.log(data.message)
      laoding.style.display = "none"
      message.style.display = "flex"
      msg1.textContent = "Message"
      msg2.textContent = 'Ask is already in process'
    }
    if(data.status)
      {
        console.log(data.message)
        laoding.style.display = "none"
      message.style.display = "flex"
       msg1.textContent = "Message"
      msg2.textContent = 'Ask is processing  Soon agent will contact you '
      }
  })
  
}
  
// Dynamic URL based on the current window's location
const url = `${window.location.origin}/getAgent`; // Complete API URL
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

const svgs = {
    arrow:` <svg viewBox="0 0 50 50" fill="none"
                                                   xmlns="http://www.w3.org/2000/svg"
                                                 width="24">
                                                  <circle opacity="0.5" cx="25"
                                                      cy="25" r="23"
                                                       fill="url(#icon-payments-cat_svg__paint0_linear_1141_21101)"></circle>
                                                   <mask
                                                       id="icon-payments-cat_svg__a"
                                                       fill="#fff">
                                                       <path fill-rule="evenodd"
                                                           clip-rule="evenodd"
                                                           d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z">
                                                       </path>
                                                   </mask>
                                                   <path fill-rule="evenodd"
                                                       clip-rule="evenodd"
                                                       d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z"
                                                       fill="#fff"></path>
                                                   <path
                                                       d="M25.958 20.962l-1.47-1.632 1.47 1.632zm2.067.109l-1.632 1.469 1.632-1.469zm-.109 2.068l-1.469-1.633 1.47 1.633zm-5.154 4.638l-1.469-1.632 1.469 1.632zm-.276 1.841l-1.883 1.13 1.883-1.13zM34.42 15.93l-2.084-.695 2.084.695zm-19.725 6.42l18.568-6.189-1.39-4.167-18.567 6.19 1.389 4.166zm5.265 1.75l-5.12-3.072-2.26 3.766 5.12 3.072 2.26-3.766zm2.072 3.348l5.394-4.854-2.938-3.264-5.394 4.854 2.938 3.264zm5.394-4.854a.732.732 0 01-1.034-.054l3.265-2.938a3.66 3.66 0 00-5.17-.272l2.939 3.265zm-1.034-.054a.732.732 0 01.054-1.034l2.938 3.265a3.66 3.66 0 00.273-5.169l-3.265 2.938zm.054-1.034l-5.154 4.639 2.938 3.264 5.154-4.638-2.938-3.265zm1.023 12.152l-3.101-5.17-3.766 2.26 3.101 5.17 3.766-2.26zm4.867-18.423l-6.189 18.568 4.167 1.389 6.19-18.568-4.168-1.389zm-8.633 20.682c1.61 2.682 5.622 2.241 6.611-.725l-4.167-1.39a.732.732 0 011.322-.144l-3.766 2.26zm-6.003-8.05a3.66 3.66 0 004.332-.419l-2.938-3.264a.732.732 0 01.866-.084l-2.26 3.766zm3.592-1.722a3.66 3.66 0 00-.69 4.603l3.766-2.26c.18.301.122.687-.138.921l-2.938-3.264zm11.97-9.984a.732.732 0 01-.925-.926l4.166 1.389c.954-2.861-1.768-5.583-4.63-4.63l1.39 4.167zm-19.956 2.022c-2.967.99-3.407 5.003-.726 6.611l2.26-3.766a.732.732 0 01-.145 1.322l-1.39-4.167z"
                                                       fill="#fff"
                                                       mask="url(#icon-payments-cat_svg__a)"></path>
                                                   <defs>
                                                       <lineargradient
                                                           id="icon-payments-cat_svg__paint0_linear_1141_21101"
                                                           x1="25" y1="2" x2="25"
                                                           y2="48"
                                                           gradientUnits="userSpaceOnUse">
                                                           <stop stop-color="#fff"
                                                               stop-opacity="0.71"></stop>
                                                           <stop offset="1"
                                                               stop-color="#fff"
                                                               stop-opacity="0"></stop>
                                                       </lineargradient>
                                                   </defs>
                                               </svg>`,
    whatsapp:` <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-whatsapp"
                                          viewBox="0 0 16 16"
                                          xml:space="preserve">
                                          <path
                                              d="M13.601 2.337a7.92 7.92 0 0 0-5.601-2.23C3.537.107 0 3.659 0 8.093a7.932 7.932 0 0 0 1.054 4.05L0 16l3.99-1.034a7.87 7.87 0 0 0 3.964 1.04h.004c4.392 0 8.002-3.515 8.044-7.922a7.92 7.92 0 0 0-2.401-5.747ZM8.058 15a6.886 6.886 0 0 1-3.656-1.02l-.26-.155-2.367.613.633-2.307-.166-.237a6.88 6.88 0 0 1-1.046-3.685c0-3.785 3.074-6.858 6.867-6.858a6.874 6.874 0 0 1 4.872 2.033 6.85 6.85 0 0 1 2.076 4.975c-.036 3.812-3.162 6.901-6.963 6.901Zm3.952-5.175c-.204-.102-1.208-.597-1.395-.666-.186-.07-.322-.102-.457.102-.134.204-.525.666-.645.804-.118.136-.237.153-.44.051-.204-.102-.86-.317-1.64-1.01a6.181 6.181 0 0 1-1.14-1.403c-.118-.203-.013-.313.09-.415.092-.092.204-.237.305-.356.1-.119.134-.203.203-.338.068-.135.034-.254-.017-.356-.05-.102-.457-1.102-.626-1.508-.165-.399-.334-.343-.457-.349-.118-.006-.254-.007-.39-.007a.754.754 0 0 0-.542.254c-.186.203-.71.694-.71 1.694s.728 1.963.828 2.102c.102.136 1.436 2.188 3.487 3.066.487.21.866.336 1.162.43.488.155.934.133 1.288.081.392-.06 1.208-.492 1.378-.967.17-.475.17-.88.118-.967-.051-.084-.186-.136-.39-.237Z"
                                              fill="currentColor"></path>
                                      </svg>`,
    instagram:` <svg
                                           xmlns="http://www.w3.org/2000/svg"
                                           width="16"
                                           height="16"
                                           fill="currentColor"
                                           class="bi bi-instagram"
                                           viewBox="0 0 16 16"
                                           xml:space="preserve">
                                           <path
                                               d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                                              fill="currentColor"></path>
                                       </svg>`,
    youtube:` <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-youtube"
                                          viewBox="0 0 16 16"
                                          xml:space="preserve">
                                          <path
                                              d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"
                                              fill="currentColor"></path>
                                      </svg>`
}

async function handleAppointment(agentMail, agentName, agentID) {
  {
    // Show loader while waiting for the response
    document.getElementById("loader").style.display = "flex";
    // console.log(typeof agentMail)
    const response = await fetch(
      `${window.location.origin}/handleAppointment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure content is in JSON format
        },
        body: JSON.stringify({
          agentmail: agentMail,
          agentname: agentName,
          agentID: agentID,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to handle appointment");
    }

    const data = await response.json();
    // console.log("Appointment handled successfully:", data);
    if (data.status == false) {
      let crossButton = document.getElementById("crossButton");
      let alert = document.getElementById("alert");

      alert.style.display = "flex";
      //   console.log(data)
      crossButton.addEventListener("click", () => {
        alert.style.display = "none";
      });
    }
    // Hide loader once response is received
    document.getElementById("loader").style.display = "none";
    return data;
  }
}
// Function to fetch agent data
// async function getAgentData() {
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": "qwertyuiopasdfghjklzxcvbnm", // Replace with your actual API key
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
  
//       const data = await response.json();
//       const container1 = document.getElementById("container1");
  
//       if (!Array.isArray(data) || data.length === 0) {
//         container1.innerHTML = `<p>No agents available</p>`;
//         return;
//       }
  
//       let content = data
//         .map((agent) => {
//           const listings =
//             agent.listAvailable && agent.listAvailable.length > 0
//               ? agent.listAvailable
//                   .map(
//                     (listing) => `
//                     <a href="#">
//                       <div class="popular-listing-img">
//                         <img src="${window.location.origin}${listing.thumbnail}" alt="Property Image">
//                       </div>
//                       <div class="popular-listing-info">
//                         <p style="font-size:12px"><i class="fa-solid fa-eye">${listing.views || "NA"}</i> ${listing.title || "Property Title"}</p>
//                       </div>
//                     </a>`
//                   )
//                   .join("")
//               : `<p>No listings available</p>`;
  
//           return `
//             <div class="agent-card">
//               <div class="agent-info">
//                 <div>
//                   <h2 class="Agent-title"><i class="fa-solid fa-user"></i> ${capitalizeFirstLetter(agent.username)}</h2>
//                   <p>${agent.bio}</p>
//                   <div class="agent-info-ul-appointment">
//                     <ul>
//                       <li><strong>Experience:</strong> ${agent.experience || "N/A"}</li>
//                       <li><strong>Specialty:</strong> ${agent.specialty || "N/A"}</li>
//                       <li><strong>Contact <i class="fa-solid fa-envelope"></i>:</strong> ${agent.email}</li>
//                     </ul>
//                     <div class="sendAppointmentBtn">
//                       <button onclick='handleAppointment("${agent.email}", "${agent.username}", "${agent["_id"]}")' id=${agent["_id"]} class="button" style="--clr: #00ad54;">
//                         <span class="button-decor"></span>
//                         <div class="button-content">
//                           <div class="button__icon">
//                            ${svgs.arrow}
//                           </div>
//                           <span class="button__text">Appointment</span>
//                         </div>
//                       </button>
//                     </div>
//                   </div>
//                   <h2>Popular Listings</h2>
//                 </div>
//                 <div id="popular-listing" class="popular-listing">${listings}</div>
//               </div>
//               <div class="agent-img">
//                 <div class="main-img">
//                   <img src="${window.location.origin}${agent.image}" alt="Agent Image">
//                 </div>
//                 <div class="more-info">
//                   <ul class="example-2">
//                     <li class="icon-content">
//                       <a href="${agent.whatsapp || "#"}" target="_blank" aria-label="WhatsApp" data-social="whatsapp">
//                         <div class="filled"></div>
//                         ${svgs.whatsapp}
//                       </a>
//                       <div class="tooltip">WhatsApp</div>
//                     </li>
//                     <li class="icon-content">
//                       <a href="${agent.instagram || "#"}" target="_blank" aria-label="Instagram" data-social="instagram">
//                         <div class="filled"></div>
//                        ${svgs.instagram}
//                       </a>
//                       <div class="tooltip">Instagram</div>
//                     </li>
//                     <li class="icon-content">
//                       <a href="${agent.youtube || "#"}" target="_blank" aria-label="YouTube" data-social="youtube">
//                         <div class="filled"></div>
//                          ${svgs.youtube}
//                       </a>
//                       <div class="tooltip">YouTube</div>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>`;
//         })
//         .join("");
  
//       container1.innerHTML = content;
//     } catch (error) {
//       console.error("Error fetching agent data:", error);
//       document.getElementById("container1").innerHTML = `<p>Error loading agents. Please try again later.</p>`;
//     }
//   }
  
  
let currentPage = 1;  // To keep track of the current page of data
let isLoading = false; // To prevent multiple simultaneous requests
let maxCount = 0;  // To store the total number of agents

async function getAgentData(page = 1) {
  try {
    // Check if we are already loading data, to prevent multiple requests
    if (isLoading) return;
    isLoading = true;

    // Show loader while waiting for the response
    document.getElementById("loader").style.display = "flex";

    const response = await fetch(`${url}?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "qwertyuiopasdfghjklzxcvbnm", // Replace with your actual API key
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log(data);

    const container1 = document.getElementById("container1");

    // Update maxCount (total agents) for pagination logic
    if (page === 1) {
      maxCount = data.maxCount;
    }

    if (!Array.isArray(data.data) || data.data.length === 0) {
      if (page === 1) {
        container1.innerHTML = `<p>No agents available</p>`;
      }
      return;
    }

    // Sort agents alphabetically by their name (username)
    const sortedAgents = data.data.sort((a, b) => {
      const nameA = a.username.toLowerCase(); // Case-insensitive comparison
      const nameB = b.username.toLowerCase();
      return nameA.localeCompare(nameB); // Sort alphabetically
    });

    // Create content for each agent
    let content = sortedAgents
      .map((agent) => {
        const listings =
          agent.listAvailable && agent.listAvailable.length > 0
            ? agent.listAvailable
                .map(
                  (listing) => `  
                  <a href="/property-details?id=${listing._id}">
                    <div class="popular-listing-img">
                      <img src="${window.location.origin}${listing.thumbnail}" alt="Property Image">
                    </div>
                    <div class="popular-listing-info">
                      <p style="font-size:12px"> ${capitalizeFirstLetter(listing.title) || "Property Title"}  <i class="fa-solid fa-eye">  ${listing.views || "NA"}</i></p>
                    </div>
                  </a>`
                )
                .join("")
            : `<p>No listings available</p>`;

        return `
          <div class="agent-card">
            <div class="agent-info">
              <div>
                <h2 class="Agent-title"><i class="fa-solid fa-user"></i> ${capitalizeFirstLetter(agent.username)}</h2>
                <p>${agent.bio}</p>
                <div class="agent-info-ul-appointment">
                  <ul>
                    <li><strong>Experience:</strong> ${agent.experience || "N/A"}</li>
                    <li><strong>Specialty:</strong> ${agent.specialty || "N/A"}</li>
                    <li><strong>Contact <i class="fa-solid fa-envelope"></i>:</strong> ${agent.email}</li>
                  </ul>
                  <div class="sendAppointmentBtn">
                    <button onclick='handleAppointment("${agent.email}", "${capitalizeFirstLetter(agent.username)}", "${agent["_id"]}")' id=${agent["_id"]} class="button" style="--clr: #00ad54;">
                      <span class="button-decor"></span>
                      <div class="button-content">
                        <div class="button__icon">
                          ${svgs.arrow}
                        </div>
                        <span class="button__text">Appointment</span>
                      </div>
                    </button>
                  </div>
                </div>
                <h2>Popular Listings</h2>
              </div>
              <div id="popular-listing" class="popular-listing">${listings}</div>
            </div>
            <div class="agent-img">
              <div class="main-img">
                <img src="${window.location.origin}${agent.image}" alt="Agent Image">
              </div>
              <div class="more-info">
                <ul class="example-2">
                  <li class="icon-content">
                    <a href="${agent.whatsapp || "#"}" target="_blank" aria-label="WhatsApp" data-social="whatsapp">
                      <div class="filled"></div>
                      ${svgs.whatsapp}
                    </a>
                    <div class="tooltip">WhatsApp</div>
                  </li>
                  <li class="icon-content">
                    <a href="${agent.instagram || "#"}" target="_blank" aria-label="Instagram" data-social="instagram">
                      <div class="filled"></div>
                      ${svgs.instagram}
                    </a>
                    <div class="tooltip">Instagram</div>
                  </li>
                  <li class="icon-content">
                    <a href="${agent.youtube || "#"}" target="_blank" aria-label="YouTube" data-social="youtube">
                      <div class="filled"></div>
                      ${svgs.youtube}
                    </a>
                    <div class="tooltip">YouTube</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
      })
      .join("");

    // Append the new data to the container
    container1.innerHTML += content;

    // Hide loader once response is received
    document.getElementById("loader").style.display = "none";
    isLoading = false;

    // If the number of results is less than 10, stop the infinite scroll
    if (data.data.length < 10 || currentPage * 10 >= maxCount) {
      window.removeEventListener('scroll', loadMoreData); // Stop scrolling if no more data

      // Add "You have reached the end" message
      if (!document.getElementById("end-message")) {
        const endMessage = document.createElement("div");
        // endMessage.style.cssText = `display:flex;flex-direction:center;text-align:center`
        endMessage.id = "end-message";
        endMessage.innerHTML = "<p>You have reached the end</p>";
        document.body.appendChild(endMessage);
      }
    }

  } catch (error) {
    console.error(error);
    document.getElementById("loader").style.display = "none";
    isLoading = false;
  }
}

// Function to detect when the user is near the bottom of the page
function loadMoreData() {
  const bottomOfPage = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;

  if (bottomOfPage && !isLoading) {
    currentPage += 1;
    getAgentData(currentPage);
  }
}

// Add event listener for scrolling
window.addEventListener('scroll', loadMoreData);

// Initial data load
getAgentData(currentPage);

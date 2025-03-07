// const { response } = require("express");

window.addEventListener("beforeunload", (event) => {
  // console.log("Page is being refreshed or closed.");
  localStorage.clear();
});


fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/getAppointments`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
      let allAppointment = document.getElementById("allAppointment");
      if(data.length < 1)
      {
        allAppointment.innerHTML = ''
        allAppointment.innerHTML = `<div class='appointment-container'><p style='color:black;text-align:center'>No Appointment</p></div>`
        return 
      }
    
        let s = ''; // Initialize the string for concatenation

        data.forEach(e => {
            s += `<div class="appointment-container">
                <h1>Appointment</h1>
                <form id="appointment-form-${e['_id']}">
                  <!-- Appointment Details -->
                  <div class="form-group">
                    <input type="text" id="name-${e['_id']}" name="username" placeholder="Client Name" value="${e.username || ''}" readonly>
                  </div>
                  <div class="form-group">
                    <input type="text" id="email-${e['_id']}" name="email" placeholder="Client Email" value="${e.email || ''}" readonly>
                  </div>
                  <div class="form-group">
                    <input type="text" id="phone-${e['_id']}" name="phone" placeholder="Client Phone" value="${e.phone || 'NA'}" readonly>
                  </div>
                  <div class="form-group">
                    <label for="appointment-date">Select Date:</label>
                    <input type="date" id="date-${e['_id']}" name="appointment-date" value="${e.date || ''}" required>
                  </div>
                  <div class="form-group">
                    <label for="appointment-time">Select Time:</label>
                    <input type="time" id="time-${e['_id']}" name="appointment-time" value="${e.time || ''}" required>
                  </div>

                  <!-- Appointment Mode -->
                  <div class="form-group">
                    <label>Appointment Mode:</label>
                    <div class="radio-group">
                      <label>
                        <input type="radio" id="call-${e['_id']}" name="mode-${e['_id']}" value="call" ${e.mode === 'call' ? 'checked' : ''} required>
                        Over Call
                      </label>
                      <label>
                        <input type="radio" id="office-${e['_id']}" name="mode-${e['_id']}" value="office" ${e.mode === 'office' ? 'checked' : ''} required>
                        At Office
                      </label>
                    </div>
                  </div>

                  <!-- Appointment Status -->
                  <div class="form-group">
                    <label>Action:</label>
                    <div class="button-group">
                      <button type="button" class="accept-btn" id="accept-${e["_id"]}">Accept</button>
                      <button type="button" class="reject-btn" id="reject-${e["_id"]}">Reject</button>
                    </div>
                  </div>
                </form>
              </div>`;
        });

        allAppointment.innerHTML = s; // Set the content after the loop

        // Add event listeners after rendering
        data.forEach(e => {
            const accept = document.getElementById(`accept-${e['_id']}`);
            const reject = document.getElementById(`reject-${e['_id']}`);

            // Function to handle both accepting and rejecting appointments
            const handleAppointment = (status) => {
                const email = document.getElementById(`email-${e['_id']}`).value;
                const date = document.getElementById(`date-${e['_id']}`).value;
                const time = document.getElementById(`time-${e['_id']}`).value;
                const mode = document.querySelector(`input[name="mode-${e['_id']}"]:checked`)?.value;

                if ((!date || !time || !mode) && status == "accepted") {
                    let alert = document.getElementById("alert");
                    alert.style.display = 'flex';
                    setTimeout(() => {
                        alert.style.display = 'none';
                    }, 2000);
                    return;
                }

                let loader = document.querySelector(".loader");
                loader.style.display = "block";

                // Send the request to the server to update the status
                fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/acceptOrReject`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        id: e['_id'],
                        date: date,
                        time: time,
                        mode: mode,
                        email: email,
                        status: status,
                    }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Response:', data);
                        loader.style.display = "none";
                        // Handle additional success actions, like updating UI
                    })
                    .catch(err => {
                        console.error('Error updating appointment:', err);
                       if(status == 'accepted')
                       {
                        setTimeout(()=>{
                          loader.style.display = "none";
                        },1000)
                       }else{
                        loader.style.display = "none";
                       }
                        alert('Failed to update the appointment.');
                    });
            };

            // Attach event listeners for both accept and reject buttons
            accept.addEventListener("click", () => handleAppointment('accepted'));
            reject.addEventListener("click", () => handleAppointment('rejected'));
        });
    })
    .catch(error => {
        console.error('Error fetching appointments:', error);
    });

//     fetch("/agentThree/2").then((r)=>r.json()).then((data)=>{
// console.log(data)
//     })

const accepted_appointment = document.getElementById("accepted_appointment");
const accepted_allotment = document.getElementById("accepted_allotment");
const ask_slot = document.getElementById("ask_slot");
const accepted_appointment_container = document.getElementById("accepted_appointment_container");
const accepted_allotment_container = document.getElementById("accepted_allotment_container");
const asked_slot = document.getElementById("asked_slot");

ask_slot.addEventListener("click", async () => {
  if (asked_slot.classList.contains("hide")) {
    asked_slot.classList.remove("hide");
    asked_slot.classList.add("show_flex");

    let data = localStorage.getItem("slot_data");
    
    if (data) {
      data = JSON.parse(data); // Parse before passing
      await slot_card_dynamically(data);
    } else {
      await setThreeAgent("slot_data", 3);
      data = localStorage.getItem("slot_data");
      if (data) {
        data = JSON.parse(data);
        await slot_card_dynamically(data);
      }
    }
  } else {
    asked_slot.classList.remove("show_flex");
    asked_slot.classList.add("hide");
  }
});

async function setThreeAgent(name, id) {
  try {
    const response = await fetch(`/agentThree/${id}`);
    const data = await response.json();
    localStorage.setItem(name, JSON.stringify(data));
    console.log(data);
  } catch (error) {
    console.error("Error fetching agent data:", error);
  }
}

async function slot_card_dynamically(data) {
//  console.log(data)
 if(data.length <= 0)
 {
  asked_slot.innerHTML = `<i style="color:blue">There no asked slot !!!</i>`;  
 }else{
  let s = "";
  data.forEach((d) => {
    console.log(d)
    s += `
      <div class="slot_card">
        <div class="slot_card_image">
          <img src=${d.image || "/public/Assets/Default/defaultimage-removebg-preview.png"} alt="Agent Image" />
        </div>
        <div class="slot_card_info">
          <p>Email: ${d.email || "N/A"}</p>
          <p>Name: ${d.username || "N/A"}</p>
          <p>Total Listing: ${d.listing.length || "NA"}</p>
          <div class="slot_acc_rej">
            <button class="accept-btn" onClick="handleAccept_Slot('${d["_id"]}')" >Accept</button>
            <button class="reject-btn" onClick="handleReject_Slot('${d["_id"]}')" >Reject</button>
          </div>
        </div>
      </div>
    `;
  });

  asked_slot.innerHTML = s;  
 }
}

function handleAccept_Slot(id)
{
  // console.log(id)
  fetch(`/handleacceptReject/1/${id}`).then(data=>data.json()).then((d)=>{
    // console.log(d)
    if(d.status == true)
      localStorage.removeItem("slot_data")
    else
    localStorage.removeItem("slot_data")

    ask_slot.click()
    ask_slot.click()
  })
}
function handleReject_Slot(id)
{
  fetch(`/handleacceptReject/2/${id}`).then((d)=>{
    // console.log(d)
    if(d.status == true)
      localStorage.removeItem("slot_data")
    else
    localStorage.removeItem("slot_data")

    ask_slot.click()  
    ask_slot.click()

  })

  // console.log(id)
}

accepted_allotment.addEventListener('click',async(e)=>{
  // console.log("Clicked")
  if (accepted_allotment_container.classList.contains("hide")) {
    accepted_allotment_container.classList.remove("hide");
    accepted_allotment_container.classList.add("show_flex");

    let data = localStorage.getItem("acceptSlot_data");
    
    if (data) {
      data = JSON.parse(data); // Parse before passing
      await accept_slot_card_dynamically(data);
    } else {
      await setThreeAgent("acceptSlot_data", 2);
      data = localStorage.getItem("acceptSlot_data");
      if (data) {
        data = JSON.parse(data);
        await accept_slot_card_dynamically(data);
      }
    }
  } else {
    // console.log("hide added")
    accepted_allotment_container.classList.remove("show_flex");
    accepted_allotment_container.classList.add("hide");
  }

});


async function accept_slot_card_dynamically (data)
{
  //  console.log(data)
 if(data.length <= 0)
  {
   accepted_allotment_container.innerHTML = `<i style="color:blue">There no accepted  slot !!!</i>`;  
  }else{
   let s = "";
   data.forEach((d) => {
     console.log(d)
     s += `
       <div class="slot_card">
         <div class="slot_card_image">
           <img src=${d.image || "/public/Assets/Default/defaultimage-removebg-preview.png"} alt="Agent Image" />
         </div>
         <div class="slot_card_info">
           <p>Email: ${d.email || "N/A"}</p>
           <p>Name: ${d.username || "N/A"}</p>
           <p>Name: ${d.phone || "N/A"}</p>
           <p>Total Listing: ${d.listing.length || "NA"}</p>
         </div>
       </div>
     `;
   });
 
   accepted_allotment_container.innerHTML = s;  
  }
}

accepted_appointment.addEventListener('click',async(e)=>{

  if (accepted_appointment_container.classList.contains("hide")) {
    accepted_appointment_container.classList.remove("hide");
    accepted_appointment_container.classList.add("show_flex");

    let data = localStorage.getItem("acceptAppointment_data");
    
    if (data) {
      data = JSON.parse(data); // Parse before passing
      await accept_slot_card_dynamically(data);
    } else {
      await setThreeAgent("acceptAppointment_data", 1);
      data = localStorage.getItem("acceptAppointment_data");
      if (data) {
        data = JSON.parse(data);
        await accept_appointment_card_dynamically(data);
      }
    }
  } else {
    // console.log("hide added")
    accepted_appointment_container.classList.remove("show_flex");
    accepted_appointment_container.classList.add("hide");
  }

})

async function accept_appointment_card_dynamically (data)
{
  //  console.log(data.acceptUser)
 if(data.acceptUser?.length <= 0)
  {
   accepted_appointment_container.innerHTML = `<i style="color:blue">There no accepted  appointment !!!</i>`;  
  }else{
   let s = "";
   data.acceptUser.forEach((d) => {
    //  console.log(d)
     s += `
       <div class="slot_card">
         <div class="slot_card_image">
           <img src=${d.image || "/public/Assets/Default/defaultimage-removebg-preview.png"} alt="Agent Image" />
         </div>
         <div class="slot_card_info">
           <p>Email: ${d.email || "N/A"}</p>
           <p>Name: ${d.username || "N/A"}</p>
          <p>Name: ${d.phone || "N/A"}</p>
         </div>
       </div>
     `;
   });
 
   accepted_appointment_container.innerHTML = s;  
  }
}

// first make the asked slot then the card of the appointmewnt and allotment accepted are same so make it togehter first make the asked slot ok 
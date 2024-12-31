fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/getAppointments`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
      let allAppointment = document.getElementById("allAppointment");
      if(WebTransportDatagramDuplexStream.length < 1)
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

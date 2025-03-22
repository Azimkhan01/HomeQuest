const profile = document.getElementById('profile');
const asked = document.getElementById('asked');
const feed = document.getElementById('feed');
const listing = document.getElementById('listing');
const spinner = document.getElementById('spinner');

// Fetch Agent Data
const getAgentData = async () => {
    try {
        // Send the request to the backend
        const response = await fetch(`${window.location.origin}/getCurrentAgent`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for authentication if needed
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch agent data');
        }

        // Parse the JSON response
        return await response.json();
    } catch (error) {
        console.error('Error fetching agent data:', error);
        return { status: false, message: error.message }; // Return error structure
    }
};

// IIFE to execute immediately
(async () => {
    const result = await getAgentData();
    console.log(result);
    let s = ''
    result.agentFeed.forEach((element) => {
        s += `
        <div id=${element._id}   class="imgFeed">
  <img src="/public/Assets/postImage/${element.images[0]}" alt="Feed Image">
</div>
      `
    })
    feed.innerHTML = "";
    feed.innerHTML = s;
    result.agentFeed.forEach((element) => {
        document.getElementById(element._id).addEventListener('click', (e) => { changeFeedAngle(e) })
    })
    if (result.status) {
        // Calculate total views from agentListings
        const totalViews = result.agentListing.reduce((sum, listing) => {
            return sum + (listing.views || 0); // Add the views or 0 if views are not present
        }, 0);



        // Update the profile with the data
        profile.innerHTML = `
            <div class="info">
                <div class="image-container">
                    <div class="image-holder">
                        <img src="${result.info.imgStatus ? result.info.image : '/public/Assets/Default/defaultimage-removebg-preview.png'}" alt="default">
                    </div>
                </div>
                <div class="agent-info">
                    <div>
                        <p>Name : ${result.info.username || "NA"}</p>
                    </div>
                    <div>
                        <p>Bio : ${result.info.bio || "NA"}</p>
                    </div>
                    <div>
                        <p>Posts : ${result.agentFeed.length || "0"}</p>
                    </div>
                    <div>
                        <p>Listing : ${result.agentListing.length || "0"}</p>
                    </div>
                    <div>
                        <p>Views : ${totalViews || "0"}</p> <!-- Display total views -->
                    </div>
                </div>
            </div>
            <div class="appointment">
                <div>
                    <p>Accepted : ${result.info.accept ? result.info.accept.length : "0"}</p>
                </div>
                <div>
                    <p>Rejected : ${result.info.reject ? result.info.reject.length : "0"}</p>
                </div>
            </div>
            
                <div class="seeMore">
                    <a href='/Dashboard'>Show Appointment</a>
                    <div id="logout">
                        <form method="get" action="/profile/logout">
                        <button type="submit" class="logout-button">Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                        </form>
                    </div>
                </div>
                
        `;

    } else {
        // Handle failure response
        alert('Failed to fetch agent data: ' + result.message);
    }


})();

async function handleFeed() {
    if (feed.style.display == "none" || feed.style.display == "") {
        console.log("Feed");
        listing.style.display = "none";
        spinner.style.display = "inline-block";
        setTimeout(() => {
            let s = '';
            getAgentData().then((r) => {
                r.agentFeed.forEach(element => {
                    s += `
                 <div id=${element._id}  class="imgFeed">
           <img src="/public/Assets/postImage/${element.images[0]}" alt="listing Image">
       </div>
               `
                });
                feed.innerHTML = "";
                feed.innerHTML = s;
                spinner.style.display = "none";
                feed.style.display = "flex";
        asked.scrollIntoView({ behavior: "smooth" })

            })
            r.agentFeed.forEach((element) => {
                document.getElementById(element._id).addEventListener('click', (e) => { changeFeedAngle(e) })
            })
        }, 500)

    } else {
        console.log("Feed r");

        return
    }
}

async function handleListing() {
    if (listing.style.display == "none" || listing.style.display == "") {
        console.log("Listing");
        feed.style.display = "none";
        spinner.style.display = "inline-block";
        setTimeout(() => {
            let s = '';
            getAgentData().then((r) => {
                console.log('loading the listing');
                r.agentListing.forEach(element => {
                    // console.log(element)
                    s += `
                  <div  class="imgFeed">
            <img src="${element.thumbnail}" alt="Feed Image">
        </div>
                `
                    console.log('loading the listing end');
                });
                listing.innerHTML = ""
                listing.innerHTML = s;
                spinner.style.display = "none";
                listing.style.display = "flex";
                
        asked.scrollIntoView({ behavior: "smooth" })
            })
        }, 500)


    } else {
        console.log("Listing r");

        return
    }
}

function changeFeedAngle(e) {
    let feed = document.getElementById('feed')
    let imgFeed = document.querySelectorAll('.imgFeed')
    if (feed.style.flexDirection == "" || feed.style.flexDirection == "row") {
        feed.style.flexDirection = "column"
        feed.style.justifyContent = 'center'
        feed.style.alignItems = 'center'
        if (window.matchMedia("(max-width: 768px)").matches) {
            imgFeed.forEach((e) => {
                e.style.width = "60%";
            });
        } else {
            imgFeed.forEach((e) => {
                e.style.width = "40%";
            });
        }
        e.target.scrollIntoView({ behavior: "smooth" })
    }
    else {
        feed.style.flexDirection = 'row'
        imgFeed.forEach((e) => {
            e.style.width = "calc(33.33% - 5px)"
        })
    }

}
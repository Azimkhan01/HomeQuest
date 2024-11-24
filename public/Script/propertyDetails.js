//dynamic updating the dom

let paramId = new URLSearchParams(window.location.search).get("id") || null;

async function setViewsInfo(Id) {
  if (Id == null) {
    console.error("Error: ID is null or undefined");
    // Redirect and display an error message
    window.location.href = "/error";
    return; // Prevent further execution
  }

  try {
    const response = await fetch(`${window.location.origin}/getViews/${Id}`);

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch view info:", error.message);
    throw error; // Rethrow to be caught by the outer catch block
  }
}

// Usage
setViewsInfo(paramId)
  .then(() => {
    return;
  })
  .catch((error) => {
    console.error("An error occurred while setting view info:", error.message);
  });

async function getDetails(Id) {
  if (!Id) {
    throw new Error("Invalid ID");
  }
  return fetch(`${window.location.origin}/getPropertyDetails/${Id}`).then(
    (data) => data.json()
  );
}

// Fetch details
getDetails(paramId)
  .then((details) => {
    let container = document.getElementById("container");
    let imagesFullView = document.getElementById("imagesFullView");
    // console.log(details.details.AllImages);
    let imagesdiv = "";
    details.details.AllImages.forEach((e) => {
      imagesdiv += ` ${window.location.origin + e}`;
    });
    let comeback = ``;
    let setImageDiv = imagesdiv || comeback;
    let s = `
       <div class="overview-images">
    <div>
        <img id="corousel" src="${details.details.thumbnail}">
    </div>

</div>
<div class="main-image-description">
    <div class="other-image-description">
        <div class="image-owner">
            <i>Owner Name : <strong>${details.byOwner.username
                    } <a style="color:#3EB8E5" href="mailto:${details.byOwner.email
      }">Mail</a></strong></i>
        </div>
        <div class="image-abb">
            <div>
                <p>
                    Area : ${details.details.area || "NA"}
                </p>
            </div>
            <div>
                <p>
                    Bedroom : ${details.details.bedrooms || "NA"}
                </p>
            </div>
            <div>
                <p>
                    Bathroom : ${details.details.bathrooms || "NA"}
                </p>
            </div>
        </div>
        <div class="image-title">
            <h1>
                ${details.details.title || "NA"}
            </h1>
        </div>
        <div class="image-location">
            <p>
                ${details.details.location || "NA"}
            </p>
        </div>
        <div class="image-price">
            <p>
                Price : ${details.details.price || "NA"}
            </p>
        </div>

        <div class="image-listingType">
            <p>
                ${details.details.listingType || "NA"}
            </p>
        </div>
        <div class="propertyType">
            <p>
                ${details.details.propertyType || "NA"}
            </p>
        </div>
        <div class="views-like">
            <div class="view">
                <i class="fa-regular fa-eye"></i>
                <p>${details.details.views || "NA"}</p>
            </div>
            <div class="like">
                <i class="fa-solid fa-thumbs-up"></i>
                <p>${details.details.like || "loading ....."}</p>
            </div>
        </div>
    </div>
    <div class="btn-navigation-image">



        <div class="image-navigation">
            <div id="show-all-images">
                <div class="icon-container">
                    <i class="fa-regular fa-images"></i>
                </div>
                <img class="image-blur" src="${window.location.origin}${details.details.AllImages[2] ||
      details.details.AllImages[1] ||
      details.details.AllImages[0]
      }" alt="Gallery Thumbnail">
                <p style="color: #666565;">${details.details.AllImages.length} Images</p>
            </div>



            <div id="show-video">
                <div class="videoPlayButton">
                    <i class="fa-regular fa-circle-play"></i>
                </div>
                <img class="image=blur" src="${window.location.origin}${details.details.thumbnail}">
                <p style="color:#666565">video</p>
            </div>
        </div>
    </div>
</div>
    `;
    container.innerHTML = "";
    container.innerHTML = s;
    let videoDiv = ` <div id="removeimage">
<i class="fa-solid fa-xmark"></i>
        </div>`
    let imagesDiVImages = ` <div id="removeimage">
<i class="fa-solid fa-xmark"></i>
        </div>`;
    details.details.AllImages.forEach((e) => {
      imagesDiVImages += ` <div>
            <img src="${window.location.origin}${e}">
        </div>`;
    });
    videoDiv+= `<div><video id="mainVideo" src="${window.location.origin}/stream/${details.details.video}" controls  controlsList="nopictureinpicture">></video><div>`

let video = document.getElementById('show-video')
    let showallimages = document.getElementById("show-all-images");
    showallimages.addEventListener("click", (e) => {
      imagesFullView.style.display = "flex";
      imagesFullView.innerHTML = imagesDiVImages;
      let removeimage = document.getElementById("removeimage");
      removeimage.addEventListener("click", () => {
        imagesFullView.innerHTML = ''
        imagesFullView.style.display = "none";

      });
    });
    video.addEventListener("click",(e)=>{
      imagesFullView.style.display = "flex";
      imagesFullView.innerHTML = ''
      imagesFullView.innerHTML = videoDiv
      let removeimage = document.getElementById("removeimage");
      removeimage.addEventListener("click", () => {
        imagesFullView.innerHTML = ''
        imagesFullView.style.display = "none";
      });
    })
  })
  .catch((error) => {
    console.error("Error fetching property details:", error.message);
  });

//reply input on off
let cancelReply = document.getElementById('cancelReply')
let replyToReply = document.getElementById('replyToReply')
let  replyButton = document.getElementById("reply-button")
replyButton.addEventListener("click",()=>{
replyToReply.style.display = "flex"
cancelReply.addEventListener('click',(e)=>{
  replyToReply.style.display = 'none'
})
})
//onclick send then



let feedbackInput = document.getElementById('feedbackInput');
let addComment = document.getElementById("addComment");

addComment.addEventListener("click", async (e) => {
  if (feedbackInput.value.trim() !== "") {
    e.target.disabled = true; // Disable the button while processing
    alert("Submitting your comment...");

    try {
      const response = await fetch(`${window.location.origin}/addComment/${paramId}`, {
        method: "POST", // HTTP POST method
        headers: {
          "Content-Type": "application/json", // Send JSON data
        },
        body: JSON.stringify({ comment: feedbackInput.value }), // Pass the comment in the request body
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        const errorData = await response.json();
        console.error("Server response:", errorData);
        // alert("Failed to add comment. Please try again.");
        e.target.disabled = false; // Re-enable the button
        return;
      }

      const data = await response.json();
      console.log("Comment added successfully:", data);
      feedbackInput.value = "";
      updateCommentSection(paramId)
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("An error occurred while adding the comment.");
    } finally {
      e.target.disabled = false; // Re-enable the button after completion
    }
  } else {
    alert("Please enter a comment before submitting.");
    e.target.disabled = true; // Keep the button disabled
  }
});

let updateCommentSection = async(paramId)=>{
  try{
fetch(`${window.location.origin}/getComment/${paramId}`).then(data=>data.json()).then((e)=>{
console.log(e)  
let s = ``
let feedbackItem = document.getElementById("feedback-item")
e.data.forEach((e)=>{
  console.log(e)
s+= ` <div class="feedback-header">
                <img src="${e.image}" alt="User Avatar" class="user-avatar" />
                <div class="user-info">
                    <p class="user-name">${e.username}</p>
                    <p class="feedback-date">${e.date}</p>
                </div>
            </div>
            <div class="feedback-content">
                <p>${e.text}</p>
            </div>
            <button class="reply-button" id="reply-button">Reply</button>
            <div id="replyToReply">
                <input type="text" placeholder="Reply"/>
                <button id="cancelReply">Cancel</button>
                <button id="addReplyToReply" >Add a reply</button>
            </div>
            <div class="showMoreReplies">
                <p><i class="fa-solid fa-chevron-down"></i> 50 Replies</p>
            </div>
            <div class="replies">
                <!-- Nested replies -->
                <div class="reply-item">
                    <div class="feedback-header">
                        <img src="https://via.placeholder.com/40" alt="User Avatar" class="user-avatar" />
                        <div class="user-info">
                            <p class="user-name">Jane Doe</p>
                            <p class="feedback-date">Nov 24, 2024 - 11:00 AM</p>
                        </div>
                    </div>
                    <div class="feedback-content">
                        <p>This is a reply to the feedback.</p>
                    </div>
                </div>
            </div>`
});
feedbackItem.innerHTML = ''
feedbackItem.innerHTML = s
})
  }catch(error)
  {
    console.error("the fetching error for getting the comment may be:"+error)
  }
}

updateCommentSection(paramId)
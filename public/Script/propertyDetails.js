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
  .then(async (details) => {
    let container = document.getElementById("container");
    let imagesFullView = document.getElementById("imagesFullView");
    // console.log(details.details.AllImages);
    let imagesdiv = "";
    details.details.AllImages.forEach((e) => {
      imagesdiv += ` ${window.location.origin + e}`;
    });
    let comeback = ``;
    let setImageDiv = imagesdiv || comeback;
    // console.log(details.details)
    let userResponse = await fetch(`${window.location.origin}/getLoginUser`);
    let userData = await userResponse.json();
    let s = `
       <div class="overview-images">
    <div>
        <img id="corousel" src="${details.details.thumbnail}">
    </div>

</div>
<div class="main-image-description">
    <div class="other-image-description">
        <div class="image-owner">
            <i>Owner Name : <strong>${
              details.byOwner.username
            } <a style="color:#3EB8E5" href="mailto:${
      details.byOwner.email
    }">mail</a></strong></i>
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
                <p>${details.details.views || 0}</p>
            </div>
            
            <div id="like" class="like ${userData.like.includes(paramId)?"liked" :"" }">
                <i class="fa-solid fa-thumbs-up"></i>
                <p id="mainView" >${details.details.like || 0 }</p>
            </div>
        </div>
    </div>
    <div class="btn-navigation-image">



        <div class="image-navigation">
            <div id="show-all-images">
                <div class="icon-container">
                    <i class="fa-regular fa-images"></i>
                </div>
                <img class="image-blur" src="${window.location.origin}${
      details.details.AllImages[2] ||
      details.details.AllImages[1] ||
      details.details.AllImages[0]
    }" alt="Gallery Thumbnail">
                <p style="color: #666565;">${
                  details.details.AllImages.length
                } Images</p>
            </div>

            <div id="show-video">
                <div class="videoPlayButton">
                    <i class="fa-regular fa-circle-play"></i>
                </div>
                <img class="image=blur" src="${window.location.origin}${
      details.details.thumbnail
    }">
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
        </div>`;
    let imagesDiVImages = ` <div id="removeimage">
<i class="fa-solid fa-xmark"></i>
        </div>`;
    details.details.AllImages.forEach((e) => {
      imagesDiVImages += `<div><img src="${window.location.origin}${e}" lazy></div>`;
    });
    videoDiv += `<div><video id="mainVideo" src="${window.location.origin}/stream/${details.details.video}" controls  controlsList="nopictureinpicture"></video><div>`;

    let video = document.getElementById("show-video");
    let showallimages = document.getElementById("show-all-images");
    showallimages.addEventListener("click", (e) => {
      imagesFullView.style.display = "flex";
      imagesFullView.innerHTML = imagesDiVImages;
      let removeimage = document.getElementById("removeimage");
      removeimage.addEventListener("click", () => {
        imagesFullView.innerHTML = "";
        imagesFullView.style.display = "none";
      });
    });
    video.addEventListener("click", (e) => {
      imagesFullView.style.display = "flex";
      imagesFullView.innerHTML = "";
      imagesFullView.innerHTML = videoDiv;
      let removeimage = document.getElementById("removeimage");
      removeimage.addEventListener("click", () => {
        imagesFullView.innerHTML = "";
        imagesFullView.style.display = "none";
      });
    });
    
    let like = document.getElementById("like");
    like.addEventListener("click", async (e) => {
      like.classList.toggle("liked");
      async function getLikeStatus(paramId,query) {
        try {
          const response = await fetch(`${window.location.origin}/getLike/${paramId}/?action=${encodeURIComponent(query)}`);
          const data = await response.json();
          const likeStatus = data.status; 
          return likeStatus; 
        } catch (error) {
          console.error("Error fetching like status:", error);
          alert("An error occurred while fetching the like status.");
        }
      }
     
      
      let mainView = document.getElementById("mainView")
        if(like.classList.contains("liked"))
        {
            mainView.innerText = Number(mainView.innerHTML) + 1
            getLikeStatus(paramId,"add").then(likeStatus => {
              // alert(likeStatus)
            });
             
        }else{

          mainView.innerText = Number(mainView.innerHTML) - 1
          getLikeStatus(paramId,"remove").then(likeStatus => {
            // alert(likeStatus)
          });
        }
     
    });
    

  })
  .catch((error) => {
    console.error("Error fetching property details:", error.message);
  });

//onclick send then
let feedbackInput = document.getElementById("feedbackInput");
let addComment = document.getElementById("addComment");

addComment.addEventListener("click", async (e) => {
  if (feedbackInput.value.trim() !== "") {
    e.target.disabled = true; // Disable the button while processing
    // alert("Submitting your comment...");

    try {
      const response = await fetch(
        `${window.location.origin}/addComment/${paramId}`,
        {
          method: "POST", // HTTP POST method
          headers: {
            "Content-Type": "application/json", // Send JSON data
          },
          body: JSON.stringify({ comment: feedbackInput.value }), // Pass the comment in the request body
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        const errorData = await response.json();
        console.error("Server response:", errorData);
        // alert("Failed to add comment. Please try again.");
        e.target.disabled = false; // Re-enable the button
        return;
      }

      const data = await response.json();
      // console.log("Comment added successfully:", data);
      feedbackInput.value = "";
      console.log("yeh run hua");
      updateCommentSection(paramId);
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

let updateCommentSection = async (paramId) => {
  try {
    const response = await fetch(
      `${window.location.origin}/getComment/${paramId}`
    );
    const { data } = await response.json();

    const feedbackItem = document.getElementById("feedback-item");

    // Clear the feedback section
    feedbackItem.innerHTML = "";

    if (!data || data.length === 0) {
      feedbackItem.innerHTML = "<p>No Comment. Be the One to Comment!!</p>";
      return;
    }

    // Build the HTML content
    let html = "";
    data.forEach((comment, index) => {
      const isThereReply = comment.reply && comment.reply.length > 0;

      html += `
        <div class="feedback-item">
          <div class="feedback-header">
            <img src="${
              comment.image
            }" alt="User Avatar" class="user-avatar" lazy />
            <div class="user-info">
              <p class="user-name">${comment.username}</p>
              <p class="feedback-date">${comment.date}</p>
            </div>
          </div>
          <div class="feedback-content">
            <p>${comment.text}</p>
          </div>
          <button class="reply-button" id="reply-button-${index}">Reply</button>
          <div class="replyToReply" id="replyToReply-${index}" style="display: none;">
            <input class="repliedText" id="repliedText-${index}" type="text" placeholder="Reply" />
            <button class="cancelReply" id="cancelReply-${index}">Cancel</button>
            <button class="addReplyToReply" id="addReplyToReply-${index}" onclick="addReply(${index})">Add a reply</button>
          </div>
          ${
            isThereReply
              ? `<div class="showMoreReplies" id="totalUser-${index}">
              <p ><i class="fa-solid fa-chevron-down"></i> <span id='totalUserDisplay-${index}'>${comment.reply.length}</span> Replies</p>
            </div>`
              : `<div class="showMoreReplies" id="totalUser-${index}"></div>`
          }
          <div id="replies-${index}" class="replies">
            ${
              isThereReply
                ? comment.reply
                    .map(
                      (reply) => `
              <div class="reply-item">
                <div class="feedback-header">
                  <img src="${
                    reply.image || "https://via.placeholder.com/40"
                  }" alt="User Avatar" class="user-avatar" lazy />
                  <div class="user-info">
                    <p class="user-name">${reply.username}</p>
                    <p class="feedback-date">${reply.date}</p>
                  </div>
                </div>
                <div class="feedback-content">
                  <p>${reply.text}</p>
                </div>
              </div>`
                    )
                    .join("")
                : ""
            }
          </div>
        </div>`;
    });
    feedbackItem.innerHTML = html;

    // Attach Event Listeners for Reply Buttons
    data.forEach((_, index) => {
      const replyButton = document.getElementById(`reply-button-${index}`);
      const replyToReply = document.getElementById(`replyToReply-${index}`);
      const cancelReply = document.getElementById(`cancelReply-${index}`);

      replyButton.addEventListener("click", () => {
        replyToReply.style.display = "flex";
      });

      cancelReply.addEventListener("click", () => {
        replyToReply.style.display = "none";
      });
    });
    data.forEach((e, index) => {
      const replyDiv = document.getElementById(`totalUser-${index}`);
      const replies = document.getElementById(`replies-${index}`);

      if (replyDiv && replies) {
        replyDiv.addEventListener("click", () => {
          // console.log("Reply div clicked");

          // Check the current display state of the replies div
          if (
            replies.style.display === "none" ||
            replies.style.display === ""
          ) {
            // console.log("Display is none, showing replies");
            replies.style.display = "flex";
          } else {
            // console.log("Hiding replies");
            replies.style.display = "none";
          }
        });
      } else {
        // console.log(`Element with ID ${e.userId}-${index} or replies-${index} not found`);
      }
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
updateCommentSection(paramId);
const addReply = async (index) => {
  try {
    let repliesDiv = document.getElementById(`replies-${index}`);
    let replytext = document.getElementById(`repliedText-${index}`);

    // Validate reply text
    if (!replytext.value.trim()) {
      throw new Error("Reply text is required.");
    }
    // Send POST request to add the reply
    const response = await fetch(
      `${window.location.origin}/addReply/${paramId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: replytext.value.trim(),
          index: index,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add reply");
    }
    // Parse the response
    const responseData = await response.json();

    let totalUser = document.getElementById(`totalUser-${index}`);
    if (totalUser.innerHTML == "") {
      totalUser.innerHTML = ` <p><i class="fa-solid fa-chevron-down"></i> <span id='totalUserDisplay-${index}'>1</span> Reply</p>`;
    } else {
      let totalUserDisplay = document.getElementById(
        `totalUserDisplay-${index}`
      );
      let total = totalUserDisplay.innerText;
      total = Number(total) + 1;
      totalUserDisplay.innerText = total;
    }
    // Fetch logged-in user details and update the replies
    let userResponse = await fetch(`${window.location.origin}/getLoginUser`);
    let userData = await userResponse.json();

    const formattedDate = new Date().toLocaleString();
    let temp = `
    <div class="reply-item">
      <div class="feedback-header">
        <img src="${
          userData.image ||
          `${window.location.origin}/public/Assets/Default/defaultimage-removebg-preview`
        }" alt="User Avatar" class="user-avatar" lazy />
        <div class="user-info">
          <p class="user-name">${userData.username}</p>
          <p class="feedback-date">${formattedDate}</p>
        </div>
      </div>
      <div class="feedback-content">
        <p>${replytext.value.trim()}</p>
      </div>
    </div>`;
    repliesDiv.innerHTML = temp + repliesDiv.innerHTML;

    // Clear the reply text input
    replytext.value = "";
  } catch (error) {
    console.error("Error adding reply:", error);
    // alert(error.message);
  }
};
// console.log("end hai bhai pura code run hua hai pakka")

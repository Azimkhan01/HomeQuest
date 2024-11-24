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

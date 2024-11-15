let form = document.getElementById("form");
function handleEdit() {
  form.style.display = "block";
}

function handleHide() {
  form.style.display = "none";
}

let resetPass = document.getElementById("reset-password");

function showReset() {
  resetPass.style.display = "block";
}

function handlePassword() {
  resetPass.style.display = "none";
}

let newPassword = document.getElementById("new-password");
let confirmPassword = document.getElementById("confirm-password");
let internalerror = document.getElementById("internalerror");
let resetpasswordbtn = document.getElementById("resetpasswordbtn");
confirmPassword.addEventListener("change", (e) => {
  externalerror.innerHTML = "";
  if (newPassword.value != e.target.value) {
    internalerror.innerHTML =
      "New Passoword and Confirm password doesn't match";
    resetpasswordbtn.disabled = true;
  } else {
    internalerror.innerHTML = `<i class="fa-sharp-duotone fa-solid fa-check" style="color:#00B98E"></i>`;
    resetpasswordbtn.disabled = false;
  }
  if (confirmPassword.value.length >= 8) {
    resetpasswordbtn.disabled = false;
  } else {
    resetpasswordbtn.disabled = true;
    internalerror.innerHTML = "The length of passowrd should be greater than 8";
  }
});

// for upload hide

let upload = document.getElementById("upload");

let image = document.getElementById("image");

image.addEventListener("dblclick",() => {
  showUpload();
});

image.addEventListener("click", () => {
  let fullScreenImage = document.getElementById('fullScreenImage');
  fullScreenImage.classList.add("active");  // Show with transition

  let fullImage = document.getElementById('fullImage');
  fullImage.src = image.children[0].src;   // Set the src of fullImage to the clicked image's src

  document.body.style.overflow = "hidden";  // Disable page scrolling
});



// Hide the fullscreen overlay when clicking outside the image
let fullScreenImage = document.getElementById('fullScreenImage');
fullScreenImage.addEventListener("click", (e) => {
    fullScreenImage.classList.remove("active");  // Hide with transition
    document.body.style.overflow = "auto";       // Re-enable page scrolling
});

// Prevent closing the overlay when clicking on the image itself
let fullImage = document.getElementById('fullImage');
fullImage.addEventListener("click", (e) => {
    e.stopPropagation();  // Stop the click event from reaching #fullScreenImage
});


function showUpload() {
  upload.style.display = "block";
  upload.style.transition = "all 0.3s ease-in-out";
}

function handleImage() {
  upload.style.display = "none";
  console.log("clicked");
}

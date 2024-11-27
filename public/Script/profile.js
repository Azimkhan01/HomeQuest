// Form Visibility Handlers
let form = document.getElementById("form");
function handleEdit() {
  form.style.display = "block";
}
function handleHide() {
  form.style.display = "none";
}

// Password Reset Handlers
let resetPass = document.getElementById("reset-password");
function showReset() {
  resetPass.style.display = "block";
}
function handlePassword() {
  resetPass.style.display = "none";
}

// Password Validation
let newPassword = document.getElementById("new-password");
let confirmPassword = document.getElementById("confirm-password");
let internalerror = document.getElementById("internalerror");
let externalerror = document.getElementById("externalerror");
let resetpasswordbtn = document.getElementById("resetpasswordbtn");

confirmPassword.addEventListener("change", (e) => {
  externalerror.innerHTML = "";
  const isMatch = newPassword.value === e.target.value;
  const isLengthValid = confirmPassword.value.length >= 8;

  if (!isLengthValid) {
    internalerror.innerHTML = "The length of the password should be greater than 8";
    resetpasswordbtn.disabled = true;
  } else if (!isMatch) {
    internalerror.innerHTML = "New Password and Confirm Password don't match";
    resetpasswordbtn.disabled = true;
  } else {
    internalerror.innerHTML = `<i class="fa-sharp-duotone fa-solid fa-check" style="color:#00B98E"></i>`;
    resetpasswordbtn.disabled = false;
  }
});

// Image Overlay and Upload Handlers
let upload = document.getElementById("upload");
let image = document.getElementById("image");

let fullScreenImage = document.getElementById("fullScreenImage");
let fullImage = document.getElementById("fullImage");

image.addEventListener("click", () => {


  showUpload();
});

image.addEventListener("dblclick", () => {
  let imageElement = image.children[0];
  if (upload.style.display === "block") {
    upload.style.display = "none";
    // upload.style.transition = "all 0.3s ease-in-out";
  }
  if (imageElement && imageElement.tagName === "IMG") {
    fullScreenImage.classList.add("active");
    fullImage.src = imageElement.src;
    document.body.style.overflow = "hidden";
  } else {
    // console.error("Invalid image source!");
  }
});

// Close full-screen overlay
fullScreenImage.addEventListener("click", () => {
  fullScreenImage.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Prevent overlay from closing on image click
fullImage.addEventListener("click", (e) => {
  e.stopPropagation();
});

function showUpload() {
  if (upload.style.display !== "block") {
    upload.style.display = "block";
    upload.style.transition = "all 0.3s ease-in-out";
  }
}

function handleImage() {
  if (upload.style.display === "block") {
    upload.style.display = "none";
    // console.log("Upload hidden");
  }
}

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

image.addEventListener("click", () => {
  showUpload();
});

function showUpload() {
  upload.style.display = "block";
  upload.style.transition = "all 0.3s ease-in-out";
}

function handleImage() {
  upload.style.display = "none";
  console.log("clicked");
}

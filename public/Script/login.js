// Handle forget password (Switch to OTP container)
let timeLeft = 150;

// Get the timer element by its ID
let timerElement = document.getElementById('timer');

// Function to update the timer
function updateTimer() {
    // Calculate minutes and seconds
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Format the time as MM:SS (e.g., "02:30")
    timerElement.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Decrease time left by 1 second
    timeLeft--;

    // Stop the timer when time is up
    if (timeLeft < 0) {
        clearInterval(timerInterval); // Clear the interval when timer reaches 0
        timerElement.textContent = "OTP Expired go back and generate another OTP";
    }
}

// Update the timer every second (1000ms)
let timerInterval = setInterval(updateTimer, 1000);

function handleForgetPassword() {
  let spinner = document.getElementById("loading-spinner");
  let container2 = document.getElementById("container2");
  let container1 = document.getElementById("container1");

  // Show the spinner
  spinner.style.display = "block";

  // Simulate a delay for loading
  setTimeout(() => {
    // Hide login container and spinner
    container1.style.display = "none";
    spinner.style.display = "none";

    // Show OTP container
    container2.style.display = "flex";
  }, 1000);
}

// Handle back to login (Switch back to login container)
function handleBackToLogin() {
  let spinner = document.getElementById("loading-spinner");
  let container2 = document.getElementById("container2");
  let container1 = document.getElementById("container1");

  // Show the spinner
  spinner.style.display = "block";

  // Simulate a delay for loading
  setTimeout(() => {
    // Hide OTP container and spinner
    container2.style.display = "none";
    spinner.style.display = "none";

    // Show login container
    container1.style.display = "flex";
  }, 1000);
}

// Handle Send OTP request
// Handle Send OTP request
const handleSendOtp = document.getElementById("handleSendOtp");

handleSendOtp.addEventListener("click", async () => {
  const email = document.querySelector('input[name="verifyEmail"]').value; // Get email from input

  // Log the email on the client-side before sending the request
  console.log("Sending email: ", email);

  let spinner = document.getElementById("loading-spinner");
  let container2 = document.getElementById("container2");
  let container3 = document.getElementById("container3");

  try {
    // Show the spinner
    spinner.style.display = "block";
    container2.style.display = "none"; // Hide OTP request container

    // Send request to the server to send OTP
    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/sendOtp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verifyEmail: email }), // Use 'email' instead of 'verifyEmail'
      }
    );

    // Ensure the response is OK before parsing it
    if (response.ok) {
      const result = await response.json(); // Parse the JSON response
      console.log(result); // Debugging line

      // Check if OTP was sent successfully
      if (result.status === "ok") {
        container3.style.display = "flex";
        updateTimer(); // Show OTP verification container
        spinner.style.display = "none"; // Hide the spinner after response
        document.getElementById("inp4").value = email;
      } else {
        alert("Email not found or OTP sending failed.");
        spinner.style.display = "none"; // Hide the spinner if error occurs
      }
    } else {
      // Handle server errors or unsuccessful OTP sending
      const error = await response.json();
      console.error("Error sending OTP:", error);
      alert(error.message || "Failed to send OTP.");
      spinner.style.display = "none"; // Hide the spinner if error occurs
    }
  } catch (error) {
    // Catch and handle any errors during the fetch request (e.g., network errors)
    console.error("Network error:", error);
    alert("An error occurred while sending OTP. Please try again.");
    spinner.style.display = "none"; // Hide the spinner if error occurs
  }
});

function handleChangeMail() {
  let spinner = document.getElementById("loading-spinner");
  let container2 = document.getElementById("container2");
  // let container1 = document.getElementById("container1");

  // Show the spinner
  spinner.style.display = "block";

  // Simulate a delay for loading
  setTimeout(() => {
    // Hide login container and spinner
    container2.style.display = "flex";
    spinner.style.display = "none";

    // Show OTP container
    container3.style.display = "none";
  }, 1000);
}

let verifyOtp = document.getElementById("verifyOtp");

verifyOtp.addEventListener("click", async () => {
  console.log("clicked");
  // Get the email and OTP input values
  const email = document.querySelector('input[name="verifyEmailOtp"]').value; // Make sure the input name matches
  const otp = document.querySelector('input[name="otp"]').value; // Input field for OTP

  // Basic validation (you can add more validations if necessary)
  if (!email || !otp) {
    alert("Please enter both email and OTP");
    return;
  }

  try {
    // Send request to the server to verify OTP
    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/verifyOtp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verifyEmailOtp: email, otp: otp }), // Send email and OTP in the body
      }
    );

    // Ensure the response is okay before parsing it
    if (response.ok) {
      const result = await response.json(); // Parse the JSON response

      if (result.status === "ok") {
        // OTP verification successful
        let spinner = document.getElementById("loading-spinner");
        let container4 = document.getElementById("container4");
        // let container1 = document.getElementById("container1");

        // Show the spinner
        spinner.style.display = "block";

        // Simulate a delay for loading
        setTimeout(() => {
          // Hide login container and spinner
          container4.style.display = "flex";
          let inp6 = document.getElementById("inp6");
          inp6.value = email;
          spinner.style.display = "none";

          // Show OTP container
          container3.style.display = "none";
        }, 1000);
        // Redirect or show next step, e.g. change password form
      } else {
        // OTP verification failed
        alert(result.message); // Show error message
      }
    } else {
      // Handle server errors
      const error = await response.json();
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying OTP. Please try again.");
    }
  } catch (error) {
    // Catch and handle any errors during the fetch request (e.g., network errors)
    console.error("Network error:", error);
    alert("An error occurred while verifying OTP. Please try again.");
  }
});

//reset password code here
let spinner = document.getElementById("loading-spinner")
let resetPasswordBtn = document.getElementById("resetPasswordBtn");

resetPasswordBtn.addEventListener("click", async (e) => {

  e.preventDefault(); // Prevent form submission if using a form
  const newPassword = document.getElementById("confirmPassword").value; // Get new password from input field
  const email = document.querySelector('input[name="verifyEmailReset"]').value; // Get the email from input
  // Validate password (e.g., check length or strength)
  if (newPassword.length <= 8) {
    let resetErrorMessage = document.getElementById("resetErrorMessage");
    resetErrorMessage.value = "Password must be at least 6 characters long.";
    return;
  }

  try {
    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/resetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verifyEmailReset: email,
          newPassword: newPassword,
        }), // Send email and new password to the server
      }
    );

    if (response.ok) {
      const result = await response.json(); // Parse JSON response
      spinner.style.display = "block";
      setTimeout(() => {
        let inp6 = document.getElementById("inp6");
        spinner.style.display = "none";
        window.location.href = "/login";
      }, 1500);
    } else {
      const error = await response.json();
      alert(error.message || "Failed to reset password.");
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    alert("An error occurred while resetting the password. Please try again.");
  }
});
// Function to toggle password visibility
function handleShowPassword() {
  let confirmPassword = document.getElementById("confirmPassword");
  let newPassword = document.getElementById("newPassword");
  let showPass = document.getElementById("showPass");

  // Check the state of the checkbox and toggle the password field type
  if (showPass.checked) {
    // Show the password (change type to 'text')
    newPassword.type = "text";
    confirmPassword.type = "text";
  } else {
    // Hide the password (change type back to 'password')
    newPassword.type = "password";
    confirmPassword.type = "password";
  }
}

let confirmPassword = document.getElementById("confirmPassword");
let newPassword = document.getElementById("newPassword");
confirmPassword.addEventListener("change",()=>{
    if(confirmPassword.value != newPassword.value )
    {
        resetPasswordBtn.disabled = true
        // alert("password not match")

    }
    else{
        resetPasswordBtn.disabled = false
    }
})
newPassword.addEventListener("change",()=>{
    if(confirmPassword.value != newPassword.value)
    {
        resetPasswordBtn.disabled = true
        // alert("password not match")
    }
    else{
        resetPasswordBtn.disabled = false
    }
})



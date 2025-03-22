const passwordInput = document.getElementById("inp2");
const confirmPasswordInput = document.getElementById("inp3");
const alertBox = document.getElementById("alert");
const registerBtn = document.getElementById("register");
const eyeBtn = document.getElementById("eyebtn");

// Password validation pattern: 
// - At least 8 characters
// - 1 uppercase letter
// - 1 lowercase letter
// - 1 number
// - 1 special character
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Function to validate password
function validatePassword() {
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    if (!passwordPattern.test(password)) {
        alertBox.innerHTML = "⚠️ Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
        alertBox.style.color = "red";
        registerBtn.disabled = true;
        return false;
    }

    if (confirmPassword !== "" && password !== confirmPassword) {
        alertBox.innerHTML = "❌ Confirm password does not match.";
        alertBox.style.color = "red";
        registerBtn.disabled = true;
        return false;
    }

    if (password === confirmPassword && password !== "") {
        alertBox.innerHTML = "✅ Password matched!";
        alertBox.style.color = "#00D26A";
        registerBtn.disabled = false;
        return true;
    }

    alertBox.innerHTML = "";
    registerBtn.disabled = true;
    return false;
}

// Event listeners
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);

eyeBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        confirmPasswordInput.type = "text";
        eyeBtn.innerHTML = "Hide Password 😌";
    } else {
        passwordInput.type = "password";
        confirmPasswordInput.type = "password";
        eyeBtn.innerHTML = "Show Password 🫣";
    }
});

// Disable register button by default
registerBtn.disabled = true;

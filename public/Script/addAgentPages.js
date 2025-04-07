const handleAddPost = document.getElementById("handleAddPost");
const allImage = document.getElementById("all-img")
const left = document.getElementById('left')
const right = document.getElementById('right')
const instanceImage = document.getElementById('instance_img')
let isOpen = false; // Initialize state
let mainPost = document.getElementById("main-post")
mainPost.style.display = "none"
const add= document.getElementById("add")
handleAddPost.addEventListener("click", (e) => {
    if (isOpen) {
        add.style.rotate = "0deg";
        mainPost.innerHTML = '' 
         mainPost.style.display = "none"
            } else {
        add.style.rotate = "-45deg"; 
         mainPost.style.display = "flex"
         mainPost.innerHTML = `<div class="form-container">
                <form action="/addPages" method="post" enctype="multipart/form-data">
                    <!-- Title Input -->
                    <input type="text" placeholder="Title" name="title" maxlength="250" required />
                    <!-- Description Textarea -->
                    <textarea name="description" placeholder="Write your description here..." rows="5" maxlength="500"
                        required>
        </textarea>

                    <!-- File Input for Images -->
                    <label for="image-upload">Upload Images (Max 6):</label>
                    <input type="file" id="image-upload" name="images" accept="image/*" onclick="validateFiles()" multiple />

                    <!-- Hashtag Input -->
                    <input type="text" placeholder="Enter hashtags (separated by space)" name="hashtags" />

                    <!-- Link Input -->
                    <input type="url" placeholder="Add a link (optional)" name="link" />

                    <!-- Submit Button -->
                    <button type="submit">Submit</button>
                </form>
            </div>`
    }
    isOpen = !isOpen; 
   
});

// handlefile
async function validateFiles() {
    const imageUpload = document.getElementById('image-upload');
    
    imageUpload.addEventListener('change', (e) => {
        const files = e.target.files; // Get the uploaded files
        if (files.length > 6) {
            alert("You can only upload up to 6 images.");
            imageUpload.value = ""; // Clear the file input
        } else {
            console.log("Files are valid:", files);
            // Proceed with your logic for valid file uploads
        }
    });

    let currentIndex = 0;
    let uploadedFiles = [];
    
    imageUpload.addEventListener('change', (e) => {
        uploadedFiles = Array.from(e.target.files);
        currentIndex = 0;
    
        if (uploadedFiles.length < 1) {
            allImage.style.display = "none";
            return;
        }
    
        if (uploadedFiles.length > 0 && uploadedFiles.length < 7) {
            allImage.style.display = "flex";
            showImage(currentIndex);
        }
    });
    
    left.addEventListener("click", () => {
        if (uploadedFiles.length === 0) return;
        currentIndex = (currentIndex - 1 + uploadedFiles.length) % uploadedFiles.length;
        showImage(currentIndex);
    });
    
    right.addEventListener("click", () => {
        if (uploadedFiles.length === 0) return;
        currentIndex = (currentIndex + 1) % uploadedFiles.length;
        showImage(currentIndex);
    });
    
    function showImage(index) {
        const reader = new FileReader();
        reader.onload = (e) => {
            instanceImage.src = e.target.result;
        };
        reader.readAsDataURL(uploadedFiles[index]);
    }
    

}


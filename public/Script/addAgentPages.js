const handleAddPost = document.getElementById("handleAddPost");
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
                <form>
                    <!-- Title Input -->
                    <input type="text" placeholder="Title" name="title" maxlength="250" required />

                    <!-- Description Textarea -->
                    <textarea name="description" placeholder="Write your description here..." rows="5" maxlength="500"
                        required>
        </textarea>

                    <!-- File Input for Images -->
                    <label for="image-upload">Upload Images (Max 6):</label>
                    <input type="file" id="image-upload" name="images" accept="image/*" multiple
                        onchange="validateFiles(this)" />

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

let filterBtn = document.getElementById("filterBtn");
let filterContainers = document.getElementsByClassName("filter-container");

// Check if there are elements in filterContainers and use the first one if only one exists
if (filterContainers.length > 0) {
    filterBtn.addEventListener("click", (e) => {
        // Toggle the display of the first filter-container
        let filterContainer = filterContainers[0];
        filterContainer.style.display = filterContainer.style.display === "none" ? "flex" : "none";
    });
}

function updateAreaValues() {
    document.getElementById('minAreaValue').textContent = document.getElementById('minArea').value;
    document.getElementById('maxAreaValue').textContent = document.getElementById('maxArea').value;
  }

  
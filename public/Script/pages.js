const feed = document.getElementById('feed');
const endMessageDiv = document.createElement("div");
endMessageDiv.className = "end-message"; // Adding a class to style the end message
endMessageDiv.innerText = "You’ve reached the end of the feed";

// To avoid multiple fetches at once, we use a loading flag
let isLoading = false;

// Function to handle the scroll event
const onScroll = () => {
    if (isLoading) return; // Avoid multiple fetches
    document.querySelector(".loader").style.display = "block";

    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

    if (bottom) {
        isLoading = true; // Set loading to true to prevent duplicate calls

        setTimeout(() => {
            feedFetcher.getFeed()
                .then((response) => {
                    // console.log(response); // Log the response for debugging

                    if (response.status === "end") {
                        // Display the "You’ve reached the end" message if no more posts
                        if (!document.querySelector('.end-message')) {
                            const endMessageDiv = document.createElement("div");
                            endMessageDiv.className = "end-message";
                            endMessageDiv.textContent = "You’ve reached the end!";
                            feed.appendChild(endMessageDiv);
                            window.removeEventListener("scroll", onScroll); // Remove the scroll event listener
                        }
                    } else {
                        // Append new posts to the feed
                        response.feed.forEach((post) => {
                            console.log(post)
                            const div = document.createElement("div");
                            div.className = "card";
                            div.innerHTML = `
                                <div class="card-header">
                                    <img src="${post.ownerDetails.image}" alt="User Profile">
                                    <div class="user-info">
                                        <span class="username" style="font-family:inter,sans-serif;color:#0E2E50;">
                                            ${post.ownerDetails.username.toUpperCase()}
                                        </span>
                                        <span class="timestamp">${post.createdAt ? timeAgo(post.createdAt) : "Recently"}</span>
                                    </div>
                                </div>
                                <div class="card-content">
                                    <p>${post.title}</p>
                                    <p>${post.description}</p>
                                    <div class="feed-image">
                                        ${post.images.map(img => `
                                            <div class="feedmain-img">
                                                <img src="${window.location.origin + '/public/Assets/postImage/' + img}" alt="Post Image">
                                            </div>`).join('')}
                                    </div>
                                </div>
                                <div class="card-footer"></div>
                            `;
                            feed.appendChild(div);
                        });
                    }

                    // Increment the current page for the next fetch
                    feedFetcher.incrementCurrent();
                })
                .catch((error) => {
                    console.error(error); // Handle errors gracefully
                })
                .finally(() => {
                    isLoading = false; // Reset loading state
                    document.querySelector(".loader").style.display = "none";
                });
        }, 500); // Add a slight delay before appending new content
    }
};


// Add the scroll event listener
window.addEventListener("scroll", onScroll);

// Create feedFetcher closure
const createFeedFetcher = () => {
    // Initialize the current and limit variables
    let current = 1;
    let limit = 2;

    // Function to get feed with the current and limit values
    const getFeed = async () => {
        let currentEncoded = encodeURIComponent(current);
        let limitEncoded = encodeURIComponent(limit);

        // Properly formatted URL with encoded parameters
        let response = await fetch(`${window.location.origin}/getFeed?current=${currentEncoded}&limit=${limitEncoded}`);
        let data = await response.json();

        // Check if there are no more feed items
        if ( data.status == "end" || data.feed?.length == 0) {
            data.status = "end"; // Mark the feed as finished
        }

        return data;
    };

    // Function to increment current (for pagination purposes)
    const incrementCurrent = () => {
        current++;
    };

    // Function to reset the current and limit values
    const resetValues = () => {
        current = 1;
        limit = 2;
    };

    return {
        getFeed,
        incrementCurrent,
        resetValues,
    };
};

// Create the feed fetcher closure
const feedFetcher = createFeedFetcher();

// Function to display time ago (time difference)
function timeAgo(dateString) {
    const currentDate = new Date();
    const givenDate = new Date(dateString);
    
    // Calculate the difference in time
    const diffInMilliseconds = currentDate - givenDate;
    
    // Convert milliseconds to days, weeks, months, and years
    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInWeeks = diffInDays / 7;
    const diffInMonths = diffInDays / 30.42;  // Approximate month length (30.42 days per month on average)
    const diffInYears = diffInDays / 365.25;  // Approximate year length considering leap years
    
    // Return the appropriate time unit based on the difference
    if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
        return `${Math.floor(diffInDays)} day${Math.floor(diffInDays) !== 1 ? 's' : ''} ago`;
    } else if (diffInWeeks < 4) {
        return `${Math.floor(diffInWeeks)} week${Math.floor(diffInWeeks) !== 1 ? 's' : ''} ago`;
    } else if (diffInMonths < 12) {
        return `${Math.floor(diffInMonths)} month${Math.floor(diffInMonths) !== 1 ? 's' : ''} ago`;
    } else {
        return `${Math.floor(diffInYears)} year${Math.floor(diffInYears) !== 1 ? 's' : ''} ago`;
    }
}

// Initial Load: Fetch the first 2 posts when the page loads
window.onload = () => {
    feedFetcher.getFeed().then((r) => {
        if (r.status === "end" || r.feed.length === 0) {
            if (!document.querySelector('.end-message')) {
                feed.appendChild(endMessageDiv);
            }
        } else {
            r.feed.forEach(post => {
                let div = document.createElement("div");
                div.className = "card";
                div.innerHTML = `
                    <div class="card-header">
                        <img src="${post.ownerDetails.image}" alt="User Profile">
                        <div class="user-info">
                            <span style="font-family:inter,sans-serif;color:#0E2E50" class="username">${(post.ownerDetails.username).toUpperCase()}</span>
                            <span class="timestamp">${post.createdAt ? timeAgo(post.createdAt) : "Recently"}</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <p>${post.title}</p>
                        <p>${post.description}</p>
                        <div class="feed-image">
                            ${post.images.map(img => `<div class="feedmain-img"><img src="${window.location.origin + '/public/Assets/postImage/' + img}" alt="Post Image"></div>`).join('')}
                        </div>
                    </div>
                    <div class="card-footer">
                    </div>
                `;
                feed.appendChild(div);
            });

            // Increment the current page for the next fetch
            feedFetcher.incrementCurrent();
        }
    }).catch((err) => {
        console.error(err); // Handle any errors
    });
};

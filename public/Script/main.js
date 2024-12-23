// GSAP Animations
gsap.from("nav", {
    y: -100, // Slide down from above
    opacity: 0, // Start fully transparent
    duration: 1.2, // Adjust duration for smooth effect
    ease: "power2.out", // Use a smooth easing for a natural feel
});

gsap.from("nav h1", {
    opacity: 0, // Start fully transparent
    scale: 0.5, // Start smaller
    duration: 1, // Slightly faster than nav
    delay: 0.5, // After the nav animation
    ease: "elastic.out(1, 0.5)", // Bounce effect
});

gsap.from("nav ul li", {
    opacity: 0, // Start fully transparent
    x: 100, // Slide in from the right
    duration: 0.8,
    delay: 1, // Start after the nav and h1 animation
    stagger: 0.2, // Delay between list items
    ease: "power2.out", // Smooth transition
});

// Video Handling
document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector('video');
    video.muted = true; // Ensure the video is muted

    const tryPlay = () => {
        video.play().catch(error => {
            console.error("Autoplay failed. Retrying in 2 seconds...", error);
            setTimeout(tryPlay, 2000); // Retry after 2 seconds
        });
    };

    tryPlay(); // Initial attempt to play the video
});

const services = document.getElementById('services');
const image = [
    '/public/Assets/Default/businessman.svg',
    '/public/Assets/Default/web-design.svg',
    '/public/Assets/Default/home (1).svg',
];
const heading = ['Agent Listing', 'Agent Pages', 'Property Listing'];

image.forEach((e, index) => {
    let fragment = document.createDocumentFragment();

    // Create the parent div
    let pdiv = document.createElement('div');
    pdiv.className = 'service-item'; // Optional class for styling

    // Create child divs
    let cdiv1 = document.createElement('div');
    let cdiv2 = document.createElement('div');

    // Create image element
    let img = document.createElement('img');
    img.src = e;
    img.alt = heading[index]; // Add alt for accessibility

    // Create heading element
    let h4 = document.createElement('h4');
    h4.textContent = heading[index];

    // Append image and heading to their respective divs
    cdiv1.appendChild(img);
    cdiv2.appendChild(h4);

    // Append child divs to the parent div
    pdiv.appendChild(cdiv1);
    pdiv.appendChild(cdiv2);

    // Add parent div to the fragment
    fragment.appendChild(pdiv);

    // Append the fragment to the services container
    services.appendChild(fragment);
});

document.addEventListener("DOMContentLoaded", () => {
    const videoElements = document.querySelectorAll(".video video");

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        videoElements.forEach(video => {
            const videoRect = video.getBoundingClientRect();
            const videoOffset = videoRect.top + scrollPosition;

            // Calculate the offset for the parallax effect
            const offset = (scrollPosition - videoOffset) * 0.5;

            // Check if the scroll position is near the top, reset the position
            if (scrollPosition < 10) {
                video.style.transform = "translateY(0px)";
            } else {
                video.style.transform = `translateY(${offset}px)`;
            }
        });
    });
});

let nav = document.querySelector('nav');
let tempWidth = nav.style.width;

window.addEventListener('scroll', () => {
    if (window.innerWidth >= 786) {  // Check if the screen width is greater than or equal to 786
        if (window.scrollY > 0) {  // Checks if the scroll is not at the top
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

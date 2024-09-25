//main scroll width 100% hojayega

window.addEventListener("scroll", (e) => {
  nav.style.width = "100%";
  nav.style.marginLeft = "0px";
  const scrollPosition = window.scrollY;
  // console.log(scrollPosition)
  if (scrollPosition < 50 && window.innerWidth >= 1024) {
    nav.style.width = "90%";
    nav.style.marginLeft = "5%";
  }
});

let i = 0;
let z = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
  "https://demo.htmlcodex.com/2259/real-estate-html-template/img/carousel-1.jpg",
  "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdXNlfGVufDB8fDB8fHww",
];

let introImg = document.getElementById("intro-image");
let interval = setInterval(changeImage, 2000);

function changeImage() {
  introImg.style.backgroundImage = `url(${z[i]})`;
  introImg.style.backgroundSize = "cover";
  i = (i + 1) % z.length; // Loop back to the first image
}

introImg.addEventListener(
  "click",
  function (event) {
    // Stop the current interval
    clearInterval(interval);

    // Move to the next image
    i = (i + 1) % z.length; // Go to the next image

    // Change the background image
    introImg.style.backgroundImage = `url(${z[i]})`;
    introImg.style.backgroundSize = "cover";

    // Restart the interval after a delay (optional, e.g., 2 seconds)

    interval = setInterval(changeImage, 2000);
  } // Change this value to adjust delay before restarting
);

//adding properties
let array = [
  {
    type: "Apartment",
    number: 100,
  },
  {
    type: "Villa",
    number: 50,
  },
  {
    type: "Home",
    number: 500,
  },
  {
    type: "Office",
    number: "20",
  },
  {
    type: "Building",
    number: 40,
  },
  {
    type: "TownHouse",
    number: "12",
  },
  {
    type: "Shop",
    number: 60,
  },
  {
    type: "Garage",
    number: 99,
  },
];

//adding properties
let types = document.getElementById("types");
let addAllProperty = () => {
 
   let string ="";
   let i=0;
 array.forEach(element => {
 
  string =  string + `<div class="individual" id="individual${+i}">
                        <div class="individual-box">
                            <div class="circle"></div>
                            <div class="combo">
                              <div class="type"><h4>${element.type}</h4></div>
                            <div class="numberOfProperty"><p>${element.number} Properties</p></div>
                            </div>
                        </div>
                    </div>`
                    i++;
 });
 types.innerHTML = string;

};

addAllProperty()

//onclick href to selected direction
let individual ="";
for(i=0;i<array.length;i++)
{
  individual = document.getElementById(`individual${+i}`);
  individual.addEventListener("click", (e) => {
    window.location.href="/";
  });
}
  
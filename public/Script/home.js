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
    image:"public/Assets/Homepage/icon-apartment.png"
  },
  {
    type: "Villa",
    number: 50,
    image:"public/Assets/Homepage/icon-villa.png"
  },
  {
    type: "Home",
    number: 500,
    image:"public/Assets/Homepage/icon-house.png"
  },
  {
    type: "Office",
    number: "20",
    image:"public/Assets/Homepage/icon-housing.png"
  },
  {
    type: "Building",
    number: 40,
    image:"public/Assets/Homepage/icon-building.png"
  },
  {
    type: "TownHouse",
    number: "12",
    image:"public/Assets/Homepage/icon-neighborhood.png"
  },
  {
    type: "Shop",
    number: 60,
    image:"public/Assets/Homepage/icon-condominium.png"
  },
  {
    type: "Garage",
    number: 99,
    image:"public/Assets/Homepage/icon-condominium.png"
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
                            <div class="circle" style="background-image:url(${element.image});background-size:fix"></div>
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

//property Listing 
let s = "";

for (let i = 0; i < 6; i++) {  
    s += `<div class="Listing">
                <div class="listing-Img" style=" background-image: url(https://demo.htmlcodex.com/2259/real-estate-html-template/img/property-${i+1}.jpg);">
                    <p style="background-color:#00B98E; color: white; font-family: heebo, sans-serif; width: 25%; border-radius: 5px; padding: 8px; text-align: center;">For Sell</p>
                    <p style="color: #00B98E; background-color: white; font-family: heebo, sans-serif; width: 28%; border-radius: 5px; margin-bottom: -12px; padding: 8px; text-align: center;">AppartMent</p>
                </div>
                <div class="listingInfo">
                    <div class="HouseInfo">
                        <div><h4>$${Math.floor(12*3.142/(i+1))},${Math.floor(220*3.14/(i+1))}</h4></div>
                        <div><a href="#">Golden Urban House</a></div>
                        <div><p><i class="fa-solid fa-location-dot"></i> E3 502 lokudyan kalyan west</p></div>
                    </div>
                    <div class="HouseMeasure">
                        <div><i class="fa-solid fa-ruler-combined"></i>&nbsp;&nbsp;&nbsp;<span>1000 sqft</span></div>
                        <div><i class="fa-solid fa-bed"></i>&nbsp;&nbsp;&nbsp;<span>3 Bed</span></div>
                        <div><i class="fa-solid fa-bath"></i>&nbsp;&nbsp;&nbsp;<span>2 Bath</span></div>
                    </div>
                </div>
            </div>`;
}

let propertyListing = document.getElementById("popertyListing");
propertyListing.innerHTML = s;

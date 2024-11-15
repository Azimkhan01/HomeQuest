//scroll of navbar
let navbar = document.getElementsByTagName("nav")[0];

window.addEventListener("scroll", (e) => {
  // console.log(window.innerWidth > 780)
  if (window.scrollY > 50 && window.innerWidth > 780) {
    // Adjust this value as needed
    navbar.style.width = "88%";
    navbar.style.transition = "all 0.3s ease-in-out";
    navbar.style.top = "0%";
  } else {
    if (window.innerWidth > 780) {
      navbar.style.width = "80%";
      navbar.style.transition = "all 0.5s ease-in-out";
      navbar.style.top = "5%";
    }
  }
});
// hamburger bar
{
  let addProperty = document.getElementById("add-property");
  let navItems = document.getElementById("nav-items");

  if (window.innerWidth < 770) {
    addProperty.style.display = "none";
    addProperty.style.transition = "all 0.5s ease-in-out";
    navItems.style.display = "none";
    navItems.style.transition = "all 0.5s ease-in-out";
  }else{
    window.addEventListener("resize",(e)=>{
        location.reload()
        addProperty.style.display = 'block';
    addProperty.style.transition = "all 0.5s ease-in-out";
    navItems.style.display = "flex";
    navItems.style.transition = "all 0.5s ease-in-out";
        })
  }
  let status = true;
  let bar = "fa-solid fa-bars";
  let cross = "fa-solid fa-xmark";
  let hamburger = document.getElementById("hamburger");

  hamburger.addEventListener("click", (e) => {
    if (status && window.innerWidth < 770) {
      hamburger.innerHTML = `<i class="${cross}"></i>`;
      addProperty.style.display = "block";
      addProperty.style.transition = "all 0.5s ease-in-out";
      navItems.style.display = "flex";
      navItems.style.transition = "all 0.5s ease-in-out";
    } else {
      hamburger.innerHTML = `<i class="${bar}"></i>`;
      addProperty.style.display = "none";
      addProperty.style.transition = "all 0.5s ease-in-out";
      navItems.style.display = "none";
      navItems.style.transition = "all 0.5s ease-in-out";
    }
    status = !status; // Toggle the status
  });
}
// hamburger bar

// on click on navbar item the drop down will appear
document.querySelectorAll(".nav-item.dropdown").forEach(function (dropdown) {
  dropdown.addEventListener("click", function () {
    const dropdownContent = this.querySelector(".dropdown-content");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });
});

//getting user here
{
  let data = fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/getLoginUser`).then(data=>data.json()).then((r)=>{
    let profileImg = document.querySelector('#profile-img img')
    // console.log(r)
      if(r.imgStatus == true)
      {
        profileImg.src = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`+r.image

      }
      else{
        profileImg.src = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/public/Assets/Default/defaultimage-removebg-preview.png`;
      }
  })
}


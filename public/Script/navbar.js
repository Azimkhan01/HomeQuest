// import LocomotiveScroll from 'locomotive-scroll';

let owner = {
    name: "Azimuddeen Mojebur Rahman Khan",
    skill: "Full Stack Web Developer",
    github: "https://github.com/Azimkhan01/HomeQuest",
    linkedin: "https://www.linkedin.com/in/azimuddeen-khan-415587238/",
    instagram: "https://www.instagram.com/everazim/",
    facebook: "NA",
    youtube: "NA",
    x: "NA",
    thread: "NA",
    getBio: function (name = this.name, skill = this.skill) {
      return `${name}: ${skill}`; // Return the concatenated string
    },
  };
  let nav = document.querySelector("nav");
  nav.addEventListener("click", (e) => {
    nav.classList.toggle("autoHeight");
  });
  

let ScrollOver = require("./lib/ScrollOver.js")
let animateScroll = require("./lib/animatescroll.js")
let d3 = require("d3")

let heroImage = document.querySelectorAll(".hero-image")[0]

if(heroImage) {
  setTimeout(function(){
    addClassToElement(heroImage, "active")
  }, 200)
}

// let sectionThree = document.querySelectorAll(".section--three")[0]

// let button = document.querySelectorAll(".intro .button")[0]
// let pattern = document.querySelectorAll(".pattern")[0]
// let homeCover = document.querySelectorAll(".home-cover")[0]
// let header = document.querySelectorAll(".header")[0]
// let intro = document.querySelectorAll(".intro")[0]
// let wrap = document.querySelectorAll(".wrap")[0]


// /* Scroll Buttons */

// let navLinkPositions = document.querySelectorAll(".nav-link--positions")[0]
// let navLinkPeople = document.querySelectorAll(".nav-link--people")[0]
// let navLinkBlog = document.querySelectorAll(".nav-link--blog")[0]
// let buttonPositions = document.querySelectorAll(".button--positions")[0]

// let sectionPositions = document.querySelectorAll(".section-header--positions")[0]
// let sectionPeople = document.querySelectorAll(".section-header--people")[0]
// let sectionBlog = document.querySelectorAll(".section-header--blog")[0]

// if(buttonPositions) { buttonPositions.addEventListener('click', function(event){
//     animateScroll(sectionPositions, 1800, "easeInOutCubic", 0)
//     event.preventDefault()
//   })
// }
// if(navLinkPositions) { navLinkPositions.addEventListener('click', function(event){
//     animateScroll(sectionPositions, 1800, "easeInOutCubic", 0)
//     event.preventDefault()
//   })
// }
// if(navLinkPeople) { navLinkPeople.addEventListener('click', function(event){
//     animateScroll(sectionPeople, 1800, "easeInOutCubic", 0)
//     event.preventDefault()
//   })
// }
// if(navLinkBlog) { navLinkBlog.addEventListener('click', function(event){
//     animateScroll(sectionBlog, 1800, "easeInOutCubic", 0)
//     event.preventDefault()
//   })
// }

/* Demo Scroll */
//
// setTimeout(function(){
//   animateScroll(1400, 5000, "easeInOutCubic", 0, null, animateBack)
// }, 12000)
//
// function animateBack() {
//   setTimeout(function(){
//     console.log("hi");
//     animateScroll(-1398, 2000, "easeInOutCubic", 0)
//   }, 100)
// }

/* Popups */

let community = document.querySelectorAll(".item--dropdown-community")[0]

let popups = document.querySelectorAll(".popup-wrap")
let overlays = document.querySelectorAll(".popup-overlay")
let closeButtons = document.querySelectorAll(".popup__button--close")

let activePopup = null;
let activeOverlay = null;

community.addEventListener('click', function(event){
    showPopup(popups[0])
    event.preventDefault()
})

closeButtons.forEach((button) => {
  button.addEventListener('click', closeActivePopup)
})

overlays.forEach((overlay) => {
  overlay.addEventListener('click', closeActivePopup)
})

function showPopup(whichPopup) {
  activePopup = whichPopup
  addClassToElement(whichPopup, "popup--shown");
}

function closeActivePopup() {
  removeClassFromElement(activePopup, "popup--shown");
  activePopup = null;
}

/* Mobile Nav */

let moreLink = document.querySelectorAll(".item--more")[0]

let nav = document.querySelectorAll(".mobile-nav-wrap")[0]
let navOverlay = document.querySelectorAll(".mobile-nav-overlay")[0]
let navCloseButton = document.querySelectorAll(".mobile-nav-close")[0]


moreLink.addEventListener('click', function(event){
    showNav()
    event.preventDefault()
})

navCloseButton.addEventListener('click', closeNav)
navOverlay.addEventListener('click', closeNav)


function showNav() {
  addClassToElement(nav, "mobile-nav--shown");
}

function closeNav() {
  removeClassFromElement(nav, "mobile-nav--shown");
}


// new ScrollOver({
//   keyframes : [
//     {
//       element : sectionOne,
//       reveal:
//         {
//           when : 300,
//           className: "section--shown"
//         }
//     }
//   ]
//  }).init()


/*--- Utils ---*/
function addClassToElement(element, className) {
  (element.classList) ? element.classList.add(className) : element.className += ' ' + className
  return element
}

function removeClassFromElement(element, className) {
  if(element.classList) {
    element.classList.remove(className)
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }
  return element
}

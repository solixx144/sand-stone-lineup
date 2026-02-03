// ELEMENTLER
const points = document.querySelectorAll(".point");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const closePopup = document.getElementById("closePopup");

const tutorial = document.getElementById("tutorial");
const closeTutorial = document.getElementById("closeTutorial");

const menuBtn = document.getElementById("menuBtn");
const mapMenu = document.getElementById("mapMenu");
const closeMenu = document.getElementById("closeMenu");

// NOKTA TIKLAMA
points.forEach(point=>{
  point.onclick=()=>{
    popupTitle.textContent = point.dataset.name;
    popup.classList.add("show");
  }
});

// POPUP KAPAT
closePopup.onclick=()=>{
  popup.classList.remove("show");
};

// MENÜ
menuBtn.onclick=()=>{
  mapMenu.classList.add("show");
};

closeMenu.onclick=()=>{
  mapMenu.classList.remove("show");
};

// TUTORIAL
window.onload=()=>{
  tutorial.classList.add("show");
};

closeTutorial.onclick=()=>{
  tutorial.classList.remove("show");
};

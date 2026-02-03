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
  point.addEventListener("click",()=>{
    popupTitle.textContent = point.dataset.name;
    popup.classList.add("show");
  });
});

// POPUP KAPAT
closePopup.addEventListener("click",()=>popup.classList.remove("show"));

// MENÜ
menuBtn.addEventListener("click",()=>mapMenu.classList.add("show"));
closeMenu.addEventListener("click",()=>mapMenu.classList.remove("show"));

// TUTORIAL
window.addEventListener("load",()=>tutorial.classList.add("show"));
closeTutorial.addEventListener("click",()=>tutorial.classList.remove("show"));

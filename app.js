// NOKTA TIKLAMA
const points = document.querySelectorAll(".point");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupVideo = document.getElementById("popupVideo");
const closePopup = document.getElementById("closePopup");

points.forEach(point=>{
  point.addEventListener("click",()=>{
    popupTitle.textContent = point.className.split(" ")[1]; // flash / molly / smoke / grenade
    popupVideo.src = point.dataset.video+"?autoplay=1";
    popup.classList.add("show");
  });
});

// POPUP KAPAT
closePopup.addEventListener("click",()=>{
  popup.classList.remove("show");
  popupVideo.src="";
});

// MENÜ
const menuBtn = document.getElementById("menuBtn");
const mapMenu = document.getElementById("mapMenu");
const closeMenu = document.getElementById("closeMenu");
menuBtn.addEventListener("click",()=>mapMenu.classList.add("show"));
closeMenu.addEventListener("click",()=>mapMenu.classList.remove("show"));

// TUTORIAL
const tutorial = document.getElementById("tutorial");
const closeTutorial = document.getElementById("closeTutorial");
window.addEventListener("load",()=>tutorial.classList.add("show"));
closeTutorial.addEventListener("click",()=>tutorial.classList.remove("show"));

// TEMALAR
const themeButtons = document.querySelectorAll(".themeBtn");
themeButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.body.className=btn.dataset.theme;
  });
});

const texts = { /* önceki diller objesi */ };

// Dil değiştirme
const langSelect = document.getElementById("langSelect");
langSelect.addEventListener("change",()=>{
  const lang = langSelect.value;
  document.body.dataset.lang = lang;
  document.querySelectorAll("[data-text]").forEach(el=>{
    el.innerHTML = texts[lang][el.dataset.text];
  });
  document.getElementById("tutorialText").innerHTML = texts[lang].tutorialText;
});

// Reklam duvarları
document.querySelectorAll(".ad-wall").forEach(ad=>{
  ad.addEventListener("click",()=>window.open("https://www.tiktok.com/@solixx144","_blank"));
});

// Noktalar popup
const points = document.querySelectorAll(".point");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupVideo = document.getElementById("popupVideo");
const closePopup = document.getElementById("closePopup");

points.forEach(point=>{
  point.addEventListener("click",()=>{
    popupTitle.textContent = point.className.split(" ")[1];
    popupVideo.innerHTML = `<video width="320" height="180" src="${point.dataset.video}" controls autoplay></video>`;
    popup.classList.add("show");
  });
});
closePopup.addEventListener("click",()=>{
  popup.classList.remove("show");
  popupVideo.innerHTML="";
});

// Menü aç/kapa
const menuBtn = document.getElementById("menuBtn");
const mapMenu = document.getElementById("mapMenu");
const closeMenu = document.getElementById("closeMenu");
menuBtn.addEventListener("click",()=>mapMenu.classList.add("show"));
closeMenu.addEventListener("click",()=>mapMenu.classList.remove("show"));

// Tutorial
const tutorial = document.getElementById("tutorial");
const closeTutorial = document.getElementById("closeTutorial");
window.addEventListener("load",()=>tutorial.classList.add("show"));
closeTutorial.addEventListener("click",()=>tutorial.classList.remove("show"));

// Temalar
document.querySelectorAll(".themeBtn").forEach(btn=>{
  btn.addEventListener("click",()=>document.body.className=btn.dataset.theme);
});

// Nokta filtreleme
function filterPoints(type){
  points.forEach(p=>{
    if(type==='all'){p.style.display='block';}
    else{p.style.display = p.classList.contains(type)?'block':'none';}
  });
}

const texts = {
  tr:{siteTitle:"Sand Stone Lineup",mapsTitle:"Haritalar",mapDune:"Dune – Yakında",mapRust:"Rust – Yakında",mapZone:"Zone 7 – Yakında",themesTitle:"Temalar",themeLight:"Açık Tema",themeDark:"Koyu Tema",themeRed:"Kırmızı Nitro",themeBlue:"Mavi Nitro",themeGreen:"Yeşil Nitro",filterTitle:"Noktalar",flash:"Flash",molly:"Molly",smoke:"Smoke",grenade:"Grenade",allPoints:"Hepsi",close:"Kapat",tutorialTitle:"Nasıl Kullanılır?",gotIt:"Tamam",tutorialText:`1. Noktalara tıklayın.<br>2. Video otomatik açılır.<br>3. Popup'u kapatmak için çarpıya tıklayın.<br>4. Menüden temayı ve filtreleri değiştirebilirsiniz.<br>5. Reklam duvarlarına tıklarsanız TikTok hesabına yönlendirilirsiniz.`},
  en:{siteTitle:"Sand Stone Lineup",mapsTitle:"Maps",mapDune:"Dune – Coming Soon",mapRust:"Rust – Coming Soon",mapZone:"Zone 7 – Coming Soon",themesTitle:"Themes",themeLight:"Light Theme",themeDark:"Dark Theme",themeRed:"Red Nitro",themeBlue:"Blue Nitro",themeGreen:"Green Nitro",filterTitle:"Points",flash:"Flash",molly:"Molly",smoke:"Smoke",grenade:"Grenade",allPoints:"All",close:"Close",tutorialTitle:"How To Use",gotIt:"Got it",tutorialText:`1. Click the points.<br>2. Video will open automatically.<br>3. Click × to close popup.<br>4. Change theme & filters from menu.<br>5. Click ad walls to go TikTok.`},
  ru:{siteTitle:"Sand Stone Lineup",mapsTitle:"Карты",mapDune:"Dune – Скоро",mapRust:"Rust – Скоро",mapZone:"Zone 7 – Скоро",themesTitle:"Темы",themeLight:"Светлая",themeDark:"Темная",themeRed:"Красная Nitro",themeBlue:"Синяя Nitro",themeGreen:"Зеленая Nitro",filterTitle:"Точки",flash:"Flash",molly:"Molly",smoke:"Smoke",grenade:"Grenade",allPoints:"Все",close:"Закрыть",tutorialTitle:"Как использовать",gotIt:"Понятно",tutorialText:`1. Нажмите на точки.<br>2. Видео откроется автоматически.<br>3. Нажмите × чтобы закрыть popup.<br>4. Меню для изменения темы и фильтров.<br>5. Нажмите рекламные стены, чтобы открыть TikTok.`}
};

const langSelect = document.getElementById("langSelect");
langSelect.addEventListener("change",()=>{
  const lang = langSelect.value;
  document.body.dataset.lang = lang;
  document.querySelectorAll("[data-text]").forEach(el=>{
    el.innerHTML = texts[lang][el.dataset.text];
  });
  document.getElementById("tutorialText").innerHTML = texts[lang].tutorialText;
});

document.querySelectorAll(".ad-wall").forEach(ad=>{
  ad.addEventListener("click",()=>window.open("https://www.tiktok.com/@solixx144","_blank"));
});

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

const menuBtn = document.getElementById("menuBtn");
const mapMenu = document.getElementById("mapMenu");
const closeMenu = document.getElementById("closeMenu");
menuBtn.addEventListener("click",()=>mapMenu.classList.add("show"));
closeMenu.addEventListener("click",()=>mapMenu.classList.remove("show"));

const tutorial = document.getElementById("tutorial");
const closeTutorial = document.getElementById("closeTutorial");
window.addEventListener("load",()=>tutorial.classList.add("show"));
closeTutorial.addEventListener("click",()=>tutorial.classList.remove("show"));

document.querySelectorAll(".themeBtn").forEach(btn=>{
  btn.addEventListener("click",()=>document.body.className=btn.dataset.theme);
});

// NOKTA FİLTRELEME
function filterPoints(type){
  points.forEach(p=>{
    if(type==='all'){p.style.display='block';}
    else{p.style.display = p.classList.contains(type)?'block':'none';}
  });
}

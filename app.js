// --- DİL ---
const texts = {tr:{siteTitle:"Sand Stone Lineup",mapsTitle:"Haritalar",mapDune:"Dune – Yakında",mapRust:"Rust – Yakında",mapZone:"Zone 7 – Yakında",themesTitle:"Nitro Temalar",filterTitle:"Noktalar",flash:"Flash",molly:"Molly",smoke:"Smoke",grenade:"Grenade",allPoints:"Hepsi",close:"Kapat",tutorialTitle:"Nasıl Kullanılır?",gotIt:"Tamam",tutorialText:`1. Noktalara tıklayın.<br>2. Video otomatik açılır.<br>3. Popup'u kapatmak için çarpıya tıklayın.<br>4. Menüden temayı ve filtreleri değiştirebilirsiniz.<br>5. Reklam duvarlarına tıklarsanız TikTok hesabına yönlendirilirsiniz.`},
en:{siteTitle:"Sand Stone Lineup",mapsTitle:"Maps",mapDune:"Dune – Coming Soon",mapRust:"Rust – Coming Soon",mapZone:"Zone 7 – Coming Soon",themesTitle:"Nitro Themes",filterTitle:"Points",flash:"Flash",molly:"Molly",smoke:"Smoke",grenade:"Grenade",allPoints:"All",close:"Close",tutorialTitle:"How To Use",gotIt:"Got it",tutorialText:`1. Click points.<br>2. Video opens automatically.<br>3. Click × to close.<br>4. Change theme & filters from menu.<br>5. Click ad walls for TikTok.`},
ru:{siteTitle:"Sand Stone Lineup",mapsTitle:"Карты",mapDune:"Dune – Скоро",mapRust:"Rust – Скоро",mapZone:"Zone 7 – Скоро",themesTitle:"Nitro Темы",filterTitle:"Точки",flash:"Flash",molly:"Molly",smoke:"Smoke",grenade:"Grenade",allPoints:"Все",close:"Закрыть",tutorialTitle:"Как использовать",gotIt:"Понятно",tutorialText:`1. Нажмите на точки.<br>2. Видео откроется автоматически.<br>3. Нажмите × чтобы закрыть.<br>4. Меню для изменения темы и фильтров.<br>5. Нажмите рекламные стены для TikTok.`}};

const langSelect = document.getElementById("langSelect");
langSelect.addEventListener("change",()=>{
  const lang = langSelect.value;
  document.body.dataset.lang = lang;
  document.querySelectorAll("[data-text]").forEach(el=>{el.innerHTML = texts[lang][el.dataset.text];});
  document.getElementById("tutorialText").innerHTML = texts[lang].tutorialText;
});

// --- REKLAM ---
document.querySelectorAll(".ad-wall").forEach(ad=>ad.addEventListener("click",()=>window.open("https://www.tiktok.com/@solixx144","_blank")));

// --- NOKTALAR & POPUP ---
const points = document.querySelectorAll(".point");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupVideo = document.getElementById("popupVideo");
const closePopup = document.getElementById("closePopup");
const isAdmin = true; // admin modu, sürükleme için

points.forEach(point=>{
  // video açma
  point.addEventListener("click",()=>{
    if(!isAdmin){
      popupTitle.textContent = point.className.split(" ")[1];
      popupVideo.innerHTML = `<video width="320" height="180" src="${point.dataset.video}" controls autoplay></video>`;
      popup.classList.add("show");
    }
  });

  // admin sürükleme
  if(isAdmin){
    let offsetX, offsetY;
    point.addEventListener('mousedown', e => {
      offsetX = e.clientX - point.offsetLeft;
      offsetY = e.clientY - point.offsetTop;
      function move(e){
        point.style.left = (e.clientX - offsetX) + 'px';
        point.style.top = (e.clientY - offsetY) + 'px';
      }
      function up(){
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      }
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    });
  }
});

closePopup.addEventListener("click",()=>{popup.classList.remove("show"); popupVideo.innerHTML="";});

// --- MENU ---
const menuBtn = document.getElementById("menuBtn");
const mapMenu = document.getElementById("mapMenu");
const closeMenu = document.getElementById("closeMenu");
menuBtn.addEventListener("click",()=>mapMenu.classList.add("show"));
closeMenu.addEventListener("click",()=>mapMenu.classList.remove("show"));

// --- TUTORIAL ---
const tutorial = document.getElementById("tutorial");
const closeTutorial = document.getElementById("closeTutorial");
window.addEventListener("load",()=>tutorial.classList.add("show"));
closeTutorial.addEventListener("click",()=>tutorial.classList.remove("show"));

// --- TEMALAR ---
document.querySelectorAll(".themeBtn").forEach(btn=>btn.addEventListener("click",()=>document.body.className=btn.dataset.theme));
document.getElementById("lightThemeBtn").addEventListener("click",()=>document.body.className='light');
document.getElementById("darkThemeBtn").addEventListener("click",()=>document.body.className='dark');

// --- NOKTA FİLTRE ---
function filterPoints(type){points.forEach(p=>{p.style.display=(type==='all'||p.classList.contains(type))?'block':'none';});}

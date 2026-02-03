// Noktalar
const points = document.querySelectorAll(".point");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupBody = document.getElementById("popupBody");
const closeBtn = document.getElementById("closeBtn");
const tutorial = document.getElementById("tutorial");
const closeTutorialBtn = document.getElementById("closeTutorialBtn");

// Sesler
const clickSound = new Audio("click.mp3");
const openSound = new Audio("open.mp3");
const closeSound = new Audio("close.mp3");

// Dil sistemi (TR sabit)
function translatePoint(name){ return name; }
function translateGrenade(type){ return type.charAt(0).toUpperCase()+type.slice(1); }
function translateText(txt){ return txt; }

// Noktaya tıklama
points.forEach(point => {
  point.addEventListener("click",(e)=>{
    clickSound.currentTime=0; clickSound.play();

    const area = point.dataset.name;
    popupTitle.textContent = translatePoint(area);
    popupBody.innerHTML="";

    ["smoke","flash","molly"].forEach(type=>{
      const btn=document.createElement("button");
      btn.className="grenade-btn";
      btn.dataset.type=type;
      btn.textContent=translateGrenade(type);
      btn.onclick=()=>alert(translateText("Yakında video eklenecek"));
      popupBody.appendChild(btn);
    });

    popup.classList.add("show");
    openSound.currentTime=0; openSound.play();

    // Soft shake
    popup.classList.add("shake");
    setTimeout(()=>popup.classList.remove("shake"),300);

    // Mini-tooltip
    let tooltip=document.createElement("div");
    tooltip.className="mini-tooltip show";
    tooltip.textContent=translatePoint(area);
    document.body.appendChild(tooltip);
    const rect = point.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width/2 + "px";
    tooltip.style.top = rect.top + "px";
    setTimeout(()=>{tooltip.classList.remove("show"); setTimeout(()=>tooltip.remove(),300);},1500);
  });
});

// Popup kapatma
closeBtn.addEventListener("click",()=>{
  closeSound.currentTime=0; closeSound.play();
  popup.classList.remove("show");
});

// Tutorial
function showTutorial(){
  tutorial.querySelector("#tutorialTitle").textContent=translateText("Nasıl Kullanılır?");
  tutorial.querySelector("#tutorialText").textContent=translateText("Kırmızı noktalara tıkla → Grenade seç → Popup açılacak");
  tutorial.classList.add("show");
  openSound.currentTime=0; openSound.play();
}

closeTutorialBtn.addEventListener("click",()=>{
  closeSound.currentTime=0; closeSound.play();
  tutorial.classList.remove("show");
});

// Sayfa açılınca tutorial
window.addEventListener("load",()=>showTutorial());

alert("JS ÇALIŞIYOR");

let currentArea = "market";
let currentLang = "tr";

const texts = {
  tr: { market: "Market", a: "A Site", b: "B Site" },
  en: { market: "Market", a: "A Site", b: "B Site" },
  ru: { market: "Маркет", a: "A плент", b: "B плент" }
};

// Instagram banner
function openInsta() {
  window.open("https://instagram.com/solixx144", "_blank");
}

// Popup aç
function openPopup(area) {
  currentArea = area;
  document.getElementById("areaTitle").innerText =
    texts[currentLang][currentArea];
  document.getElementById("popup").style.display = "block";
}

// Popup kapat
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Dil değiştir
function setLang() {
  currentLang = document.getElementById("lang").value;
  document.getElementById("areaTitle").innerText =
    texts[currentLang][currentArea];
}

// Şu an video yok
function playVideo(type) {
  alert("Şu an video eklenmedi 🚧\nDaha sonra kendi videolarını bağlayacağız.");
}

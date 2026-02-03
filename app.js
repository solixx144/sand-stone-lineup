const tabs = document.querySelectorAll(".tab");
const points = document.querySelectorAll(".point");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const closeBtn = document.getElementById("closePopup");

let activeType = "smoke";

/* TAB SİSTEMİ */
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    activeType = tab.dataset.type;
    filterPoints();
  });
});

function filterPoints() {
  points.forEach(point => {
    point.style.display = point.classList.contains(activeType)
      ? "block"
      : "none";
  });
}

filterPoints();

/* POINT TIKLAMA */
points.forEach(point => {
  point.addEventListener("click", () => {
    popupTitle.textContent = point.dataset.name;
    popup.style.display = "flex";
  });
});

/* POPUP KAPAT */
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

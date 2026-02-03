alert("JS YÜKLENDİ");


const points = document.querySelectorAll(".point");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");

points.forEach(point => {
  point.addEventListener("click", () => {
    popupTitle.textContent = point.dataset.name;
    popup.style.display = "block";
  });
});

function closePopup() {
  popup.style.display = "none";
}

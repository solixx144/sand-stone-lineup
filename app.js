const points = document.querySelectorAll(".point");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const closeBtn = document.getElementById("closePopup");

points.forEach(point => {
  point.addEventListener("click", () => {
    popupTitle.textContent = point.dataset.name;
    popup.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

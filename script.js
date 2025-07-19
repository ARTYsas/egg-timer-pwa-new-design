const carousel = document.getElementById("carousel");
const indicators = document.getElementById("indicators");
const items = document.querySelectorAll(".carousel-item");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
const detailsBtn = document.querySelector(".info-button");

let currentIndex = 0;
const totalItems = items.length;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;

  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });

  [...indicators.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function createIndicators() {
  indicators.innerHTML = "";
  for (let i = 0; i < totalItems; i++) {
    const dot = document.createElement("div");
    if (i === currentIndex) dot.classList.add("active");
    indicators.appendChild(dot);
  }
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, totalItems - 1));
  updateCarousel();
}

leftArrow.addEventListener("click", () => goTo(currentIndex - 1));
rightArrow.addEventListener("click", () => goTo(currentIndex + 1));

// Свайпы
let startX = 0;
let endX = 0;

carousel.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) goTo(currentIndex + 1);
  else if (endX - startX > 50) goTo(currentIndex - 1);
});

// 🔥 Кнопка «Подробнее»
if (detailsBtn) {
  detailsBtn.addEventListener("click", () => {
    localStorage.setItem("selectedIndex", currentIndex);
    window.location.href = "details.html";
  });
}

createIndicators();
updateCarousel();

document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  // No button runs away when hovered
  noBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  });

  // Yes button opens scrapbook page
  yesBtn.addEventListener("click", () => {
    window.location.href = "scrapbook.html";
  });
});

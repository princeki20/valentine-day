const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

// No button runs away
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// Yes button opens scrapbook page
yesBtn.addEventListener("click", () => {
  window.location.href = "scrapbook.html";
});

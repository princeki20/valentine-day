const no = document.getElementById("no");
const yes = document.getElementById("yes");

// No button runs away
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);

  no.style.position = "absolute";
  no.style.left = `${x}px`;
  no.style.top = `${y}px`;
});

// Yes button opens scrapbook page
yes.addEventListener("click", () => {
  window.location.href = "scrapbook.html";
});

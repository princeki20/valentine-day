document.addEventListener("DOMContentLoaded", async () => {

  // 🎊 Confetti
  if (typeof confetti === "function") {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // 🎵 Music autoplay
  const audio = document.getElementById("bgMusic");
  if (!audio) return;
  audio.volume = 0.5;

  try { await audio.play(); } catch {}

  // Music controls
  const controls = document.createElement("div");
  controls.className = "music-controls";
  document.body.appendChild(controls);

  const playBtn = document.createElement("button");
  playBtn.className = "music-toggle";
  playBtn.textContent = "⏸ Pause";
  controls.appendChild(playBtn);

  const muteBtn = document.createElement("button");
  muteBtn.className = "music-mute";
  muteBtn.textContent = "🔊";
  controls.appendChild(muteBtn);

  playBtn.onclick = async () => {
    if (audio.paused) {
      await audio.play();
      playBtn.textContent = "⏸ Pause";
    } else {
      audio.pause();
      playBtn.textContent = "▶️ Play";
    }
  };

  muteBtn.onclick = () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
  };

  // 🏠 Home button
  const homeBtn = document.getElementById("homeBtn");
  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // 📸 Lightbox functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  document.querySelectorAll(".scrapbook-page img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });

});

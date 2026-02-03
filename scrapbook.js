document.addEventListener("DOMContentLoaded", () => {
  // ----- Confetti -----
  if (typeof confetti === "function") {
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
  }

  // ----- Background Music -----
  const audio = document.getElementById("bgMusic");
  if (!audio) return;

  audio.volume = 0.5;

  // Music controls container
  const controls = document.createElement("div");
  controls.className = "music-controls";
  document.body.appendChild(controls);

  // Play / Pause button
  const playBtn = document.createElement("button");
  playBtn.className = "music-toggle";
  playBtn.textContent = "▶️ Play music";
  controls.appendChild(playBtn);

  // Mute / Unmute button
  const muteBtn = document.createElement("button");
  muteBtn.className = "music-mute";
  muteBtn.textContent = "🔊 Unmuted";
  controls.appendChild(muteBtn);

  // Play / Pause logic
  playBtn.onclick = async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playBtn.textContent = "⏸️ Pause music";
      } else {
        audio.pause();
        playBtn.textContent = "▶️ Play music";
      }
    } catch {}
  };

  // Mute / Unmute logic
  muteBtn.onclick = () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇 Muted" : "🔊 Unmuted";
  };

  // Start music on first click anywhere
  window.addEventListener("click", async () => {
    try { await audio.play(); playBtn.textContent = "⏸️ Pause music"; } 
    catch { console.log("Music blocked, click Play to start"); }
  }, { once: true });

  // ----- Image hover effect -----
  document.querySelectorAll(".scrapbook-page img").forEach(img => {
    img.addEventListener("mouseenter", () => img.style.transform = "rotate(-2deg) scale(1.05)");
    img.addEventListener("mouseleave", () => img.style.transform = "rotate(0deg) scale(1)");
  });
});

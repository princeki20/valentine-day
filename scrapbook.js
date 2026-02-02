document.addEventListener("DOMContentLoaded", () => {
  // Confetti 🎊
  if (typeof confetti === "function") {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const audio = document.getElementById("bgMusic");
  if (!audio) return;

  audio.volume = 0.5;

  // Controls container
  const controls = document.createElement("div");
  controls.className = "music-controls";
  document.body.appendChild(controls);

  // Play / Pause
  const playBtn = document.createElement("button");
  playBtn.className = "music-toggle";
  playBtn.textContent = "▶️ Play music";
  controls.appendChild(playBtn);

  // Mute
  const muteBtn = document.createElement("button");
  muteBtn.className = "music-mute";
  muteBtn.textContent = "🔊 Unmuted";
  controls.appendChild(muteBtn);

  playBtn.onclick = async () => {
    if (audio.paused) {
      await audio.play();
      playBtn.textContent = "⏸️ Pause music";
    } else {
      audio.pause();
      playBtn.textContent = "▶️ Play music";
    }
  };

  muteBtn.onclick = () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇 Muted" : "🔊 Unmuted";
  };

  // Start music on first click (browser policy)
  const startMusicOnce = async () => {
    try {
      await audio.play();
      playBtn.textContent = "⏸️ Pause music";
    } catch {}
    window.removeEventListener("click", startMusicOnce);
  };

  window.addEventListener("click", startMusicOnce);
});

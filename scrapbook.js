document.addEventListener("DOMContentLoaded", async () => {
  // Confetti
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

  // Play automatically (allowed because user clicked YES)
  try {
    await audio.play();
  } catch {}

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
});

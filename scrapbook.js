document.addEventListener("DOMContentLoaded", () => {
  // 🎊 Confetti
  if (typeof confetti === "function") {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const audio = document.getElementById("bgMusic");
  if (!audio) return;

  audio.volume = 0.6;

  // 🎵 Music controls
  const controls = document.createElement("div");
  controls.className = "music-controls";
  document.body.appendChild(controls);

  const playBtn = document.createElement("button");
  playBtn.className = "music-toggle";
  playBtn.textContent = "▶️ Play music";
  controls.appendChild(playBtn);

  const muteBtn = document.createElement("button");
  muteBtn.className = "music-mute";
  muteBtn.textContent = "🔊 Unmuted";
  controls.appendChild(muteBtn);

  // ▶️ Play / Pause
  playBtn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playBtn.textContent = "⏸️ Pause music";
      } else {
        audio.pause();
        playBtn.textContent = "▶️ Play music";
      }
    } catch (e) {
      console.log("Audio play blocked:", e);
    }
  });

  // 🔇 Mute
  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇 Muted" : "🔊 Unmuted";
  });

  // ✅ Browser-approved autoplay workaround
  document.body.addEventListener(
    "click",
    async () => {
      try {
        await audio.play();
        playBtn.textContent = "⏸️ Pause music";
      } catch {}
    },
    { once: true }
  );
});

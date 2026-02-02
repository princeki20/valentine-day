document.addEventListener("DOMContentLoaded", () => {
  // Trigger confetti
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Background music control
  const audio = document.getElementById('bgMusic');
  if (!audio) return; // if audio element is missing, stop

  // Create controls container
  const controls = document.createElement('div');
  controls.className = 'music-controls';
  document.body.appendChild(controls);

  // Play/Pause button
  const playBtn = document.createElement('button');
  playBtn.className = 'music-toggle';
  playBtn.type = 'button';
  playBtn.title = 'Play/Pause background music';
  controls.appendChild(playBtn);

  // Mute/Unmute button
  const muteBtn = document.createElement('button');
  muteBtn.className = 'music-mute';
  muteBtn.type = 'button';
  muteBtn.title = 'Mute/Unmute background music';
  controls.appendChild(muteBtn);

  // Volume slider container
  const volWrap = document.createElement('div');
  volWrap.className = 'music-volume';
  const volIcon = document.createElement('span');
  volIcon.textContent = '🔊';
  volIcon.setAttribute('aria-hidden', 'true');
  const volRange = document.createElement('input');
  volRange.type = 'range';
  volRange.min = '0';
  volRange.max = '100';
  volRange.step = '1';
  volWrap.appendChild(volIcon);
  volWrap.appendChild(volRange);
  controls.appendChild(volWrap);

  // Restore saved mute and volume preference (if any)
  try {
    const savedMuted = localStorage.getItem('bgMusicMuted');
    if (savedMuted === 'true') audio.muted = true;
    else if (savedMuted === 'false') audio.muted = false;

    const savedVol = localStorage.getItem('bgMusicVolume');
    if (savedVol !== null) {
      const v = Math.max(0, Math.min(100, Number(savedVol)));
      audio.volume = v / 100;
    }
  } catch (e) {
    // localStorage might be unavailable in some contexts; ignore
  }

  // Initialize slider position and UI helper
  const setRangeAndCss = (value) => {
    volRange.value = String(Math.round(value * 100));
    volRange.style.setProperty('--vol', `${volRange.value}%`);
    volIcon.textContent = value === 0 || audio.muted ? '🔇' : '🔊';
  };

  const updatePlayButton = () => {
    playBtn.textContent = audio.paused ? '▶️ Play music' : '⏸️ Pause music';
    playBtn.setAttribute('aria-pressed', String(!audio.paused));
  };
  const updateMuteButton = () => {
    muteBtn.textContent = audio.muted ? '🔇 Muted' : '🔊 Unmuted';
    muteBtn.setAttribute('aria-pressed', String(audio.muted));
  };

  // Respond to play/pause
  playBtn.addEventListener('click', async () => {
    try {
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch (err) {
      console.warn('Playback failed:', err);
    }
    updatePlayButton();
  });

  // Mute toggle
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    try { localStorage.setItem('bgMusicMuted', audio.muted ? 'true' : 'false'); } catch (e) {}
    updateMuteButton();
    setRangeAndCss(audio.muted ? 0 : audio.volume);
  });

  // Volume range change
  volRange.addEventListener('input', () => {
    const vol = Math.max(0, Math.min(100, Number(volRange.value)));
    audio.volume = vol / 100;
    try { localStorage.setItem('bgMusicVolume', String(vol)); } catch (e) {}
    // if volume set to 0, reflect muted state (but keep mute flag separately)
    if (vol === 0) audio.muted = true;
    else audio.muted = false;
    try { localStorage.setItem('bgMusicMuted', audio.muted ? 'true' : 'false'); } catch (e) {}
    updateMuteButton();
    setRangeAndCss(audio.volume);
  });

  // Try to start playback on first user interaction
  const startOnFirstInteraction = async () => {
    try {
      await audio.play();
      updatePlayButton();
    } catch (e) {
      // If playback is blocked, user can click the button to start music
    } finally {
      window.removeEventListener('click', startOnFirstInteraction, true);
    }
  };
  window.addEventListener('click', startOnFirstInteraction, true);

  // Initialize UI state
  updatePlayButton();
  updateMuteButton();
  setRangeAndCss(audio.muted ? 0 : audio.volume);

  // Try to start playback on first user interaction (satisfies autoplay policies)
  const startOnFirstInteraction = async () => {
    try {
      await audio.play();
      updatePlayButton();
    } catch (e) {
      // If playback is blocked, user can click the button to start music
    } finally {
      window.removeEventListener('click', startOnFirstInteraction, true);
    }
  };
  window.addEventListener('click', startOnFirstInteraction, true);

  // Initialize UI state
  updatePlayButton();
  updateMuteButton();
});

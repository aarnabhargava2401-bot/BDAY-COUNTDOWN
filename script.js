// ---------- Floating background decor (hearts, sparkles, balloons) ----------
function spawnFloaty(container, count = 14) {
  const emojis = ['💗','✨','🎈','🌸','⭐','💫'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'floaty';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (14 + Math.random() * 20) + 'px';
    const duration = 10 + Math.random() * 14;
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = (-Math.random() * duration) + 's';
    container.appendChild(el);
  }
}

// ---------- Confetti burst ----------
function burstConfetti(x, y) {
  const colors = ['#ff8fb3', '#e4d9ff', '#ffe29a', '#a68cf0', '#ffc9e0'];
  for (let i = 0; i < 26; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    document.body.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 4 + Math.random() * 8;
    const vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity - 6;
    let posX = x, posY = y;
    let rot = Math.random() * 360;
    const spin = (Math.random() - 0.5) * 20;
    const gravity = 0.35;
    let opacity = 1;

    function frame() {
      vy += gravity;
      posX += vx;
      posY += vy;
      rot += spin;
      opacity -= 0.012;
      piece.style.transform = `translate(${posX - x}px, ${posY - y}px) rotate(${rot}deg)`;
      piece.style.opacity = opacity;
      if (opacity > 0) {
        requestAnimationFrame(frame);
      } else {
        piece.remove();
      }
    }
    requestAnimationFrame(frame);
  }
}

// attach confetti to all .btn elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      burstConfetti(e.clientX, e.clientY);
    });
  });

  const floatyLayer = document.getElementById('floaty-layer');
  if (floatyLayer) spawnFloaty(floatyLayer, 16);

  // typewriter for message page
  document.querySelectorAll('.typewriter').forEach(el => {
    const full = el.getAttribute('data-text') || el.textContent;
    el.textContent = '';
    let i = 0;
    function type() {
      if (i <= full.length) {
        el.textContent = full.slice(0, i);
        i++;
        setTimeout(type, 32);
      }
    }
    type();
  });
});

// ---------- Countdown ----------
function startCountdown(targetDateStr, elId) {
  const target = new Date(targetDateStr).getTime();
  const wrap = document.getElementById(elId);
  if (!wrap) return;

  function update() {
    const now = new Date().getTime();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    wrap.querySelector('.d-num').textContent = d;
    wrap.querySelector('.h-num').textContent = String(h).padStart(2, '0');
    wrap.querySelector('.m-num').textContent = String(m).padStart(2, '0');
    wrap.querySelector('.s-num').textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// Create gentle background sparkles
const stars = document.querySelector('.stars');
for (let i = 0; i < 18; i += 1) {
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${Math.random() * 100}%`;
  sparkle.style.animationDelay = `${Math.random() * 3}s`;
  sparkle.style.animationDuration = `${2.8 + Math.random() * 2.2}s`;
  stars.appendChild(sparkle);
}

// Create orbiting dots along the swirl near the heart
const heartWrap = document.querySelector('.heart-wrap');
if (heartWrap) {
  const svg = heartWrap.querySelector('svg');
  const bbox = svg.getBoundingClientRect();
  const centerX = bbox.left + bbox.width / 2;
  const centerY = bbox.top + bbox.height / 2;
  const count = 18;
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'swirl-dot';
    const angle = (i / count) * 360;
    const ring = (i % 3);
    const radiusVal = 70 + ring * 28;
    dot.style.setProperty('--rot', `${angle}deg`);
    dot.style.setProperty('--r', `${radiusVal}px`);
    dot.style.left = `calc(50% - ${bbox.width/2}px)`;
    dot.style.top = `calc(50% - ${bbox.height/2}px)`;
    dot.style.margin = `-4px 0 0 -4px`;
    dot.style.animationDelay = `${(i % 6) * 0.12}s`;
    heartWrap.appendChild(dot);
  }
}

// Ensure letters M and D are positioned within the visible SVG area (responsive)
function adjustLetters() {
  const svg = document.querySelector('.heart-svg');
  if (!svg) return;
  const viewBox = svg.getAttribute('viewBox') || '0 0 760 520';
  const vb = viewBox.split(' ').map(Number);
  const vbW = vb[2];
  const vbH = vb[3];

  const m = svg.querySelector('.letter-m');
  const d = svg.querySelector('.letter-d');
  if (m) {
    // place M at ~6% from left and ~90% from top of viewBox
    const mx = Math.round(vbW * 0.06);
    const my = Math.round(vbH * 0.92);
    m.setAttribute('x', mx);
    m.setAttribute('y', my);
    m.setAttribute('text-anchor', 'end');
  }
  if (d) {
    // place D at ~92% from left and ~14% from top of viewBox
    const dx = Math.round(vbW * 0.92);
    const dy = Math.round(vbH * 0.14);
    d.setAttribute('x', dx);
    d.setAttribute('y', dy);
    d.setAttribute('text-anchor', 'middle');
  }
}

window.addEventListener('load', adjustLetters);
window.addEventListener('resize', () => {
  // small timeout to allow layout to settle
  setTimeout(adjustLetters, 80);
});

function adjustMarker() {
  const marker = document.getElementById('arrowhead');
  if (!marker) return;
  // Keep marker at full size regardless of screen width
  marker.setAttribute('markerWidth', '18');
  marker.setAttribute('markerHeight', '18');
  marker.setAttribute('refX', '12');
  marker.setAttribute('refY', '9');
}

window.addEventListener('load', () => { adjustMarker(); adjustLetters(); });
window.addEventListener('resize', () => { setTimeout(() => { adjustMarker(); adjustLetters(); }, 120); });

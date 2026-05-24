let platformStatus = {};

const changelogData = {
  windows: [
    {
      version: 'Coming Soon',
      date: 'None',
      badge: 'release',
      changes: [
        { type: 'added', text: 'Coming Soon' },
	{ type: 'added', text: 'Coming Soon' },
        { type: 'improved', text: 'Coming Soon' },
	{ type: 'improved', text: 'Coming Soon' },
        { type: 'fixed', text: 'Coming Soon' },
	{ type: 'fixed', text: 'Coming Soon' }
      ]
    }
  ],
  android: [
    {
      version: 'Coming Soon',
      date: 'None',
      badge: 'patch',
      changes: [
        { type: 'improved', text: 'Coming Soon' },
        { type: 'fixed', text: 'Coming Soon' },
        { type: 'added', text: 'Coming Soon' }
      ]
    }
  ],
  spoofer: [
    {
      version: 'Coming Soon',
      date: 'None',
      badge: 'release',
      changes: [
        { type: 'fixed', text: 'Coming Soon' },
        { type: 'added', text: 'Coming Soon' },
        { type: 'improved', text: 'Coming Soon' },
      ]
    }
  ],
  ios: [
    {
      version: 'Coming Soon',
      date: 'None',
      badge: 'release',
      changes: [
        { type: 'added', text: 'Coming Soon' },
      ]
    }
  ]
};

const typeConfig = {
  added:    { label: 'New',      icon: 'fa-solid fa-plus',           color: '#2ecc7a', bg: 'rgba(46,204,122,0.1)',   border: 'rgba(46,204,122,0.2)'  },
  fixed:    { label: 'Fix',      icon: 'fa-solid fa-wrench',         color: '#7b8fff', bg: 'rgba(123,143,255,0.1)', border: 'rgba(123,143,255,0.2)' },
  improved: { label: 'Improved', icon: 'fa-solid fa-arrow-trend-up', color: '#f0b429', bg: 'rgba(240,180,41,0.1)',  border: 'rgba(240,180,41,0.2)'  }
};

async function loadPlatformStatus() {
  try {
    const response = await fetch('a3s532123421.json');
    const data = await response.json();
    data.products.forEach(product => {
      platformStatus[product.id] = product.available;
    });
  } catch (error) {
    ['windows', 'android', 'spoofer', 'ios'].forEach(os => {
      platformStatus[os] = true;
    });
  }
  updateOSButtons();
}

function updateOSButtons() {
  document.querySelectorAll('.os-btn').forEach(btn => {
    const os = btn.getAttribute('data-os');
    if (platformStatus[os] === false) {
      btn.disabled = true;
      btn.style.opacity = '0.45';
    }
  });
}

function switchOS(os) {
  if (platformStatus[os] === false) return;

  document.querySelectorAll('.os-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-os="${os}"]`).classList.add('active');

  const timeline = document.getElementById('changelogTimeline');
  timeline.style.opacity = '0';
  timeline.style.transform = 'translateY(14px)';

  setTimeout(() => {
    renderChangelog(os);
    timeline.style.opacity = '1';
    timeline.style.transform = 'translateY(0)';
  }, 220);
}

function renderChangelog(os) {
  const timeline = document.getElementById('changelogTimeline');
  const data = changelogData[os] || [];
  timeline.innerHTML = '';

  if (data.length === 0) return;

  const item = data[0];

  const added    = item.changes.filter(c => c.type === 'added');
  const fixed    = item.changes.filter(c => c.type === 'fixed');
  const improved = item.changes.filter(c => c.type === 'improved');

  const badgeClass = `changelog-badge badge-${item.badge}`;
  const badgeText  = item.badge.charAt(0).toUpperCase() + item.badge.slice(1);

  const statsHtml = `
    <div class="cl-stats">
      <div class="cl-stat cl-stat-added">
        <i class="fa-solid fa-plus"></i>
        <span>${added.length} Added</span>
      </div>
      <div class="cl-stat cl-stat-fixed">
        <i class="fa-solid fa-wrench"></i>
        <span>${fixed.length} Fixed</span>
      </div>
      <div class="cl-stat cl-stat-improved">
        <i class="fa-solid fa-arrow-trend-up"></i>
        <span>${improved.length} Improved</span>
      </div>
    </div>
  `;

  function buildGroup(title, changes, type) {
    if (changes.length === 0) return '';
    const cfg = typeConfig[type];
    const items = changes.map((c, i) => `
      <div class="cl-change-item" style="animation-delay: ${i * 0.04}s">
        <div class="cl-change-icon" style="background:${cfg.bg}; border-color:${cfg.border}">
          <i class="${cfg.icon}" style="color:${cfg.color}"></i>
        </div>
        <span class="cl-change-text">${c.text}</span>
      </div>
    `).join('');

    return `
      <div class="cl-group">
        <div class="cl-group-label" style="color:${cfg.color}">
          <i class="${cfg.icon}"></i> ${title}
        </div>
        <div class="cl-group-items">${items}</div>
      </div>
    `;
  }

  timeline.innerHTML = `
    <div class="changelog-card">

      <div class="cl-card-header">
        <div class="cl-header-left">
          <div class="cl-version-badge">
            <i class="fa-solid fa-code-branch"></i>
            v${item.version}
          </div>
          <span class="${badgeClass}">${badgeText}</span>
        </div>
        <div class="cl-header-right">
          <div class="cl-date">
            <i class="fa-regular fa-calendar"></i>
            ${item.date}
          </div>
        </div>
      </div>

      <div class="cl-card-stats">
        ${statsHtml}
      </div>

      <div class="cl-card-body">
        ${buildGroup('New & Added', added, 'added')}
        ${buildGroup('Bug Fixes', fixed, 'fixed')}
        ${buildGroup('Improvements', improved, 'improved')}
      </div>

    </div>
  `;
}

function initCursor() {
  const cur = document.createElement('div');
  cur.className = 'cursor';
  document.body.appendChild(cur);

  const rng = document.createElement('div');
  rng.className = 'cursor-ring';
  document.body.appendChild(rng);

  let mx = 0, my = 0, rx = 0, ry = 0;
  let visible = false;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    if (!visible) {
      visible = true;
      cur.style.opacity = '1';
      rng.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => { cur.style.opacity = '0'; rng.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cur.style.opacity = '1'; rng.style.opacity = '1'; });

  (function loop() {
    cur.style.transform = 'translate(calc(' + mx + 'px - 50%), calc(' + my + 'px - 50%))';
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    rng.style.transform = 'translate(calc(' + rx + 'px - 50%), calc(' + ry + 'px - 50%))';
    requestAnimationFrame(loop);
  })();

  function applyHover(el) {
    if (!el) return;
    el.addEventListener('mouseenter', () => {
      cur.style.width = '14px'; cur.style.height = '14px';
      rng.style.width = '46px'; rng.style.height = '46px';
      rng.style.borderColor = 'rgba(255,255,255,0.55)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width = '8px'; cur.style.height = '8px';
      rng.style.width = '30px'; rng.style.height = '30px';
      rng.style.borderColor = 'rgba(255,255,255,0.35)';
    });
  }

  document.querySelectorAll('.os-btn, .btn-back, .discord-btn').forEach(applyHover);
}

document.addEventListener('DOMContentLoaded', function() {
  const timeline = document.getElementById('changelogTimeline');
  timeline.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  timeline.style.opacity = '0';
  timeline.style.transform = 'translateY(14px)';

  initCursor();

  loadPlatformStatus().then(() => {
    renderChangelog('windows');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        timeline.style.opacity = '1';
        timeline.style.transform = 'translateY(0)';
      });
    });
  });
});

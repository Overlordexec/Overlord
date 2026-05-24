/* ═══════════════════════════════════════════════════════════
   Overlord Auth — login.js
   Features: login, register, profile, settings, avatar/banner
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Config ────────────────────────────────────────────────────
const WORKER_URL  = 'https://overlord-auth.khoib1110.workers.dev';
const APP_TOKEN   = 'OVERLORD_SECRET_2026';
const STORAGE_KEY = 'overlord_users';
const SESSION_KEY = 'overlord_session';
const PROFILE_KEY = 'overlord_profiles';

// ── Cursor ────────────────────────────────────────────────────
(function initCursor() {
  const cur = document.createElement('div');
  cur.className = 'ovl-cursor';
  document.body.appendChild(cur);

  const rng = document.createElement('div');
  rng.className = 'ovl-cursor-ring';
  document.body.appendChild(rng);

  let mx = 0, my = 0, rx = 0, ry = 0, vis = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!vis) { vis = true; cur.style.opacity = '1'; rng.style.opacity = '1'; }
  }, { passive: true });

  document.addEventListener('mouseleave', () => { cur.style.opacity = '0'; rng.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cur.style.opacity = '1'; rng.style.opacity = '1'; });

  (function loop() {
    cur.style.transform  = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    rng.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(loop);
  })();

  // Hover effect
  window._hovEl = function(el) {
    if (!el) return;
    el.addEventListener('mouseenter', () => { cur.classList.add('hov'); rng.classList.add('hov'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hov'); rng.classList.remove('hov'); });
  };

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('button, a, label, input[type=file]');
    if (t) { cur.classList.add('hov'); rng.classList.add('hov'); }
    else   { cur.classList.remove('hov'); rng.classList.remove('hov'); }
  });
})();

// ── Nav scroll + hamburger ────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
if (ham) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
}

// ── Tab indicator ─────────────────────────────────────────────
function positionIndicator(tab) {
  const ind = document.getElementById('tabIndicator');
  if (!ind || !tab) return;
  const tabs = document.querySelector('.auth-tabs');
  const rect = tab.getBoundingClientRect();
  const pRect = tabs.getBoundingClientRect();
  ind.style.left  = (rect.left - pRect.left) + 'px';
  ind.style.width = rect.width + 'px';
}

function switchTab(name) {
  const map = { login: 'Login', register: 'Register' };
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

  const activeTab = document.getElementById('tab' + map[name]);
  if (activeTab) { activeTab.classList.add('active'); positionIndicator(activeTab); }

  const form = document.getElementById('form' + map[name]);
  if (form) form.classList.add('active');

  clearAllErrors();
}

// ── Utilities ─────────────────────────────────────────────────
async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function toast(msg, type = 'info', dur = 3200) {
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info', warn: 'fa-triangle-exclamation' };
  const box = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = `ovl-toast ${type}`;
  el.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> ${msg}`;
  box.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, dur);
}

function setFieldError(inputId, errId, msg) {
  const inp = document.getElementById(inputId);
  const err = document.getElementById(errId);
  if (inp) inp.classList.toggle('has-error', !!msg);
  if (err) {
    err.innerHTML = msg ? `<i class="fa-solid fa-circle-exclamation"></i> ${msg}` : '';
    err.classList.toggle('show', !!msg);
  }
  return !msg;
}

function clearAllErrors() {
  document.querySelectorAll('.auth-input').forEach(i => i.classList.remove('has-error'));
  document.querySelectorAll('.auth-field-error').forEach(e => { e.classList.remove('show'); e.innerHTML = ''; });
}

function setLoading(btnId, on) {
  const btn = document.getElementById(btnId);
  if (btn) btn.classList.toggle('loading', on);
}

function togglePw(id, btn) {
  const inp = document.getElementById(id);
  const ic  = btn.querySelector('i');
  if (inp.type === 'password') { inp.type = 'text'; ic.className = 'fa-solid fa-eye-slash'; }
  else                         { inp.type = 'password'; ic.className = 'fa-solid fa-eye'; }
}

function validateEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

// ── Password strength ─────────────────────────────────────────
function _checkStrength(pw, barIds, labelId) {
  const bars  = barIds.map(id => document.getElementById(id));
  const label = document.getElementById(labelId);
  if (!label) return;

  bars.forEach(b => { if (b) b.className = 'pw-bar'; });
  label.textContent = '';
  label.style.color = '';
  if (!pw) return;

  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  score = Math.min(score, 3);

  const levels = [
    { cls: 'weak',   color: '#ef4444', text: 'Weak',   fill: 1 },
    { cls: 'medium', color: '#f59e0b', text: 'Fair',   fill: 2 },
    { cls: 'good',   color: '#22c55e', text: 'Good',   fill: 3 },
    { cls: 'strong', color: '#10b981', text: 'Strong', fill: 4 },
  ];

  const lvl = levels[score];
  for (let i = 0; i < lvl.fill && i < bars.length; i++) {
    if (bars[i]) bars[i].classList.add(lvl.cls);
  }
  label.textContent  = lvl.text;
  label.style.color  = lvl.color;
}

function checkStrength(pw)  { _checkStrength(pw, ['pwBar1','pwBar2','pwBar3','pwBar4'], 'pwLabel'); }
function checkStrength2(pw) { _checkStrength(pw, ['pwBar1b','pwBar2b','pwBar3b','pwBar4b'], 'pwLabel2'); }

// ── Storage ───────────────────────────────────────────────────
function getLocalUsers() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function saveLocalUsers(u) { localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); }
function getSession()    { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } }
function saveSession(u)  { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
function clearSession()  { localStorage.removeItem(SESSION_KEY); }

function getProfiles() { try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {}; } catch { return {}; } }
function saveProfiles(p) { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }

function getProfile(username) {
  return getProfiles()[username] || { displayName: '', bio: '', avatar: '', banner: '' };
}
function saveProfile(username, data) {
  const p = getProfiles();
  p[username] = { ...getProfile(username), ...data };
  saveProfiles(p);
}

// ── API ───────────────────────────────────────────────────────
async function apiValidate(username, password) {
  try {
    const res = await fetch(WORKER_URL + '/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-App-Token': APP_TOKEN },
      body: JSON.stringify({ username, password }),
    });
    return await res.json();
  } catch { return { valid: false, offline: true }; }
}

// ── Forgot password ───────────────────────────────────────────
function forgotPassword() {
  toast('Password reset is handled via Discord support.', 'info', 4500);
}

// ── LOGIN ─────────────────────────────────────────────────────
async function handleLogin(e) {
  e.preventDefault();
  clearAllErrors();

  const userVal = document.getElementById('loginUser').value.trim();
  const passVal = document.getElementById('loginPass').value;
  let ok = true;

  if (!userVal) ok = setFieldError('loginUser', 'loginUserErr', 'Please enter your username or email') && ok;
  if (!passVal) ok = setFieldError('loginPass', 'loginPassErr', 'Please enter your password') && ok;
  if (!ok) return;

  setLoading('loginBtn', true);

  // 1. Try Cloudflare Worker
  const result = await apiValidate(userVal, passVal);

  if (result.valid) {
    const session = {
      username: result.username, email: result.email,
      since: result.since, plan: result.plan || 'Free',
      key: result.key || '', isWorkerUser: true
    };
    saveSession(session);
    setLoading('loginBtn', false);
    toast(`Welcome back, ${session.username}! 👑`, 'success');
    showProfile(session);
    return;
  }

  // 2. Offline fallback
  if (result.offline) {
    const users = getLocalUsers();
    const hash  = await sha256(passVal);
    const user  = users.find(u =>
      (u.username.toLowerCase() === userVal.toLowerCase() ||
       (u.email||'').toLowerCase() === userVal.toLowerCase()) &&
      (u.passwordHash === hash || u.password === passVal)
    );
    if (user) {
      const session = { username: user.username, email: user.email, since: user.since, plan: user.plan || 'Free', key: '' };
      saveSession(session);
      setLoading('loginBtn', false);
      toast(`Welcome back, ${user.username}! (offline mode)`, 'success');
      showProfile(session);
      return;
    }
  }

  setLoading('loginBtn', false);
  setFieldError('loginUser', 'loginUserErr', result.error || 'Invalid username/email or password');
  setFieldError('loginPass', 'loginPassErr', ' ');
  toast('Login failed. Check your credentials.', 'error');
}

// ── REGISTER ──────────────────────────────────────────────────
async function handleRegister(e) {
  e.preventDefault();
  clearAllErrors();

  const username = document.getElementById('regUser').value.trim();
  const email    = document.getElementById('regEmail').value.trim();
  const pass     = document.getElementById('regPass').value;
  const passConf = document.getElementById('regPassConf').value;
  let ok = true;

  if (!username || username.length < 3)
    ok = setFieldError('regUser', 'regUserErr', 'Username must be at least 3 characters') && ok;
  else if (!/^[a-zA-Z0-9_]+$/.test(username))
    ok = setFieldError('regUser', 'regUserErr', 'Only letters, numbers, and underscores') && ok;

  if (!email || !validateEmail(email))
    ok = setFieldError('regEmail', 'regEmailErr', 'Please enter a valid email address') && ok;

  if (!pass || pass.length < 6)
    ok = setFieldError('regPass', 'regPassErr', 'Password must be at least 6 characters') && ok;

  if (pass !== passConf)
    ok = setFieldError('regPassConf', 'regPassConfErr', 'Passwords do not match') && ok;

  if (!ok) return;

  setLoading('registerBtn', true);

  // Check duplicates
  const users = getLocalUsers();
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    setLoading('registerBtn', false);
    return setFieldError('regUser', 'regUserErr', 'Username is already taken') && toast('Username already exists.', 'error');
  }
  if (users.find(u => (u.email||'').toLowerCase() === email.toLowerCase())) {
    setLoading('registerBtn', false);
    return setFieldError('regEmail', 'regEmailErr', 'Email already registered') && toast('Email already exists.', 'error');
  }

  await new Promise(r => setTimeout(r, 800));

  const hash  = await sha256(pass);
  const since = new Date().toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  users.push({ username, email, passwordHash: hash, since, plan: 'Free' });
  saveLocalUsers(users);

  const session = { username, email, since, plan: 'Free', key: '' };
  saveSession(session);

  setLoading('registerBtn', false);
  toast(`Account created! Welcome, ${username}! 🎉`, 'success', 4000);
  showProfile(session);
}

// ── PROFILE ───────────────────────────────────────────────────
function showProfile(session) {
  const profile = getProfile(session.username);

  // Switch views
  document.getElementById('viewAuth').style.display    = 'none';
  document.getElementById('viewProfile').style.display = 'flex';
  document.getElementById('viewProfile').style.flexDirection = 'column';
  document.getElementById('siteFooter').style.display  = 'flex';

  // Plan badge color
  const planColors = {
    'Sapphire': 'linear-gradient(135deg,#06b6d4,#3b82f6)',
    'Pro':      'linear-gradient(135deg,#f59e0b,#f97316)',
    'Free':     'linear-gradient(135deg,#6366f1,#818cf8)',
  };
  const planBadge = document.getElementById('profAvatarBadge');
  const planBadge2 = document.getElementById('profPlanBadge');
  const planColor = planColors[session.plan] || planColors.Free;

  if (planBadge2) {
    planBadge2.textContent = session.plan;
    planBadge2.style.background = planColor;
  }

  // Display name
  const displayName = profile.displayName || session.username;
  document.getElementById('profDisplayName').textContent = displayName;
  document.getElementById('profUsername').textContent    = '@' + session.username;

  // Plan badge (in badges row)
  const planBadgeEl = document.getElementById('profBadgePlan');
  if (planBadgeEl) {
    planBadgeEl.textContent = session.plan;
    planBadgeEl.style.background = planColors[session.plan]
      ? `${planColor.replace('linear-gradient(135deg,','rgba(').split(',')[0]})`.replace('rgba(','').split(')')[0]
      : '';
  }

  // Stats
  document.getElementById('profSince').textContent    = session.since || '—';
  document.getElementById('profPlanStat').textContent = session.plan  || 'Free';
  document.getElementById('profStatus').textContent   = 'Active';

  // Overview
  document.getElementById('overviewEmail').textContent = session.email || '—';
  document.getElementById('overviewPlan').textContent  = session.plan  || 'Free';
  document.getElementById('overviewSince').textContent = session.since || '—';
  document.getElementById('overviewKey').textContent   = session.key   || 'N/A';

  // Bio
  document.getElementById('profBioText').textContent = profile.bio || 'No bio set. Tell the world about yourself!';

  // Avatar
  if (profile.avatar) {
    document.getElementById('profAvatarImg').src = profile.avatar;
    document.getElementById('profAvatarImg').style.display = 'block';
    document.getElementById('profAvatarIcon').style.display = 'none';
  } else {
    document.getElementById('profAvatarImg').style.display = 'none';
    document.getElementById('profAvatarIcon').style.display = '';
  }

  // Banner
  applyBanner(profile.banner);

  // Settings fields
  document.getElementById('settingsDisplayName').value = displayName;
  document.getElementById('settingsUsername').value    = session.username;
  document.getElementById('settingsEmail').value       = session.email || '';

  // Hide username change for Worker users
  const session_ = getSession();
  if (session_ && session_.isWorkerUser) {
    const hint = document.getElementById('usernameHint');
    if (hint) hint.textContent = 'Contact support via Discord to change your username.';
    document.getElementById('settingsUsername').disabled = true;
  }
}

function applyBanner(src) {
  const banner = document.getElementById('profBanner');
  if (!banner) return;
  if (src) {
    banner.style.backgroundImage = `url('${src}')`;
    banner.style.backgroundSize  = 'cover';
    banner.style.backgroundPosition = 'center';
  } else {
    banner.style.backgroundImage = '';
  }
}

// ── Name edit ─────────────────────────────────────────────────
function toggleNameEdit() {
  const wrap = document.getElementById('nameEditWrap');
  const btn  = document.getElementById('editNameBtn');
  const isHidden = wrap.style.display === 'none';

  wrap.style.display = isHidden ? 'flex' : 'none';
  btn.style.display  = isHidden ? 'none' : '';

  if (isHidden) {
    const inp = document.getElementById('nameEditInput');
    inp.value = document.getElementById('profDisplayName').textContent;
    inp.focus();
  }
}

function saveDisplayName() {
  const val = document.getElementById('nameEditInput').value.trim();
  if (!val) { toast('Display name cannot be empty.', 'error'); return; }
  if (val.length > 30) { toast('Max 30 characters.', 'error'); return; }

  const session = getSession();
  if (!session) return;
  saveProfile(session.username, { displayName: val });
  document.getElementById('profDisplayName').textContent = val;
  document.getElementById('settingsDisplayName').value   = val;
  toggleNameEdit();
  toast('Display name updated!', 'success');
}

function cancelNameEdit() { toggleNameEdit(); }

// ── Bio edit ──────────────────────────────────────────────────
function toggleBioEdit() {
  const editWrap   = document.getElementById('bioEditWrap');
  const displayWrap = document.getElementById('bioDisplay');
  const isEdit = editWrap.style.display !== 'none';

  editWrap.style.display   = isEdit ? 'none' : 'block';
  displayWrap.style.display = isEdit ? 'block' : 'none';

  if (!isEdit) {
    const inp = document.getElementById('bioInput');
    const cur = document.getElementById('profBioText').textContent;
    inp.value = (cur === 'No bio set. Tell the world about yourself!') ? '' : cur;
    updateBioCount();
    inp.focus();
  }
}

function updateBioCount() {
  const val = document.getElementById('bioInput').value;
  document.getElementById('bioCount').textContent = val.length + '/200';
}

document.addEventListener('DOMContentLoaded', () => {
  const bioInput = document.getElementById('bioInput');
  if (bioInput) bioInput.addEventListener('input', updateBioCount);
});

function saveBio() {
  const val = document.getElementById('bioInput').value.trim();
  const session = getSession();
  if (!session) return;
  saveProfile(session.username, { bio: val });
  document.getElementById('profBioText').textContent = val || 'No bio set. Tell the world about yourself!';
  toggleBioEdit();
  toast('Bio updated!', 'success');
}

function cancelBioEdit() { toggleBioEdit(); }

// ── Profile tabs ──────────────────────────────────────────────
function switchProfTab(name, btn) {
  document.querySelectorAll('.prof-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const map = { overview: 'tabOverview', settings: 'tabSettings' };
  Object.values(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const target = document.getElementById(map[name]);
  if (target) target.style.display = 'block';
}

// ── Avatar upload ─────────────────────────────────────────────
function uploadAvatar(input) {
  const file = input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { toast('Please select an image file.', 'error'); return; }
  if (file.size > 5 * 1024 * 1024) { toast('Image must be under 5MB.', 'error'); return; }

  const reader = new FileReader();
  reader.onload = e => {
    const src = e.target.result;
    const session = getSession();
    if (!session) return;
    saveProfile(session.username, { avatar: src });

    const img  = document.getElementById('profAvatarImg');
    const icon = document.getElementById('profAvatarIcon');
    img.src = src; img.style.display = 'block';
    icon.style.display = 'none';
    toast('Avatar updated!', 'success');
  };
  reader.readAsDataURL(file);
  input.value = '';
}

// ── Banner upload ─────────────────────────────────────────────
function uploadBanner(input) {
  const file = input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { toast('Please select an image file.', 'error'); return; }
  if (file.size > 8 * 1024 * 1024) { toast('Image must be under 8MB.', 'error'); return; }

  const reader = new FileReader();
  reader.onload = e => {
    const src = e.target.result;
    const session = getSession();
    if (!session) return;
    saveProfile(session.username, { banner: src });
    applyBanner(src);
    toast('Banner updated!', 'success');
  };
  reader.readAsDataURL(file);
  input.value = '';
}

// ── Settings save ─────────────────────────────────────────────
async function saveSettingsField(field) {
  const session = getSession();
  if (!session) return;

  if (field === 'displayName') {
    const val = document.getElementById('settingsDisplayName').value.trim();
    if (!val) { toast('Display name cannot be empty.', 'error'); return; }
    if (val.length > 30) { toast('Max 30 characters.', 'error'); return; }
    saveProfile(session.username, { displayName: val });
    document.getElementById('profDisplayName').textContent = val;
    toast('Display name updated!', 'success');
    return;
  }

  if (field === 'username') {
    if (session.isWorkerUser) { toast('Contact Discord support to change your username.', 'info'); return; }
    const val = document.getElementById('settingsUsername').value.trim();
    if (!val || val.length < 3) { toast('Username must be at least 3 characters.', 'error'); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(val)) { toast('Only letters, numbers, and underscores allowed.', 'error'); return; }
    if (val === session.username) { toast('That\'s already your username!', 'info'); return; }

    const users = getLocalUsers();
    if (users.find(u => u.username.toLowerCase() === val.toLowerCase())) {
      toast('Username is already taken.', 'error'); return;
    }

    // Update in users array
    const idx = users.findIndex(u => u.username === session.username);
    if (idx === -1) { toast('Account not found locally.', 'error'); return; }
    users[idx].username = val;
    saveLocalUsers(users);

    // Migrate profile data
    const profiles = getProfiles();
    if (profiles[session.username]) {
      profiles[val] = profiles[session.username];
      delete profiles[session.username];
      saveProfiles(profiles);
    }

    // Update session
    session.username = val;
    saveSession(session);

    document.getElementById('profUsername').textContent    = '@' + val;
    document.getElementById('profDisplayName').textContent = getProfile(val).displayName || val;
    toast('Username changed to @' + val + '!', 'success');
    return;
  }

  if (field === 'email') {
    if (session.isWorkerUser) { toast('Contact Discord support to change your email.', 'info'); return; }
    const val = document.getElementById('settingsEmail').value.trim();
    if (!validateEmail(val)) { toast('Please enter a valid email.', 'error'); return; }
    if (val === session.email) { toast('That\'s already your email!', 'info'); return; }

    const users = getLocalUsers();
    if (users.find(u => (u.email||'').toLowerCase() === val.toLowerCase() && u.username !== session.username)) {
      toast('Email already in use.', 'error'); return;
    }
    const idx = users.findIndex(u => u.username === session.username);
    if (idx !== -1) { users[idx].email = val; saveLocalUsers(users); }
    session.email = val;
    saveSession(session);
    document.getElementById('overviewEmail').textContent = val;
    toast('Email updated!', 'success');
    return;
  }

  if (field === 'password') {
    if (session.isWorkerUser) { toast('Contact Discord support to change your password.', 'info'); return; }

    const curPass  = document.getElementById('currentPass').value;
    const newPass  = document.getElementById('newPass').value;
    const confPass = document.getElementById('confirmPass').value;

    if (!curPass) { toast('Please enter your current password.', 'error'); return; }
    if (!newPass || newPass.length < 6) { toast('New password must be at least 6 characters.', 'error'); return; }
    if (newPass !== confPass) { toast('Passwords do not match.', 'error'); return; }

    const users   = getLocalUsers();
    const curHash = await sha256(curPass);
    const idx     = users.findIndex(u => u.username === session.username);

    if (idx === -1 || users[idx].passwordHash !== curHash) {
      toast('Current password is incorrect.', 'error'); return;
    }

    const newHash = await sha256(newPass);
    users[idx].passwordHash = newHash;
    saveLocalUsers(users);

    document.getElementById('currentPass').value = '';
    document.getElementById('newPass').value     = '';
    document.getElementById('confirmPass').value = '';
    checkStrength2('');
    toast('Password changed successfully!', 'success');
    return;
  }
}

// ── Danger zone ───────────────────────────────────────────────
function clearLocalData() {
  if (!confirm('This will clear all locally stored data including your profile. Continue?')) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PROFILE_KEY);
  clearSession();
  toast('Local data cleared. Redirecting…', 'info');
  setTimeout(() => location.reload(), 1500);
}

// ── Logout ────────────────────────────────────────────────────
function logout() {
  clearSession();
  document.getElementById('viewProfile').style.display = 'none';
  document.getElementById('viewAuth').style.display    = 'flex';
  switchTab('login');
  toast('Signed out successfully.', 'info');
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Position tab indicator
  const activeTab = document.querySelector('.auth-tab.active');
  if (activeTab) requestAnimationFrame(() => positionIndicator(activeTab));

  // Restore session
  const session = getSession();
  if (session) {
    document.getElementById('viewAuth').style.display    = 'none';
    document.getElementById('viewProfile').style.display = 'flex';
    showProfile(session);
    return;
  }

  // Pending tab from navbar
  const pending = sessionStorage.getItem('authTab');
  if (pending) {
    sessionStorage.removeItem('authTab');
    switchTab(pending);
  }
});

/* ===== Overlord Auth System — login.js ===== */

// ── Cursor ──────────────────────────────────────────────
(function initCursor() {
  const cur = document.createElement('div');
  cur.className = 'cursor';
  document.body.appendChild(cur);

  const rng = document.createElement('div');
  rng.className = 'cursor-ring';
  document.body.appendChild(rng);

  let mx = 0, my = 0, rx = 0, ry = 0, visible = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!visible) { visible = true; cur.style.opacity = '1'; rng.style.opacity = '1'; }
  }, { passive: true });

  document.addEventListener('mouseleave', () => { cur.style.opacity = '0'; rng.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cur.style.opacity = '1'; rng.style.opacity = '1'; });

  (function loop() {
    cur.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
    rng.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(loop);
  })();

  window.hoverCursor = function(el) {
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
  };
})();

// ── Hamburger ────────────────────────────────────────────
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
if (ham) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
  hoverCursor(ham);
}

// ── Scroll nav effect ────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Storage helpers ──────────────────────────────────────
const STORAGE_KEY = 'overlord_users';
const SESSION_KEY = 'overlord_session';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
}

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ── Toast ────────────────────────────────────────────────
function toast(msg, type = 'info', duration = 3200) {
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
  const container = document.getElementById('toastContainer');

  const el = document.createElement('div');
  el.className = `auth-toast ${type}`;
  el.innerHTML = `<i class="fa-solid ${icons[type]}"></i> ${msg}`;
  container.appendChild(el);

  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));

  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

// ── Tab switching ─────────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

  document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
  document.getElementById('form' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');

  clearAllErrors();
}

// ── Helpers ──────────────────────────────────────────────
function setError(fieldId, errId, msg) {
  const input = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  if (msg) {
    input && input.classList.add('error');
    if (err) { err.querySelector('span').textContent = msg; err.classList.add('show'); }
    return false;
  } else {
    input && input.classList.remove('error');
    if (err) err.classList.remove('show');
    return true;
  }
}

function clearAllErrors() {
  document.querySelectorAll('.auth-input').forEach(i => i.classList.remove('error'));
  document.querySelectorAll('.auth-field-error').forEach(e => e.classList.remove('show'));
}

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (loading) btn.classList.add('loading');
  else         btn.classList.remove('loading');
}

function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa-solid fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa-solid fa-eye';
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Password strength ─────────────────────────────────────
function checkStrength(pw) {
  const bars  = [document.getElementById('bar1'), document.getElementById('bar2'), document.getElementById('bar3')];
  const label = document.getElementById('pwLabel');

  bars.forEach(b => b.className = 'pw-bar');
  label.style.color = '';
  label.textContent = '';
  if (!pw) return;

  let score = 0;
  if (pw.length >= 8)                          score++;
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw))   score++;
  if (/[^A-Za-z0-9]/.test(pw) && pw.length >= 10) score++;

  const levels = [
    { cls: 'weak',   color: '#e05555', text: 'Weak' },
    { cls: 'medium', color: '#f0b429', text: 'Medium' },
    { cls: 'strong', color: '#2ecc7a', text: 'Strong' },
  ];

  for (let i = 0; i <= score && i < bars.length; i++) {
    bars[i].classList.add(levels[score].cls);
  }

  label.textContent = levels[score].text;
  label.style.color = levels[score].color;
}

// ── LOGIN ─────────────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  clearAllErrors();

  const userVal = document.getElementById('loginUser').value.trim();
  const passVal = document.getElementById('loginPass').value;
  let ok = true;

  if (!userVal) ok = setError('loginUser', 'loginUserErr', 'Please enter your username or email') && ok;
  if (!passVal) ok = setError('loginPass', 'loginPassErr', 'Please enter your password') && ok;
  if (!ok) return;

  setLoading('loginBtn', true);

  setTimeout(() => {
    const users = getUsers();
    const user  = users.find(u =>
      (u.username.toLowerCase() === userVal.toLowerCase() ||
       u.email.toLowerCase()    === userVal.toLowerCase()) &&
      u.password === passVal
    );

    if (!user) {
      setLoading('loginBtn', false);
      setError('loginUser', 'loginUserErr', 'Invalid username/email or password');
      setError('loginPass', 'loginPassErr', ' ');
      toast('Login failed. Check your credentials.', 'error');
      return;
    }

    const session = { username: user.username, email: user.email, since: user.since, plan: user.plan || 'Free' };
    saveSession(session);
    toast(`Welcome back, ${user.username}! 👑`, 'success');

    setTimeout(() => {
      setLoading('loginBtn', false);
      showDashboard(session);
    }, 600);
  }, 900);
}

// ── REGISTER ──────────────────────────────────────────────
function handleRegister(e) {
  e.preventDefault();
  clearAllErrors();

  const username = document.getElementById('regUser').value.trim();
  const email    = document.getElementById('regEmail').value.trim();
  const pass     = document.getElementById('regPass').value;
  const passConf = document.getElementById('regPassConf').value;
  let ok = true;

  if (!username || username.length < 3)
    ok = setError('regUser', 'regUserErr', 'Username must be at least 3 characters') && ok;
  else if (!/^[a-zA-Z0-9_]+$/.test(username))
    ok = setError('regUser', 'regUserErr', 'Only letters, numbers, and underscores allowed') && ok;

  if (!email || !validateEmail(email))
    ok = setError('regEmail', 'regEmailErr', 'Please enter a valid email address') && ok;

  if (!pass || pass.length < 6)
    ok = setError('regPass', 'regPassErr', 'Password must be at least 6 characters') && ok;

  if (pass !== passConf)
    ok = setError('regPassConf', 'regPassConfErr', 'Passwords do not match') && ok;

  if (!ok) return;

  setLoading('registerBtn', true);

  setTimeout(() => {
    const users = getUsers();

    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      setLoading('registerBtn', false);
      setError('regUser', 'regUserErr', 'Username is already taken');
      toast('Username already exists.', 'error');
      return;
    }

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setLoading('registerBtn', false);
      setError('regEmail', 'regEmailErr', 'An account with this email already exists');
      toast('Email already registered.', 'error');
      return;
    }

    const since = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const newUser = { username, email, password: pass, since, plan: 'Free' };
    users.push(newUser);
    saveUsers(users);

    const session = { username, email, since, plan: 'Free' };
    saveSession(session);

    toast(`Account created! Welcome, ${username}! 🎉`, 'success', 4000);

    setTimeout(() => {
      setLoading('registerBtn', false);
      showDashboard(session);
    }, 700);
  }, 1000);
}

// ── DASHBOARD ─────────────────────────────────────────────
function showDashboard(user) {
  document.querySelectorAll('.auth-tabs, .auth-body .auth-form').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.auth-tabs').forEach(el => el.style.display = 'none');

  const dash = document.getElementById('dashView');
  dash.classList.add('active');

  document.getElementById('dashName').textContent  = user.username;
  document.getElementById('dashEmail').textContent = user.email;
  document.getElementById('dashSince').textContent = user.since;
  document.getElementById('dashPlan').textContent  = user.plan || 'Free';

  // Apply hover to logout btn
  hoverCursor(document.querySelector('.dash-logout'));
}

function logout() {
  clearSession();
  toast('Signed out successfully.', 'info');

  const dash = document.getElementById('dashView');
  dash.classList.remove('active');

  document.querySelectorAll('.auth-tabs').forEach(el => el.style.display = '');
  document.getElementById('formLogin').style.display   = '';
  document.getElementById('formRegister').style.display = '';

  switchTab('login');
}

// ── Forgot password (placeholder) ────────────────────────
function forgotPassword(e) {
  e.preventDefault();
  toast('Password reset is handled via Discord support.', 'info', 4500);
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply hover cursor to interactive elements
  document.querySelectorAll('.auth-tab, .auth-submit, .auth-forgot, .input-toggle, .dash-logout, .nav-links a').forEach(hoverCursor);

  // Check existing session
  const session = getSession();
  if (session) {
    showDashboard(session);
    return;
  }

  // Auto-switch to register tab if nav Register was clicked
  const pendingTab = sessionStorage.getItem('authTab');
  if (pendingTab) {
    sessionStorage.removeItem('authTab');
    switchTab(pendingTab);
  }
});

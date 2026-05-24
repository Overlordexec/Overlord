// ============================================================
//  Overlord Auth — Cloudflare Worker
//  Deploy tại: https://workers.cloudflare.com (miễn phí)
//  URL sau khi deploy: https://overlord-auth.YOUR_NAME.workers.dev
// ============================================================

// ── Account database (lưu trong Worker, không public) ────────
// Thêm tài khoản mới vào đây rồi re-deploy
const ACCOUNTS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@overlord.com',
    // SHA-256 của "Admin@2026"
    passwordHash: 'a36aef5a11c4073fbe60314fc9df530a9d5f986533594d1f5190742ff9e0e408',
    plan: 'Sapphire',
    key: 'OVL-SAPH-0001-E835D8',
    since: 'May 24, 2026',
    active: true,
  },
  {
    id: '2',
    username: 'testuser',
    email: 'test@gmail.com',
    // SHA-256 của "Test@123"
    passwordHash: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
    plan: 'Pro',
    key: 'OVL-PRO-0002-DD41F3',
    since: 'May 24, 2026',
    active: true,
  },
  {
    id: '3',
    username: 'freeuser',
    email: 'free@gmail.com',
    // SHA-256 của "Free@123"
    passwordHash: '462e06ea5a123bdb2db791dc1732e1956aa596472bb39bc89645bd1b6963ed9e',
    plan: 'Free',
    key: 'OVL-FREE-0003-79478A',
    since: 'May 24, 2026',
    active: true,
  },
];

// ── Rate limiting (chống brute force) ────────────────────────
const RATE_LIMIT = new Map(); // ip → {count, resetAt}
const MAX_ATTEMPTS = 10;      // max 10 lần/phút mỗi IP
const WINDOW_MS = 60_000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || now > entry.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

// ── SHA-256 helper ────────────────────────────────────────────
async function sha256(text) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── CORS headers ──────────────────────────────────────────────
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-App-Token',
  'Content-Type': 'application/json',
};

// ── App secret token (thêm vào header request từ app) ─────────
// App phải gửi header: X-App-Token: OVERLORD_SECRET_2026
const APP_TOKEN = 'OVERLORD_SECRET_2026';

// ── Main handler ──────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);

    // ── Route: POST /validate  (username + password) ──────────
    if (url.pathname === '/validate' && request.method === 'POST') {
      return handleValidate(request);
    }

    // ── Route: POST /validate-key  (key only) ─────────────────
    if (url.pathname === '/validate-key' && request.method === 'POST') {
      return handleValidateKey(request);
    }

    // ── Route: GET /ping  (health check) ──────────────────────
    if (url.pathname === '/ping') {
      return new Response(JSON.stringify({ status: 'ok', service: 'Overlord Auth' }), {
        headers: CORS,
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404, headers: CORS,
    });
  },
};

// ── /validate ─────────────────────────────────────────────────
async function handleValidate(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // Rate limit check
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({
      valid: false,
      error: 'Too many attempts. Try again in 1 minute.',
    }), { status: 429, headers: CORS });
  }

  // App token check
  const token = request.headers.get('X-App-Token');
  if (token !== APP_TOKEN) {
    return new Response(JSON.stringify({
      valid: false,
      error: 'Unauthorized app.',
    }), { status: 401, headers: CORS });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ valid: false, error: 'Invalid JSON' }), {
      status: 400, headers: CORS,
    });
  }

  const { username, password } = body;
  if (!username || !password) {
    return new Response(JSON.stringify({ valid: false, error: 'Missing fields' }), {
      status: 400, headers: CORS,
    });
  }

  // Hash the incoming password
  const hash = await sha256(password);

  // Find account
  const acc = ACCOUNTS.find(a =>
    a.username.toLowerCase() === username.toLowerCase() &&
    a.passwordHash === hash &&
    a.active === true
  );

  if (!acc) {
    // Fake delay để chống timing attack
    await new Promise(r => setTimeout(r, 200 + Math.random() * 100));
    return new Response(JSON.stringify({ valid: false, error: 'Invalid credentials' }), {
      status: 401, headers: CORS,
    });
  }

  return new Response(JSON.stringify({
    valid: true,
    username: acc.username,
    email: acc.email,
    plan: acc.plan,
    key: acc.key,
    since: acc.since,
  }), { headers: CORS });
}

// ── /validate-key ─────────────────────────────────────────────
async function handleValidateKey(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({
      valid: false, error: 'Too many attempts.',
    }), { status: 429, headers: CORS });
  }

  const token = request.headers.get('X-App-Token');
  if (token !== APP_TOKEN) {
    return new Response(JSON.stringify({
      valid: false, error: 'Unauthorized app.',
    }), { status: 401, headers: CORS });
  }

  let body;
  try { body = await request.json(); }
  catch {
    return new Response(JSON.stringify({ valid: false, error: 'Invalid JSON' }), {
      status: 400, headers: CORS,
    });
  }

  const { key } = body;
  if (!key) {
    return new Response(JSON.stringify({ valid: false, error: 'Missing key' }), {
      status: 400, headers: CORS,
    });
  }

  const acc = ACCOUNTS.find(a => a.key === key && a.active === true);

  if (!acc) {
    return new Response(JSON.stringify({ valid: false, error: 'Invalid key' }), {
      status: 401, headers: CORS,
    });
  }

  return new Response(JSON.stringify({
    valid: true,
    username: acc.username,
    plan: acc.plan,
    since: acc.since,
  }), { headers: CORS });
}

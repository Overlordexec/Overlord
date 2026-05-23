const faqData = [
    {
        tags: 'crash won\'t start launch open startup',
        question: 'Overlord won\'t launch or crashes on startup',
        answer: `This is almost always caused by a missing runtime. Install all Required Downloads, especially <strong>.NET 9.0</strong> and the <strong>Visual C++ Redistributable</strong>. After installing, restart your PC and try again. Try right-clicking Overlord.exe and selecting <strong>Run as administrator</strong> â€” this resolves most launch failures.`,
        tip: 'Always restart your PC after installing runtimes for changes to take effect.'
    },
{
    tags: 'antivirus false positive windows defender detected virus malware',
    question: 'My antivirus is flagging Overlord as a virus',
    answer: `This is a <strong>false positive</strong>. Executors interact with game memory at a low level, which antivirus software often flags incorrectly. Overlord is safe and virus-free. Add Overlord to your antivirus exclusions to resolve this. Windows Defender: Settings â†’ Windows Security â†’ Virus & Threat Protection â†’ Exclusions â†’ Add an exclusion â†’ Folder â†’ select the Overlord folder.`,
    tip: 'Exclude the entire Overlord folder, not just the .exe file, for best results.'
},
{
    tags: 'key system bypass get daily how does work',
    question: 'How does the key system work?',
    answer: `Free users complete a key link once every <strong>40 hours</strong>. Click "Get Key" inside Overlord and complete the short process. Upgrading to <strong>Pro or Sapphire</strong> removes the key system entirely â€” keyless forever.`,
    tip: 'Premium users never have to deal with keys again, making it worth the investment if you use Overlord regularly.'
},
{
    tags: 'inject attach not working roblox game failed',
    question: 'Overlord isn\'t injecting or attaching',
    answer: `Make sure the game is <strong>fully loaded</strong> before pressing inject. If it still fails: (1) Restart both apps, (2) Run as Administrator, (3) Temporarily disable antivirus, (4) Ensure Windows is up to date, (5) Reinstall from the Download page.`,
    tip: 'Wait for the chat to appear and game assets to fully load before attempting to inject.'
},
{
    tags: 'script not working execute error lua broken',
    question: 'A script isn\'t working or throws an error',
    answer: `Not all scripts are compatible with every executor. The script may be outdated or require UNC functions not yet supported. Overlord covers 90% UNC â€” if a script fails it's likely the script itself. Try scripts from the built-in Cloud Script browser for guaranteed compatibility.`,
    tip: 'Check the script\'s upload date and comments for compatibility info before executing unknown scripts.'
},
{
    tags: 'banned roblox account safe detected ban',
    question: 'Will I get banned?',
    answer: `No executor can guarantee a 100% ban-free experience. Overlord uses advanced bypass technology but using exploits in any online game always carries risk. We recommend using an alt account. Using exploits violates Roblox's ToS. The Overlord team is not responsible for any account actions taken by Roblox.`,
    tip: 'Always use an alternate account for exploiting to protect your main account.'
},
{
    tags: 'update roblox outdated stopped working new version patch',
    question: 'Overlord stopped working after a Roblox update',
    answer: `Roblox updates can temporarily break executors. We push patches as fast as possible. Check our Discord for current status and download the latest build from the Download page.`,
    tip: 'Join our Discord to get notified instantly when patches are released.'
},
{
    tags: 'premium buy purchase pro sapphire how where',
    question: 'How do I purchase Premium?',
    answer: `To purchase Premium, go to the <strong>Premium</strong> tab on our main website and select your desired plan (Pro or Sapphire). Complete the payment process securely. After sending payment, <strong>take a screenshot of your proof of payment</strong> and open a support ticket in our <a href="https://discord.gg/GuwqncbChx" target="_blank">official Discord server</a> in the <strong>#support</strong> channel. Our team will verify and activate your license within 24 hours.`,
    tip: 'Keep your payment proof screenshot until your license is activated to avoid any delays.'
}
];

function renderFaq(data) {
    const list = document.getElementById('faqList');
    list.innerHTML = '';

    data.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'faq-item';
        el.setAttribute('data-q', item.tags);
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = `opacity 0.35s ease ${index * 0.06}s, transform 0.35s ease ${index * 0.06}s`;

        el.innerHTML = `
        <button class="faq-question" onclick="toggleFaq(this)">
        <div class="faq-question-left">
        <div class="faq-question-num">${String(index + 1).padStart(2, '0')}</div>
        <span>${item.question}</span>
        </div>
        <div class="faq-chevron"><i class="fa-solid fa-chevron-down"></i></div>
        </button>
        <div class="faq-answer">
        <div class="faq-answer-inner">
        <p>${item.answer}</p>
        <div class="faq-tip">
        <div class="faq-tip-icon"><i class="fa-solid fa-lightbulb"></i></div>
        <div><strong>Tip:</strong> ${item.tip}</div>
        </div>
        </div>
        </div>
        `;

        list.appendChild(el);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    });

    document.querySelectorAll('.faq-question').forEach(el => {
        applyHover(el);
    });
}

function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

function faqSearch(q) {
    q = q.toLowerCase().trim();

    if (!q) {
        renderFaq(faqData);
        return;
    }

    const filtered = faqData.filter(item => {
        const haystack = item.tags + ' ' + item.question.toLowerCase() + ' ' + item.answer.toLowerCase();
        return haystack.includes(q);
    });

    const list = document.getElementById('faqList');
    list.innerHTML = '';

    if (filtered.length === 0) {
        list.innerHTML = `
        <div class="faq-empty">
        <i class="fa-solid fa-circle-question"></i>
        <p>No results for "<strong>${q}</strong>"</p>
        <span>Try a different keyword or browse all questions above.</span>
        </div>
        `;
        return;
    }

    renderFaq(filtered);
}

let applyHover = function(el) {};

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

    document.addEventListener('mouseleave', () => {
        cur.style.opacity = '0';
        rng.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cur.style.opacity = '1';
        rng.style.opacity = '1';
    });

    (function loop() {
        cur.style.transform = 'translate(calc(' + mx + 'px - 50%), calc(' + my + 'px - 50%))';
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        rng.style.transform = 'translate(calc(' + rx + 'px - 50%), calc(' + ry + 'px - 50%))';
        requestAnimationFrame(loop);
    })();

    applyHover = function(el) {
        if (!el) return;
        el.addEventListener('mouseenter', function() {
            cur.style.width = '14px';
            cur.style.height = '14px';
            rng.style.width = '46px';
            rng.style.height = '46px';
            rng.style.borderColor = 'rgba(255,255,255,0.55)';
        });
        el.addEventListener('mouseleave', function() {
            cur.style.width = '8px';
            cur.style.height = '8px';
            rng.style.width = '30px';
            rng.style.height = '30px';
            rng.style.borderColor = 'rgba(255,255,255,0.35)';
        });
    };

    document.querySelectorAll('.btn-back, .discord-btn').forEach(applyHover);
}

document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    renderFaq(faqData);

    const ham = document.getElementById('hamburger');
    const mobMenu = document.getElementById('mobileMenu');

    if (ham) {
        ham.addEventListener('click', function() {
            ham.classList.toggle('open');
            mobMenu.classList.toggle('open');
        });
    }

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (ham) ham.classList.remove('open');
            if (mobMenu) mobMenu.classList.remove('open');
        });
    });
});

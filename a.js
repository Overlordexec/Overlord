(function(){
var _0x={};
var __=function(s){return s.split('').reverse().join('');};

var _blk=function(){
document.documentElement.innerHTML='<html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#060606;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Inter,sans-serif}div{text-align:center;color:#fff}.t{font-size:2rem;font-weight:900;letter-spacing:-1px;margin-bottom:.5rem}.s{font-size:.9rem;color:rgba(255,255,255,0.35)}</style></head><body><div><div class=\"t\">Nice try man</div><div class=\"s\">This page is protected.</div></div></body></html>';
};

document.addEventListener('contextmenu',function(e){e.preventDefault();return false;});



var _build=function(){
document.body.innerHTML='';

var cur=document.createElement('div');
cur.className='cursor';
document.body.appendChild(cur);

var rng=document.createElement('div');
rng.className='cursor-ring';
document.body.appendChild(rng);

var tc=document.createElement('div');
tc.className='toast-container';
tc.id='toastContainer';
document.body.appendChild(tc);

var tosOv=document.createElement('div');
tosOv.className='tos-overlay';
tosOv.id='tosOverlay';
tosOv.innerHTML='<div class="tos-modal"><div class="tos-head"><div class="tos-head-left"><div class="tos-head-icon"><i class="fa-solid fa-file-shield"></i></div><div class="tos-head-text"><h2>Terms of Service</h2><p>Please read before downloading</p></div></div><div class="tos-x" id="tosX"><i class="fa-solid fa-xmark"></i></div></div><div class="tos-body"><p class="tos-intro">Please read and accept our terms before downloading Overlord.</p><div class="tos-section"><h3><i class="fa-solid fa-circle-info"></i> About Overlord</h3><p>Overlord is a third-party script executor. By downloading and using this software, you acknowledge that you understand what it does and accept full responsibility for its use. We DO NOT condone the use of "cheating".</p></div><div class="tos-section"><h3><i class="fa-solid fa-ban"></i> Prohibited Use</h3><ul><li>You may not use Overlord to harass, harm, or negatively impact other players.</li><li>You may not use Overlord to exploit in a way that violates any games\' Terms of Service.</li><li>You may not redistribute, resell, or claim Overlord as your own software.</li><li>You may not attempt to reverse-engineer or decompile any part of Overlord.</li><li>You may not use Overlord to generate, spread, or deploy malicious scripts.</li></ul></div><div class="tos-section"><h3><i class="fa-solid fa-scale-balanced"></i> Liability</h3><p>Overlord is provided "as is" without warranty of any kind. The Overlord team is not responsible for any bans, account terminations, or consequences resulting from use of this software. Use at your own risk. Overlord uses a 3rd party ad network called "FileDM". We do not condone any files FileDM might ask you to download. Please decline all offers presented during the FileDM download process.</p></div><div class="tos-section"><h3><i class="fa-solid fa-rotate"></i> Updates &amp; Changes</h3><p>We reserve the right to update these terms at any time. Continued use of Overlord following any changes constitutes acceptance of the new terms.</p></div><div class="tos-section"><h3><i class="fa-solid fa-user-check"></i> Age Requirement</h3><p>You must be at least 13 years of age to use Overlord.</p></div><div class="tos-note"><strong>Roblox Disclaimer:</strong> Overlord is not affiliated with, endorsed by, or connected to Roblox Corporation in any way.</div></div><div class="tos-foot"><div class="tos-toggle" id="tosTgl"><div class="toggle-sw" id="tglSw"></div><span class="tos-toggle-lbl">I accept the Terms of Service</span></div><div class="tos-actions"><button class="tos-dl-btn" id="tosDlBtn" disabled><span class="shimmer"></span><i class="fa-solid fa-download"></i> Download Now</button><button class="tos-dec-btn" id="tosDecBtn"><i class="fa-solid fa-arrow-left"></i> Decline &amp; Go Back</button></div></div></div>';
document.body.appendChild(tosOv);

var pickOv=document.createElement('div');
pickOv.className='pick-overlay';
pickOv.id='pickOverlay';
pickOv.innerHTML='<div class="pick-modal"><div class="pick-head"><div class="pick-head-left"><div class="pick-head-icon"><i class="fa-brands fa-windows"></i></div><div class="pick-head-text"><h2>Choose Product</h2><p>Select what you want to download</p></div></div><div class="pick-x" id="pickX"><i class="fa-solid fa-xmark"></i></div></div><div class="pick-body"><div class="pick-option" id="pickAimboot"><div class="pick-option-icon"><i class="fa-solid fa-crosshairs"></i></div><div class="pick-option-info"><div class="pick-option-name">External Aimboot</div><div class="pick-option-desc">External aimbot for enhanced precision</div></div><i class="fa-solid fa-arrow-right pick-option-arrow"></i></div><div class="pick-option" id="pickExecutor"><div class="pick-option-icon"><i class="fa-solid fa-terminal"></i></div><div class="pick-option-info"><div class="pick-option-name">External Executor</div><div class="pick-option-desc">Script executor for Windows</div></div><i class="fa-solid fa-arrow-right pick-option-arrow"></i></div></div></div>';
document.body.appendChild(pickOv);

var profOv=document.createElement('div');
profOv.className='profile-overlay';
profOv.id='profileOverlay';
profOv.innerHTML='<div class="profile-modal" id="profileModal"><div class="profile-x" id="profileX"><i class="fa-solid fa-xmark"></i></div><div class="profile-top"><div class="profile-av-wrap"><div class="profile-diamond" id="profileDiamond"><img id="profileImg" src="" alt=""><div class="av-fb-lg" id="profileFb" style="display:none;"><i class="fa-solid fa-user"></i></div></div><div class="profile-p-badge" id="profileBadge"></div></div><div class="profile-info"><h2 id="profileName"></h2></div></div><div class="profile-divider" id="profileDiv"></div><div class="profile-body"><div class="profile-lbl">About</div><p class="profile-desc" id="profileDesc"></p></div></div>';
document.body.appendChild(profOv);

var bOv=document.createElement('div');
bOv.className='benefits-page-overlay';
bOv.id='benefitsOverlay';
bOv.innerHTML='<div class="benefits-inner"><button class="benefits-back" id="benefitsBack"><i class="fa-solid fa-arrow-left"></i> Back to Plans</button><div class="benefits-hero" id="benefitsHero"><div class="benefits-platform-badge" id="benefitsPlatformBadge"></div><h1 id="benefitsTitle"></h1><p id="benefitsTagline"></p><div class="benefits-price-block"><span class="benefits-price" id="benefitsPrice"></span><span class="benefits-period" id="benefitsPeriod"></span></div></div><div class="benefits-divider"></div><div class="benefits-features-grid" id="benefitsFeaturesGrid"></div><button class="benefits-buy-btn" id="benefitsBuyBtn"><i class="fa-solid fa-crown"></i> Buy Now <i class="fa-solid fa-arrow-right"></i></button></div>';
document.body.appendChild(bOv);

var coOv=document.createElement('div');
coOv.className='checkout-overlay';
coOv.id='checkoutOverlay';
coOv.innerHTML='<div class="checkout-inner"><button class="checkout-back" id="checkoutBack"><i class="fa-solid fa-arrow-left"></i> Back to Benefits</button><div class="checkout-header" id="checkoutHeader"><div class="checkout-tag"><i class="fa-solid fa-credit-card"></i> Checkout</div><h1>Complete your<br><span class="gradient-text">purchase</span></h1><p>Select your preferred payment method below. After payment, contact us on Discord with your receipt.</p></div><div class="checkout-plan-summary" id="checkoutSummary"><span class="checkout-plan-name" id="checkoutPlanName"></span><span class="checkout-plan-price" id="checkoutPlanPrice"></span></div><div class="payment-methods" id="paymentMethods"></div></div>';
document.body.appendChild(coOv);

var nav=document.createElement('nav');
nav.id='navbar';
nav.innerHTML='<a class="nav-logo" id="navLogo" href="#"><img src="avatar_v1.webp" style="border-radius:6px;width:28px;height:28px;object-fit:contain;" alt="Overlord" class="nav-logo-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"><div class="nav-logo-fallback" style="display:none;width:28px;height:28px;background:#fff;border-radius:6px;align-items:center;justify-content:center;font-size:.75rem;color:#060606;"><i class="fa-solid fa-spider"></i></div>Overlord</a><ul class="nav-links"><li><a href="#" data-page="home" class="active" id="nl-home">Home</a></li><li><a href="#" data-page="download" id="nl-download">Download</a></li><li><a href="#" data-page="premium" id="nl-premium">Premium</a></li><li><a href="#" data-page="credits" id="nl-credits">Credits</a></li><li><a href="faq.html" id="nl-faq">FAQ</a></li><li><a href="login.html" class="nav-auth-btn" style="display:inline-flex;align-items:center;gap:6px;padding:.42rem .95rem;background:linear-gradient(135deg,#5b6ef5 0%,#7b8fff 100%);border-radius:9px;color:#fff;font-size:.8rem;font-weight:700;text-decoration:none;box-shadow:0 2px 12px rgba(91,110,245,0.3);"><i class="fa-solid fa-right-to-bracket"></i> Login</a></li><li><a href="login.html" onclick="sessionStorage.setItem(\'authTab\',\'register\')" class="nav-auth-btn" style="display:inline-flex;align-items:center;gap:6px;padding:.42rem .95rem;background:transparent;border:1px solid rgba(123,143,255,0.45);border-radius:9px;color:#7b8fff;font-size:.8rem;font-weight:700;text-decoration:none;"><i class="fa-solid fa-user-plus"></i> Register</a></li></ul><button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>';document.body.appendChild(nav);

var mob=document.createElement('div');
mob.className='mobile-menu';
mob.id='mobileMenu';
mob.innerHTML='<div class="mobile-menu-inner"><a href="#" id="mm-home"><i class="fa-solid fa-house"></i> Home</a><a href="#" id="mm-dl"><i class="fa-solid fa-download"></i> Download</a><a href="#" id="mm-pr"><i class="fa-solid fa-crown"></i> Premium</a><a href="#" id="mm-cr"><i class="fa-solid fa-star"></i> Credits</a><a href="faq.html" id="mm-faq"><i class="fa-solid fa-circle-question"></i> FAQ</a><a href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a><a href="login.html" onclick="sessionStorage.setItem(\'authTab\',\'register\')"><i class="fa-solid fa-user-plus"></i> Register</a></div>';
document.body.appendChild(mob);

var footer_html='<div class="footer-logo"><img src="avatar_v1.webp" alt="Overlord" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"><div class="footer-logo-fb" style="display:none;"><i class="fa-solid fa-spider"></i></div></div><span class="footer-text"><strong>Overlord</strong></span><div class="footer-dot"></div><span class="footer-text">&copy; 2026 All rights reserved.</span>';

var pH=document.createElement('div');
pH.className='page active';
pH.id='page-home';
pH.innerHTML='<div class="page-content"><section class="hero"><div class="page-bg"></div><div class="grid-bg"></div><div class="hero-badge"><span class="dot"></span>Version 1 \u2014 Now Live</div><h1>Overlord<br><span class="gradient-text">Premium Exploit</span></h1><p>Overlord delivers a blazing-fast, beautifully crafted experience. Designed to push limits and redefine what software feels like.</p><div class="hero-btns"><a href="#" class="btn-primary" id="hb-dl"><span class="shimmer"></span><i class="fa-solid fa-download"></i> Download Free <i class="fa-solid fa-arrow-right bi"></i></a><a href="#" class="btn-secondary" id="hb-pr"><i class="fa-solid fa-crown"></i> Go Premium <i class="fa-solid fa-arrow-right bi"></i></a></div><div class="scroll-hint"><div class="scroll-mouse"></div><span>Scroll</span></div></section><section class="features-section"><div class="section-header"><div class="section-tag"><i class="fa-solid fa-sparkles"></i> Features</div><h2>Everything you need,<br>nothing you don\'t.</h2><p>Handcrafted features that make every interaction feel like magic.</p></div><div class="features-grid"><div class="feature-card" data-delay="0"><div class="spotlight"></div><span class="feature-num">01</span><div class="feature-icon"><i class="fa-solid fa-bolt"></i></div><h3>Lightning Performance</h3><p>Heavily optimised, offering Flawless experience with instant response..</p><div class="feature-bar"><div class="feature-bar-fill"></div></div></div><div class="feature-card" data-delay="80"><div class="spotlight"></div><span class="feature-num">02</span><div class="feature-icon"><i class="fa-solid fa-shield-halved"></i></div><h3>Undetected</h3><p>Built to stay Undetected. your account is safe from Roblox bans.</p><div class="feature-bar"><div class="feature-bar-fill"></div></div></div><div class="feature-card" data-delay="160"><div class="spotlight"></div><span class="feature-num">03</span><div class="feature-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div><h3>Smart Editor</h3><p>Our Editor is Beginner-Friendly. Including many useful feature that helps you in coding several projects.</p><div class="feature-bar"><div class="feature-bar-fill"></div></div></div><div class="feature-card" data-delay="0"><div class="spotlight"></div><span class="feature-num">04</span><div class="feature-icon"><i class="fa-solid fa-palette"></i></div><h3>Flawless Design</h3><p>Every pixel is intentional. Our Developers & Designers put alot of effort into providing a Flawless Finishing.</p><div class="feature-bar"><div class="feature-bar-fill"></div></div></div><div class="feature-card" data-delay="80"><div class="spotlight"></div><span class="feature-num">05</span><div class="feature-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div><h3>Tab-System</h3><p>Our Editor includes a tab-system keeping your code safe.</p><div class="feature-bar"><div class="feature-bar-fill"></div></div></div><div class="feature-card" data-delay="160"><div class="spotlight"></div><span class="feature-num">06</span><div class="feature-icon"><i class="fa-solid fa-plug"></i></div><h3>Smooth Design</h3><p>Our Design,UI,ETC are made with a lot of efforts to bring a Flawless and Smooth design to you in exchange of almost no lag or crash.</p><div class="feature-bar"><div class="feature-bar-fill"></div></div></div></div></section></div><footer class="site-footer">'+footer_html+'</footer>';
document.body.appendChild(pH);

var pD=document.createElement('div');
pD.className='page';
pD.id='page-download';
pD.innerHTML='<div class="download-page"><div class="page-bg"></div><div class="grid-bg"></div><div class="dl-header"><div class="dl-tag"><i class="fa-solid fa-download"></i> Download</div><h1>Get <span class="gradient-text">Overlord</span></h1><p>Choose your platform below to get started. Windows is fully available now.</p></div><div class="dl-grid" id="dlGrid"></div><div class="dl-changelog-btn-wrap"><a href="changelog.html" class="btn-primary"><i class="fa-solid fa-history"></i> View All Changelogs <i class="fa-solid fa-arrow-right"></i></a></div></div><footer class="site-footer">'+footer_html+'</footer>';
document.body.appendChild(pD);

var pP=document.createElement('div');
pP.className='page';
pP.id='page-premium';
pP.innerHTML='<div class="premium-page"><div class="page-bg"></div><div class="grid-bg"></div><div class="prem-header"><div class="prem-tag"><i class="fa-solid fa-crown"></i> Premium</div><h1>Choose your <span class="gradient-text">plan</span></h1><p>Unlock the full power of Overlord. Pick the platform and plan that fits you best.</p></div><div class="platform-switcher" id="platformSwitcher"></div><div class="plans-wrap"><div class="plans-grid" id="plansGrid"></div></div></div><footer class="site-footer">'+footer_html+'</footer>';
document.body.appendChild(pP);

var pC=document.createElement('div');
pC.className='page';
pC.id='page-credits';
pC.innerHTML='<div class="credits-page"><div class="page-bg"></div><div class="grid-bg"></div><div class="credits-header"><div class="credits-tag"><i class="fa-solid fa-users"></i> Credits</div><h1>Meet the <span class="gradient-text">Team</span></h1><p>The people behind Overlord. Every role, every contribution \u2014 acknowledged.</p></div><div id="creditsContainer"></div></div><footer class="site-footer">'+footer_html+'</footer>';
document.body.appendChild(pC);

_init();
};

var _init=function(){
var cur=document.querySelector('.cursor');
var rng=document.querySelector('.cursor-ring');
var mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;},{passive:true});
(function loop(){
cur.style.transform='translate(calc('+mx+'px - 50%), calc('+my+'px - 50%))';
rx+=(mx-rx)*0.1;ry+=(my-ry)*0.1;
rng.style.transform='translate(calc('+rx+'px - 50%), calc('+ry+'px - 50%))';
requestAnimationFrame(loop);
})();

function rHover(el){
if(!el)return;
el.addEventListener('mouseenter',function(){cur.style.width='14px';cur.style.height='14px';rng.style.width='46px';rng.style.height='46px';rng.style.borderColor='rgba(255,255,255,0.55)';});
el.addEventListener('mouseleave',function(){cur.style.width='8px';cur.style.height='8px';rng.style.width='30px';rng.style.height='30px';rng.style.borderColor='rgba(255,255,255,0.35)';});
}

window.addEventListener('scroll',function(){document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>20);},{passive:true});

var ham=document.getElementById('hamburger');
var mob=document.getElementById('mobileMenu');
ham.addEventListener('click',function(){ham.classList.toggle('open');mob.classList.toggle('open');});
function closeMob(){ham.classList.remove('open');mob.classList.remove('open');}

function showPage(name){
document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
document.getElementById('page-'+name).classList.add('active');
document.querySelectorAll('.nav-links a').forEach(function(a){a.classList.toggle('active',a.dataset.page===name);});
window.scrollTo({top:0});
if(name==='home')setTimeout(initFeat,80);
if(name==='download')setTimeout(revealDl,80);
if(name==='credits')setTimeout(revealCredits,80);
if(name==='premium')setTimeout(function(){if(premiumData)switchPlatform(premiumData.platforms[0].id,true);},80);
}

document.getElementById('navLogo').addEventListener('click',function(e){e.preventDefault();showPage('home');});
document.getElementById('nl-home').addEventListener('click',function(e){e.preventDefault();showPage('home');});
document.getElementById('nl-download').addEventListener('click',function(e){e.preventDefault();showPage('download');});
document.getElementById('nl-premium').addEventListener('click',function(e){e.preventDefault();showPage('premium');});
document.getElementById('nl-credits').addEventListener('click',function(e){e.preventDefault();showPage('credits');});
document.getElementById('mm-home').addEventListener('click',function(e){e.preventDefault();showPage('home');closeMob();});
document.getElementById('mm-dl').addEventListener('click',function(e){e.preventDefault();showPage('download');closeMob();});
document.getElementById('mm-pr').addEventListener('click',function(e){e.preventDefault();showPage('premium');closeMob();});
document.getElementById('mm-cr').addEventListener('click',function(e){e.preventDefault();showPage('credits');closeMob();});
document.getElementById('hb-dl').addEventListener('click',function(e){e.preventDefault();showPage('download');});
document.getElementById('hb-pr').addEventListener('click',function(e){e.preventDefault();showPage('premium');});

[ham,document.getElementById('navLogo')].forEach(rHover);
document.querySelectorAll('.nav-links a').forEach(rHover);
document.querySelectorAll('.mobile-menu a').forEach(rHover);
document.querySelectorAll('.btn-primary,.btn-secondary').forEach(rHover);

function initFeat(){
var cards=document.querySelectorAll('.feature-card');
var obs=new IntersectionObserver(function(entries){
entries.forEach(function(e){
if(e.isIntersecting){setTimeout(function(){e.target.classList.add('revealed');},+e.target.dataset.delay||0);obs.unobserve(e.target);}
});
},{threshold:0.1});
cards.forEach(function(c){obs.observe(c);});
}

initFeat();

var spotTick=false;
document.addEventListener('mousemove',function(e){
if(spotTick)return;
spotTick=true;
requestAnimationFrame(function(){
document.querySelectorAll('.feature-card,.dl-card,.member-card,.plan-card,.benefit-item').forEach(function(card){
var r=card.getBoundingClientRect();
if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){
card.style.setProperty('--x',((e.clientX-r.left)/r.width*100)+'%');
card.style.setProperty('--y',((e.clientY-r.top)/r.height*100)+'%');
}
});
spotTick=false;
});
},{passive:true});

function showToast(name,text){
var c=document.getElementById('toastContainer');
var t=document.createElement('div');
t.className='toast';
t.innerHTML='<img src="avatar_v1.webp" class="toast-logo" alt="" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"><div class="toast-logo-fb" style="display:none;"><i class="fa-solid fa-spider"></i></div><div class="toast-content"><span class="toast-title">Overlord</span><span class="toast-msg">'+name+' is '+text+'</span></div>';
c.appendChild(t);
requestAnimationFrame(function(){requestAnimationFrame(function(){t.classList.add('show');});});
setTimeout(function(){t.classList.remove('show');t.classList.add('hide');setTimeout(function(){t.remove();},300);},3500);
}

var dlLink='#',tosOn=false;
var tosOv=document.getElementById('tosOverlay');
var tglSw=document.getElementById('tglSw');
var tosTgl=document.getElementById('tosTgl');
var tosDl=document.getElementById('tosDlBtn');
var tosDec=document.getElementById('tosDecBtn');
var tosX=document.getElementById('tosX');

function openTos(link){dlLink=link;tosOn=false;tglSw.classList.remove('on');tosTgl.classList.remove('on');tosDl.classList.remove('on');tosDl.disabled=true;tosOv.classList.add('active');document.body.style.overflow='hidden';}
function closeTos(){tosOv.classList.remove('active');document.body.style.overflow='';}

tosTgl.addEventListener('click',function(){tosOn=!tosOn;tglSw.classList.toggle('on',tosOn);tosTgl.classList.toggle('on',tosOn);tosDl.classList.toggle('on',tosOn);tosDl.disabled=!tosOn;});
tosDl.addEventListener('click',function(){if(tosOn){window.open(dlLink,'_blank');closeTos();}});
tosDec.addEventListener('click',closeTos);
tosX.addEventListener('click',closeTos);
tosOv.addEventListener('click',function(e){if(e.target===tosOv)closeTos();});
[tosTgl,tosDl,tosDec,tosX].forEach(rHover);

var pickOv=document.getElementById('pickOverlay');
var pickX=document.getElementById('pickX');
var pickAimboot=document.getElementById('pickAimboot');
var pickExecutor=document.getElementById('pickExecutor');
var AIMBOOT_LINK='https://filedm.com/1Efj0';
var EXECUTOR_LINK='https://bstshrt.com/u/overlord';

function openPick(){pickOv.classList.add('active');document.body.style.overflow='hidden';}
function closePick(){pickOv.classList.remove('active');document.body.style.overflow='';}

pickX.addEventListener('click',closePick);
pickOv.addEventListener('click',function(e){if(e.target===pickOv)closePick();});
pickAimboot.addEventListener('click',function(){closePick();openTos(AIMBOOT_LINK);});
pickExecutor.addEventListener('click',function(){closePick();openTos(EXECUTOR_LINK);});
[pickX,pickAimboot,pickExecutor].forEach(rHover);

function revealDl(){
document.querySelectorAll('.dl-card').forEach(function(c,i){setTimeout(function(){c.classList.add('revealed');},i*90);});
document.querySelectorAll('.dl-card').forEach(rHover);
}

fetch('a3s532123421.json').then(function(r){return r.json();}).then(function(data){buildDl(data);}).catch(function(){
buildDl({products:[
{id:'windows',name:'Windows',icon:'fa-brands fa-windows',status:'Online',statusText:'working and ready to download',downloadLink:'#',available:true},
{id:'android',name:'Android',icon:'fa-brands fa-android',status:'Offline',statusText:'currently unavailable. Check back soon',downloadLink:'#',available:false},
{id:'spoofer',name:'Spoofer',icon:'fa-solid fa-bolt',status:'Online',statusText:'lightning-fast hardware spoofer',downloadLink:'#',available:true,type:'spoofer'},
{id:'ios',name:'iOS',icon:'fa-brands fa-apple',status:'Offline',statusText:'not yet supported on this platform',downloadLink:'#',available:false}
]});
});

function buildDl(data){
var grid=document.getElementById('dlGrid');
data.products.forEach(function(p){
var card=document.createElement('div');
card.className='dl-card'+(p.available?'':' unavailable');
card.innerHTML='<div class="spotlight"></div><div class="dl-card-icon"><i class="'+p.icon+'"></i></div><div class="dl-card-name">'+p.name+'</div><div class="dl-card-status"><div class="status-dot '+(p.available?'online':'offline')+'"></div><span class="status-text '+(p.available?'online':'offline')+'">'+p.status+'</span></div><button class="dl-card-btn">'+(p.available?'<i class="fa-solid fa-download"></i> Download':'<i class="fa-solid fa-lock"></i> Unavailable')+'</button>';
var btn=card.querySelector('.dl-card-btn');
if(p.available){
var _dl=p.downloadLink;var _isWin=p.id==='windows';
btn.addEventListener('click',(function(isWin,dl){return function(){if(isWin){openPick();}else{openTos(dl);}};})(p.id==='windows',p.downloadLink));
card.addEventListener('click',(function(isWin,dl){return function(e){if(!btn.contains(e.target)){if(isWin){openPick();}else{openTos(dl);}}};})(p.id==='windows',p.downloadLink));
}else{
var shake=function(){if(card.classList.contains('shaking'))return;card.classList.add('shaking');card.addEventListener('animationend',function(){card.classList.remove('shaking');},{once:true});showToast(p.name,p.statusText);};
btn.addEventListener('click',shake);
card.addEventListener('click',function(e){if(!btn.contains(e.target))shake();});
}
rHover(card);rHover(btn);
grid.appendChild(card);
});
}

var profOv=document.getElementById('profileOverlay');
var profMod=document.getElementById('profileModal');
var profX=document.getElementById('profileX');

function openProfile(data){
var rc=data.role.toLowerCase();
profMod.className='profile-modal '+rc;
var img=document.getElementById('profileImg');
var fb=document.getElementById('profileFb');
img.src=data.avatar;img.alt=data.name;
img.onerror=function(){img.style.display='none';fb.style.display='flex';};
img.style.display='block';fb.style.display='none';
document.getElementById('profileName').textContent=data.name;
document.getElementById('profileBadge').textContent=data.role;
document.getElementById('profileDesc').textContent=data.fullDesc;
profOv.classList.add('active');document.body.style.overflow='hidden';
}

function closeProfile(){profOv.classList.remove('active');document.body.style.overflow='';}
profX.addEventListener('click',closeProfile);
profOv.addEventListener('click',function(e){if(e.target===profOv)closeProfile();});
rHover(profX);

function revealCredits(){
document.querySelectorAll('.member-card').forEach(function(c,i){setTimeout(function(){c.classList.add('revealed');},i*70);});
}

fetch('a1243212.json').then(function(r){return r.json();}).then(function(data){buildCredits(data);}).catch(function(){
buildCredits({credits:[
{id:'1',name:'Placeholder One',role:'Leader',avatar:'',shortDesc:'Visionary behind the Overlord project.',fullDesc:'Placeholder One is the founding visionary of Overlord.',alts:[{name:'Placeholder One Alt',avatar:'',fullDesc:'Alternate account of Placeholder One.'}]},
{id:'2',name:'Placeholder Two',role:'Leader',avatar:'',shortDesc:'Co-founder and head of operations.',fullDesc:'Placeholder Two co-founded Overlord.'},
{id:'3',name:'Placeholder Three',role:'Leader',avatar:'',shortDesc:'Strategic lead for partnerships.',fullDesc:'Placeholder Three handles external relations.'},
{id:'4',name:'Placeholder Four',role:'Developer',avatar:'',shortDesc:'Core engineer and backend specialist.',fullDesc:'Placeholder Four builds the execution engine.'},
{id:'5',name:'Placeholder Five',role:'Developer',avatar:'',shortDesc:'Frontend and API integration.',fullDesc:'Placeholder Five bridges engine and UI.'},
{id:'6',name:'Placeholder Six',role:'Designer',avatar:'',shortDesc:'Lead visual designer.',fullDesc:'Placeholder Six crafts the Overlord aesthetic.'}
]});
});

function buildCredits(data){
var roleOrder=['Leader','Developer','Designer'];
var roleIcons={Leader:'fa-solid fa-crown',Developer:'fa-solid fa-code',Designer:'fa-solid fa-pen-nib'};
var grouped={};
roleOrder.forEach(function(r){grouped[r]=[];});
data.credits.forEach(function(m){if(grouped[m.role])grouped[m.role].push(m);});
var container=document.getElementById('creditsContainer');
container.innerHTML='';

roleOrder.forEach(function(role){
if(!grouped[role].length)return;
var rc=role.toLowerCase();
var colorVar=rc==='leader'?'leader':rc==='developer'?'dev':'design';
var group=document.createElement('div');
group.className='credits-group';
group.innerHTML='<div class="group-label" style="max-width:1080px;margin:0 auto 1.6rem;"><i class="'+roleIcons[role]+'" style="font-size:.7rem;color:var(--'+colorVar+'-color);opacity:.6;"></i><span class="group-label-text '+rc+'">'+role+'s</span><div class="group-line '+rc+'"></div></div><div class="credits-grid"></div>';
var grid=group.querySelector('.credits-grid');

grouped[role].forEach(function(m,idx){
var hasAlts=m.alts&&m.alts.length>0;
var isFirst=idx===0&&role==='Leader';
var showSwap=hasAlts&&isFirst;
var allProfiles=showSwap?[{name:m.name,avatar:m.avatar,fullDesc:m.fullDesc,role:m.role}].concat(m.alts.map(function(a){return{name:a.name,avatar:a.avatar,fullDesc:a.fullDesc,role:m.role};})):null;
var currentProfileIdx=0;

var card=document.createElement('div');
card.className='member-card '+rc;
var actionsHTML=showSwap
?'<div class="member-actions"><button class="member-view"><i class="fa-solid fa-arrow-up-right-from-square" style="font-size:.62rem;"></i> View</button><button class="swap-btn" title="Switch account"><i class="fa-solid fa-rotate"></i></button></div>'
:'<div class="member-actions"><button class="member-view"><i class="fa-solid fa-arrow-up-right-from-square" style="font-size:.62rem;"></i> View Profile</button></div>';

card.innerHTML='<div class="spotlight"></div><div class="avatar-wrap"><div class="diamond"><img src="'+m.avatar+'" alt="'+m.name+'" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"><div class="av-fb" style="display:none;"><i class="fa-solid fa-user"></i></div></div><div class="role-badge">'+m.role+'</div></div><div class="member-name">'+m.name+'</div><div class="member-short">'+m.shortDesc+'</div>'+actionsHTML;

var vb=card.querySelector('.member-view');

if(showSwap){
var swapBtn=card.querySelector('.swap-btn');
var nameEl=card.querySelector('.member-name');
var imgEl=card.querySelector('.diamond img');
var fbEl=card.querySelector('.av-fb');

var updateCard=function(profile){
nameEl.textContent=profile.name;
imgEl.src=profile.avatar;
imgEl.alt=profile.name;
imgEl.style.display='block';
fbEl.style.display='none';
imgEl.onerror=function(){imgEl.style.display='none';fbEl.style.display='flex';};
};

swapBtn.addEventListener('click',function(e){
e.stopPropagation();
if(card.classList.contains('flipping'))return;
swapBtn.classList.add('spinning');
swapBtn.querySelector('i').addEventListener('animationend',function(){swapBtn.classList.remove('spinning');},{once:true});
card.classList.add('flipping');
card.addEventListener('animationend',function(){card.classList.remove('flipping');},{once:true});
setTimeout(function(){currentProfileIdx=(currentProfileIdx+1)%allProfiles.length;updateCard(allProfiles[currentProfileIdx]);},130);
});

vb.addEventListener('click',function(e){e.stopPropagation();openProfile(allProfiles[currentProfileIdx]);});
rHover(swapBtn);
}else{
vb.addEventListener('click',function(e){e.stopPropagation();openProfile({name:m.name,avatar:m.avatar,fullDesc:m.fullDesc,role:m.role});});
}

card.addEventListener('click',function(){
if(showSwap)openProfile(allProfiles[currentProfileIdx]);
else openProfile({name:m.name,avatar:m.avatar,fullDesc:m.fullDesc,role:m.role});
});
rHover(card);rHover(vb);
grid.appendChild(card);
});

container.appendChild(group);
});
}

var premiumData=null;
var activePlatformId=null;
var currentPlan=null;

fetch('asifidi9938.json').then(function(r){return r.json();}).then(function(data){premiumData=data;buildPlatformSwitcher();}).catch(function(){
premiumData={
platforms:[
{id:'windows',name:'Windows',icon:'fa-brands fa-windows',plans:[
{id:'w-basic',name:'Basic',price:'$4.99',period:'/ month',tagline:'Perfect for getting started',features:['Script Executor Access','Basic Script Hub','Community Support','1 Device License','Standard Updates'],highlighted:false},
{id:'w-pro',name:'Pro',price:'$9.99',period:'/ month',tagline:'Most popular choice',features:['Everything in Basic','Full Script Hub Access','Priority Support','3 Device Licenses','Early Access Updates','Custom UI Themes','Advanced Executor Features'],highlighted:true},
{id:'w-life',name:'Lifetime',price:'$49.99',period:'one-time',tagline:'Best long-term value',features:['Everything in Pro','Unlimited Devices','Lifetime Updates','Dedicated Support','Beta Feature Access','Exclusive Scripts','Priority Queue'],highlighted:false}
]},
{id:'android',name:'Android',icon:'fa-brands fa-android',plans:[
{id:'a-basic',name:'Basic',price:'$2.99',period:'/ month',tagline:'Mobile executor essentials',features:['Mobile Script Executor','Basic Script Library','Community Support','1 Device License','Standard Updates'],highlighted:false},
{id:'a-pro',name:'Pro',price:'$5.99',period:'/ month',tagline:'Full mobile experience',features:['Everything in Basic','Full Script Library','Priority Support','2 Device Licenses','Early Access Updates','Custom Mobile UI','Advanced Mobile Features'],highlighted:true},
{id:'a-life',name:'Lifetime',price:'$29.99',period:'one-time',tagline:'Best long-term value',features:['Everything in Pro','Unlimited Devices','Lifetime Updates','Dedicated Support','Beta Feature Access','Exclusive Mobile Scripts','Priority Queue'],highlighted:false}
]}
],
payment:{methods:[
{id:'paypal',name:'PayPal',icon:'fa-brands fa-paypal',address:'paypal.me/overlord',note:'Send as Friends & Family. Include your plan name in the note.',color:'#003087'},
{id:'ltc',name:'Litecoin',icon:'fa-solid fa-circle-dollar-to-slot',address:'LTC_ADDRESS_HERE',note:'Send exact amount. Transaction confirms in ~2.5 minutes.',color:'#bfbbbb'},
{id:'btc',name:'Bitcoin',icon:'fa-brands fa-bitcoin',address:'BTC_ADDRESS_HERE',note:'Send exact amount. Allow up to 30 minutes for confirmation.',color:'#f7931a'}
]}
};
buildPlatformSwitcher();
});

function buildPlatformSwitcher(){
var sw=document.getElementById('platformSwitcher');
sw.innerHTML='';
premiumData.platforms.forEach(function(p,i){
var btn=document.createElement('button');
btn.className='platform-tab'+(i===0?' active':'');
btn.innerHTML='<i class="'+p.icon+'"></i> '+p.name;
btn.addEventListener('click',function(){switchPlatform(p.id,false);});
rHover(btn);
sw.appendChild(btn);
});
}

function switchPlatform(id,instant){
if(activePlatformId===id&&!instant)return;
activePlatformId=id;
document.querySelectorAll('.platform-tab').forEach(function(t,i){t.classList.toggle('active',premiumData.platforms[i].id===id);});
var platform=premiumData.platforms.find(function(p){return p.id===id;});
if(!platform)return;
var grid=document.getElementById('plansGrid');
grid.classList.remove('visible');
setTimeout(function(){
grid.innerHTML='';
platform.plans.forEach(function(plan){
var card=document.createElement('div');
card.className='plan-card'+(plan.highlighted?' recommended':'');
var recBadge=plan.highlighted?'<div class="rec-badge"><i class="fa-solid fa-star"></i> Recommended</div>':'';
card.innerHTML='<div class="spotlight"></div>'+recBadge+'<div class="plan-name">'+plan.name+'</div><div class="plan-tagline">'+plan.tagline+'</div><div class="plan-price"><span class="plan-price-amount">'+plan.price+'</span><span class="plan-price-period">'+plan.period+'</span></div><div class="plan-divider"></div><ul class="plan-features">'+plan.features.map(function(f){return'<li><i class="fa-solid fa-check"></i>'+f+'</li>';}).join('')+'</ul><button class="plan-btn '+(plan.highlighted?'primary':'default')+'">'+(plan.highlighted?'Get Started <i class="fa-solid fa-arrow-right bi"></i>':'Choose Plan')+'</button>';
var btn=card.querySelector('.plan-btn');
btn.addEventListener('click',function(e){e.stopPropagation();openBenefits(plan,platform);});
card.addEventListener('click',function(){openBenefits(plan,platform);});
rHover(card);rHover(btn);
grid.appendChild(card);
});
requestAnimationFrame(function(){requestAnimationFrame(function(){grid.classList.add('visible');});});
},instant?0:200);
}

var benefitsOv=document.getElementById('benefitsOverlay');
var benefitsBack=document.getElementById('benefitsBack');
var benefitsBuyBtn=document.getElementById('benefitsBuyBtn');

function openBenefits(plan,platform){
document.getElementById('benefitsPlatformBadge').innerHTML='<i class="'+platform.icon+'"></i> '+platform.name+' \u2014 '+plan.name;
document.getElementById('benefitsTitle').textContent=plan.name+' Plan';
document.getElementById('benefitsTagline').textContent=plan.tagline;
document.getElementById('benefitsPrice').textContent=plan.price;
document.getElementById('benefitsPeriod').textContent=plan.period;
var grid=document.getElementById('benefitsFeaturesGrid');
grid.innerHTML='';
plan.features.forEach(function(f,i){
var item=document.createElement('div');
item.className='benefit-item';
item.style.transitionDelay=(i*0.04)+'s';
item.innerHTML='<div class="benefit-check"><i class="fa-solid fa-check"></i></div><span class="benefit-text">'+f+'</span>';
rHover(item);
grid.appendChild(item);
});
currentPlan={plan:plan,platform:platform};
benefitsOv.classList.add('active');
document.body.style.overflow='hidden';
requestAnimationFrame(function(){requestAnimationFrame(function(){
document.getElementById('benefitsHero').classList.add('in');
grid.classList.add('in');
setTimeout(function(){document.getElementById('benefitsBuyBtn').classList.add('in');},200);
});});
}

function closeBenefits(){
benefitsOv.classList.remove('active');
document.body.style.overflow='';
document.getElementById('benefitsHero').classList.remove('in');
document.getElementById('benefitsFeaturesGrid').classList.remove('in');
document.getElementById('benefitsBuyBtn').classList.remove('in');
}

benefitsBack.addEventListener('click',closeBenefits);
rHover(benefitsBack);

benefitsBuyBtn.addEventListener('click',function(){if(!currentPlan)return;openCheckout(currentPlan.plan,currentPlan.platform);});
rHover(benefitsBuyBtn);

var checkoutOv=document.getElementById('checkoutOverlay');
var checkoutBack=document.getElementById('checkoutBack');

function openCheckout(plan,platform){
document.getElementById('checkoutPlanName').textContent=platform.name+' \u2014 '+plan.name;
document.getElementById('checkoutPlanPrice').textContent=plan.price;
var methods=document.getElementById('paymentMethods');
methods.innerHTML='';
premiumData.payment.methods.forEach(function(method){
var wrap=document.createElement('div');
wrap.className='pay-method';
wrap.innerHTML='<div class="pay-method-header"><div class="pay-icon-wrap" style="color:'+method.color+';border-color:'+method.color+'22;"><i class="'+method.icon+'"></i></div><div class="pay-method-info"><div class="pay-method-name">'+method.name+'</div><div class="pay-method-note">Tap to expand</div></div><i class="fa-solid fa-chevron-down pay-chevron"></i></div><div class="pay-dropdown"><div class="pay-dropdown-inner"><div class="pay-address-row"><div class="pay-address-box">'+method.address+'</div><button class="pay-copy-btn" data-addr="'+method.address+'"><i class="fa-solid fa-copy"></i> Copy</button></div><div class="pay-instruction">'+method.note+'</div></div></div>';
var header=wrap.querySelector('.pay-method-header');
var copyBtn=wrap.querySelector('.pay-copy-btn');
header.addEventListener('click',function(){
var wasOpen=wrap.classList.contains('open');
document.querySelectorAll('.pay-method.open').forEach(function(m){m.classList.remove('open');});
if(!wasOpen)wrap.classList.add('open');
});
copyBtn.addEventListener('click',function(e){
e.stopPropagation();
navigator.clipboard.writeText(method.address).then(function(){
copyBtn.innerHTML='<i class="fa-solid fa-check"></i> Copied';
copyBtn.classList.add('copied');
setTimeout(function(){copyBtn.innerHTML='<i class="fa-solid fa-copy"></i> Copy';copyBtn.classList.remove('copied');},2000);
});
});
rHover(header);rHover(copyBtn);
methods.appendChild(wrap);
});
checkoutOv.classList.add('active');
requestAnimationFrame(function(){requestAnimationFrame(function(){
document.getElementById('checkoutHeader').classList.add('in');
document.getElementById('checkoutSummary').classList.add('in');
setTimeout(function(){methods.classList.add('in');},100);
});});
}

function closeCheckout(){
checkoutOv.classList.remove('active');
document.getElementById('checkoutHeader').classList.remove('in');
document.getElementById('checkoutSummary').classList.remove('in');
document.getElementById('paymentMethods').classList.remove('in');
}

checkoutBack.addEventListener('click',closeCheckout);
rHover(checkoutBack);
};

_build();

})();
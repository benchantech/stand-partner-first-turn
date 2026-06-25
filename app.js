/* Static/local-only MVP. No API calls, storage, cookies, analytics, or AI. */
const ROUTES=[
{id:'returning-restart-short',entry:'returning',need:'restart',time:'short',title:'Rebuilding Contact After Time Away',videoId:'',start:252,watchIf:'You are returning after time away and want a small, non-punishing place to begin.',why:'A short reset is often more useful than trying to recover everything at once.',notice:'Watch for what returns before deciding what needs fixing.',tryThis:'Play one open string slowly. Reset contact before adding speed or repertoire.',tags:['returning','restart','5-10 minutes'],notFor:'Not for sharp pain, injury-related concerns, or a situation that needs a teacher who can see you.'},
{id:'starting-practice-short',entry:'starting',need:'practice',time:'short',title:'A Realistic First Step',videoId:'',start:0,watchIf:'You are new and want a grounded first page rather than a giant checklist.',why:'Starting small protects curiosity and gives you something real to notice.',notice:'Notice what you can understand before worrying about doing it perfectly.',tryThis:'Choose one question to carry into your first lesson or first practice session.',tags:['starting fresh','practice','5-10 minutes'],notFor:'A teacher can help with instrument setup and early physical habits.'},
{id:'stuck-problem-medium',entry:'stuck',need:'problem',time:'medium',title:'Stop Trying to Fix the Whole Problem',videoId:'',start:0,watchIf:'You have a real problem but cannot yet tell which part matters most.',why:'Separating observation from correction can keep one issue from becoming five imagined ones.',notice:'Watch for the smallest observable change before assigning a cause.',tryThis:'Name one thing you can hear or feel without trying to correct it yet.',tags:['stuck','problem','15-30 minutes'],notFor:'Use a teacher or qualified clinician for injury, persistent pain, or safety concerns.'},
{id:'stuck-reading-medium',entry:'stuck',need:'reading',time:'medium',title:'Reading New Music Without Chasing Every Note',videoId:'',start:0,watchIf:'Reading unfamiliar music feels like a flood of details.',why:'Reading becomes more workable when you decide what to notice first.',notice:'Watch how the eye and body are given fewer jobs at one time.',tryThis:'Read one short line while prioritizing only pulse and direction.',tags:['reading','stuck','15-30 minutes'],notFor:'This is one route into reading, not a full sight-reading curriculum.'},
{id:'helper-help-any',entry:'helper',need:'help',time:'any',title:'Helping Without Taking Over',videoId:'',start:0,watchIf:'You are supporting a player without becoming their teacher or practice police.',why:'A useful helper protects agency before offering solutions.',notice:'Watch for the difference between noticing and correcting.',tryThis:'Ask one open question before offering a suggestion.',tags:['parent','teacher','helper'],notFor:'This does not replace a player’s teacher or address family conflict.'},
{id:'exploring-understand-long',entry:'exploring',need:'understand',time:'long',title:'Choose a Thread and Follow It',videoId:'',start:0,watchIf:'You want to explore Ben’s teaching without needing a problem solved first.',why:'The archive is more useful when you enter through a live question rather than trying to consume it all.',notice:'Notice which idea keeps pulling your attention.',tryThis:'Choose one related resource to open next, then stop.',tags:['exploring','more time'],notFor:'Choose another route if you need a concrete next action.'}
];

const S={entry:null,level:null,need:null,time:null};
const app=document.querySelector('#app');
const E=[
  ['returning','Returning after time away','Restart without trying to recover everything at once.'],
  ['stuck','Stuck on something','Name the next useful observation before fixing too much.'],
  ['starting','Starting fresh','Begin with one clear page, not a giant checklist.'],
  ['helper','Helping someone else','Support a player without taking over.']
];
const L=[['never','Never played'],['beginner','Beginner'],['returning-player','Returning player'],['active','Active player'],['helper-level','Teacher / parent / helper']];
const N=[['practice','Know what to practice'],['restart','Restart well'],['problem','Solve a problem'],['reading','Read better'],['understand','Understand a piece / technique'],['help','Help someone else']];
const T=[['short','5-10 minutes'],['medium','15-30 minutes'],['long','Longer'],['any','It varies']];

function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function render(x){
  app.innerHTML=x;
  app.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>choose(b.dataset.choice));
  app.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>action(b.dataset.action));
  app.querySelector('h1,h2')?.focus?.();
}
function list(x){return `<div class="choices">${x.map(([a,b,c])=>`<button class="choice" data-choice="${a}"><b>${esc(b)}</b>${c?`<small>${esc(c)}</small>`:''}</button>`).join('')}</div>`}
function bars(n,label){return `<p class="step">${[1,2,3,4].map(i=>`<i class="bar ${i<=n?'on':''}"></i>`).join('')} ${String(n).padStart(2,'0')} / ${label}</p>`}
function timecode(s){s=Number(s||0);return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}
function hasVideo(r){return /^[A-Za-z0-9_-]{6,}$/.test(r.videoId||'')}

function home(){
  render(`<article class="card"><p class="eyebrow">01 / First Turn</p><h2 tabindex="-1">Where are you today?</h2><p class="helper">Choose the closest starting point. The same choices lead to the same route, and routing choices are not stored.</p><p class="meta-line">No account. No AI. Routing choices are not stored.</p>${list(E)}</article>`);
}
function onb(n){
  let title,items;
  if(n===2){title='Where are you now?';items=L}
  else if(n===3){title='What would help most right now?';items=N}
  else{title='How much room do you have today?';items=T}
  render(`<article class="card">${bars(n,'First Turn')}<h2 tabindex="-1">${title}</h2>${list(items)}${n===4?'<p class="notice">This changes only the size of the first suggestion. Nothing is saved.</p>':''}</article>`);
}
function scope(){
  render(`<article class="card"><p class="eyebrow">01 / First Turn</p><h2 tabindex="-1">What this guide does and does not do</h2><p class="lede">It turns you toward a useful page from Ben Chan Violin’s teaching. It does not diagnose your playing, replace a teacher, or tell you there is one correct answer.</p><div class="buttons"><button class="btn" data-action="build">Build my starting page</button><button class="btn secondary" data-action="home">Back</button></div></article>`);
}
function pick(){
  return ROUTES.find(r=>r.entry===S.entry&&r.need===S.need&&(r.time===S.time||r.time==='any'))||ROUTES.find(r=>r.entry===S.entry&&r.need===S.need)||ROUTES.find(r=>r.need===S.need)||ROUTES.find(r=>r.entry===S.entry)||ROUTES[0];
}
function route(){
  let r=pick(),clip=hasVideo(r);
  render(`<article class="card"><p class="eyebrow">02 / Your Next Page</p><h2 tabindex="-1">Here is your next page</h2><p class="helper">${esc(r.watchIf)}</p><div class="tags">${r.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><h3>${clip?`${timecode(r.start)} / `:''}${esc(r.title)}</h3><div class="panel"><b>Why this page</b>${esc(r.why)}</div><div class="panel"><b>Try this first</b>${esc(r.tryThis)}</div><div class="buttons"><button class="btn" data-action="${clip?'resource':'unavailable'}">${clip?'Open clip':'Preview route'}</button><button class="btn secondary" data-action="ask">Turn again</button></div></article>`);
}
function ask(){
  render(`<article class="card"><p class="eyebrow">04 / Turn Again</p><h2 tabindex="-1">What is going on?</h2><p class="helper">Choose another route. Nothing from the prior turn is stored.</p>${list(N)}<div class="buttons"><button class="btn subtle" data-action="home">Start over</button></div></article>`);
}
function resource(){
  let r=pick(),src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(r.videoId)}?start=${Number(r.start||0)}&rel=0`;
  render(`<article class="card"><p class="eyebrow">02 / Your Next Page</p><p class="helper">${esc(r.why)}</p><h2 tabindex="-1">${timecode(r.start)} / ${esc(r.title)}</h2><div class="video"><iframe title="${esc(r.title)}" src="${src}" allowfullscreen></iframe></div><div class="panel"><b>Why this page</b>${esc(r.why)}</div><div class="panel"><b>Try this first</b>${esc(r.tryThis)}</div><p class="helper"><b>Boundary:</b> ${esc(r.notFor)}</p><div class="buttons"><button class="btn" data-action="helped">This helped</button><button class="btn secondary" data-action="not">Not my issue</button><button class="btn subtle" data-action="ask">Turn again</button></div></article>`);
}
function unavailable(){
  let r=pick();
  render(`<article class="card"><p class="eyebrow">02 / Your Next Page</p><p class="helper">${esc(r.why)}</p><h2 tabindex="-1">${esc(r.title)}</h2><p class="notice"><b>This route is not published yet.</b><br>The recommendation text is ready, but the destination video has not been attached.</p><div class="panel"><b>Why this page</b>${esc(r.why)}</div><div class="panel"><b>Try this first</b>${esc(r.tryThis)}</div><div class="buttons"><button class="btn" data-action="helped">This helped</button><button class="btn secondary" data-action="not">Not my issue</button><button class="btn subtle" data-action="ask">Turn again</button></div></article>`);
}
function check(){
  render(`<article class="card"><p class="eyebrow">03 / Try It</p><h2 tabindex="-1">Did this give you a useful next step?</h2>${list([['yes','Yes, this helped'],['somewhat','Somewhat'],['no','No - turn again']])}<div class="buttons"><button class="btn subtle" data-action="studio">What does Stand Partner add?</button></div></article>`);
}
function nope(){
  render(`<article class="card"><p class="eyebrow">04 / Turn Again</p><h2 tabindex="-1">This may not be the right page.</h2><p class="lede">A wrong turn is not a failed session.</p><div class="buttons"><button class="btn" data-action="ask">Tell me more</button><button class="btn secondary" data-action="home">Start over</button></div></article>`);
}
function studio(){
  render(`<article class="card"><p class="eyebrow">Stand Partner</p><h2 tabindex="-1">One page can be enough. Your playing is longer than one page.</h2><p class="lede">The fuller tool is for ongoing routes, saved pages, personal notes, and a working playbook built from what helps you.</p><div class="panel"><b>This free guide</b>One local, private route. Nothing remembered.</div><div class="buttons"><button class="btn" data-action="home">Start over</button></div></article>`);
}
function choose(v){
  let h=app.querySelector('h2')?.textContent||'';
  if(h.includes('Where are you today')){S.entry=v;onb(2)}
  else if(h.includes('Where are you now')){S.level=v;onb(3)}
  else if(h.includes('What would help')){S.need=v;onb(4)}
  else if(h.includes('How much room')){S.time=v;scope()}
  else if(h.includes('What is going')){S.need=v;S.time=S.time||'any';route()}
  else if(h.includes('Did this')){v==='yes'?studio():ask()}
}
function action(v){
  if(v==='home'){Object.assign(S,{entry:null,level:null,need:null,time:null});home()}
  if(v==='build')route();
  if(v==='resource')resource();
  if(v==='unavailable')unavailable();
  if(v==='ask')ask();
  if(v==='helped')check();
  if(v==='not')nope();
  if(v==='studio')studio();
}
home();

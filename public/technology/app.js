import { mountSignalEngine } from "./engine.js";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scenes = {
  meeting: { question: 'The release is planned for next Thursday. Could we confirm the rollout and support plan?', answer: '发布计划定在下周四。我们可以确认一下上线安排和支持计划吗？\n\n决定：先向 10% 用户发布，观察两天错误率。\n待办：运维周三前确认回滚方案。\n负责人：林。' },
  academic: { question: 'How does the selective scan reduce memory traffic for long sequences?', answer: '选择性扫描通过融合离散化、扫描和输出，减少长序列处理中的内存读写。\n\n资料来源：论文第 4 页，图 3。\n待确认：补充与基线方法的吞吐量对比。' },
  interview: { question: '模拟练习：你会如何安排一次平稳的版本发布？', answer: '先确认发布范围、监控指标和回滚条件。\n按小比例分批上线，逐步扩大范围。\n结束后复盘问题并整理成发布清单。' },
  course: { question: 'Could you explain what happens after a TLB miss?', answer: 'TLB 未命中后，硬件会先遍历页表。\n如果页表项有效，就把映射写回 TLB；只有页表项无效时才触发缺页异常。\n资料来源：第 9 讲，第 23 页。' }
};
let currentScene = 'meeting';
let typingTimer = null;
function playScene(name, userInitiated = false) {
  currentScene = name;
  clearTimeout(typingTimer);
  const scene = scenes[name];
  $('#demo-question').textContent = scene.question;
  $$('[data-scene]').forEach(b => { const on = b.dataset.scene === name; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
  const answer = $('#demo-answer');
  answer.replaceChildren();
  const text = document.createElement('span');
  text.style.whiteSpace = 'pre-line';
  answer.append(text);
  if (motion.matches) { text.textContent = scene.answer; return; }
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor'; cursor.setAttribute('aria-hidden', 'true');
  answer.append(cursor);
  let i = 0;
  function tick() {
    if (document.hidden) { typingTimer = setTimeout(tick, 250); return; }
    i = Math.min(i + 2, scene.answer.length);
    text.textContent = scene.answer.slice(0, i);
    if (i < scene.answer.length) typingTimer = setTimeout(tick, 40);
    else { cursor.remove(); typingTimer = null; }
  }
  typingTimer = setTimeout(tick, userInitiated ? 120 : 500);
}
$$('[data-scene]').forEach(b => b.addEventListener('click', () => playScene(b.dataset.scene, true)));
$('.replay-button').addEventListener('click', () => playScene(currentScene, true));
playScene('meeting');

const features = {
  listen: { symbol: '≋', title: '中英对话，\n实时听译。', description: '系统声音与麦克风分开收听，实时显示原文与双向译文。跨语言会议中可边听边读，不需要等到会后再翻译。', points: ['中文与英语双向翻译', '原文和译文并排显示', '字幕可随会议记录保存'], image: 'conversation-dark.svg', alt: '助手页：中英实时字幕与会议纪要' },
  context: { symbol: '▧', title: '会议资料，\n随手整理。', description: '导入议程、方案、论文和项目文件。资料在本机解析，提问时按需检索相关内容，并保留来源。', points: ['会议、学术与课程场景', 'PDF、Office 与图片按需处理', 'OCR 与语义检索可选'], image: 'materials-dark.svg', alt: '场景页：会议资料、议程与项目文件' },
  prompt: { symbol: '✦', title: '会中跟进，\n会后快速回顾。', description: '记录实时转写、议题和讨论结论。演讲准备时也可用悬浮提词器查看要点，字号和透明度均可调整。', points: ['实时字幕与讨论记录', '结构化纪要和行动项', '演讲提词可调整字号'], image: 'prompter-dark.svg', alt: '实时字幕与会中重点记录' },
  review: { symbol: '↗', title: '一场会议，\n留下清晰脉络。', description: '结束后生成纪要或提纲，提取决定事项、待办和待确认问题。原文、译文与资料来源可一并回看。', points: ['纪要、提纲和观点对照', '决定、负责人和待办', '本机保存与备份'], image: 'review-dark.svg', alt: '会议纪要、待办事项与资料来源' }
};
let currentFeature = 'listen';
function selectFeature(name, focus = false) {
  currentFeature = name;
  const data = features[name];
  $$('[data-feature]').forEach(b => { const on = b.dataset.feature === name; b.classList.toggle('active', on); b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
  $('#workflow-panel').setAttribute('aria-labelledby', `tab-${name}`);
  $('#feature-symbol').textContent = data.symbol;
  $('#feature-title').replaceChildren(...data.title.split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
  $('#feature-description').textContent = data.description;
  $('#feature-points').replaceChildren(...data.points.map(point => { const li = document.createElement('li'); li.textContent = point; return li; }));
  $('#feature-image').src = `./shots/${data.image}`;
  $('#feature-image').alt = data.alt;
}
$$('[data-feature]').forEach((button, i, buttons) => {
  button.addEventListener('click', () => selectFeature(button.dataset.feature));
  button.addEventListener('keydown', e => {
    let next;
    if (e.key === 'ArrowRight') next = (i + 1) % buttons.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + buttons.length) % buttons.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = buttons.length - 1;
    if (next !== undefined) { e.preventDefault(); selectFeature(buttons[next].dataset.feature, true); }
  });
});

function openDialog(dialog) { if (!dialog.open) dialog.showModal(); }
$$('[data-download]').forEach(button => button.addEventListener('click', () => openDialog($('#download-dialog'))));
$$('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
});
$('.screenshot-frame').addEventListener('click', () => {
  const data = features[currentFeature];
  $('#image-dialog img').src = `./shots/${data.image}`;
  $('#image-dialog img').alt = data.alt;
  openDialog($('#image-dialog'));
});

const optional = { ocr: false, vector: false };
function updateOptions() {
  const { ocr, vector } = optional;
  $('#ocr-toggle').setAttribute('aria-checked', String(ocr));
  $('#vector-toggle').setAttribute('aria-checked', String(vector));
  $('#ocr-explanation').textContent = ocr ? '增加版面检测、区域识别与阅读顺序重建，面向复杂表格和公式。模型约 1.23 GB，需要更多磁盘与内存，具体准确度取决于文件。' : '默认系统 OCR，无需下载 OCR 权重。适合常规文字与清晰扫描件；复杂表格、公式可考虑本机增强。';
  $('#vector-explanation').textContent = vector ? '增加语义召回，更容易找到意思相近、用词不同的资料。模型约 649 MB；需要建立索引并占用内存，实时检索超时会采用关键词结果。' : '不开启时，仍会按关键词检索资料片段；不会把所有资料塞入上下文。相近但不同词的表达可能漏检。';
  const modelBytes = (ocr ? 1230669106 : 0) + (vector ? 649100000 : 0);
  const total = modelBytes + (ocr || vector ? 185562618 : 0);
  const unit = total > 1e9 ? 'GB' : 'MB';
  const value = total > 1e9 ? (total / 1e9).toFixed(2) : Math.round(total / 1e6);
  $('#download-size').replaceChildren(document.createTextNode(`${value} `), Object.assign(document.createElement('small'), { textContent: unit }));
  $('#download-note').textContent = ocr || vector ? '估算包含共享运行包约 186 MB，仅需一份' : '不含语音引擎所需模型';
  $('#runtime-note').textContent = ocr || vector ? '运行包安装占用约 632 MB；此处仅预览，不会下载。' : '此处仅展示取舍，不会下载或修改应用设置。';
}
for (const key of ['ocr', 'vector']) $(`#${key}-toggle`).addEventListener('click', () => { optional[key] = !optional[key]; updateOptions(); });

const menu = $('.menu-button');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航'); $('#mobile-nav').hidden = !open; });
$$('#mobile-nav a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '打开导航'); $('#mobile-nav').hidden = true; }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { menu.setAttribute('aria-expanded', 'false'); $('#mobile-nav').hidden = true; } });

if ('IntersectionObserver' in window && !motion.matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }), { threshold: .08 });
  $$('.reveal').forEach(el => observer.observe(el));
}
let scrollPending = false;
function setScrollProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  $('.scroll-progress').style.transform = `scaleX(${total > 0 ? Math.max(0, Math.min(1, window.scrollY / total)) : 0})`;
  scrollPending = false;
}
window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(setScrollProgress); } }, { passive: true });
window.addEventListener('resize', setScrollProgress);
setScrollProgress();


const engine=mountSignalEngine($('#signal-field'),{onRenderer:text=>{$('#engine-renderer').textContent=text;}});
const shapeNames=['声场已就位 / AWAITING SIGNAL','语义空间 / CONTEXT IN ORBIT','联结展开 / THOUGHTS CONNECTED'];
$$('[data-shape]').forEach(button=>button.addEventListener('click',()=>{
  const index=Number(button.dataset.shape);engine.setShape(index);
  $$('[data-shape]').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
  $('#engine-state').textContent=shapeNames[index];
}));
let pulseTimer;
$('#inject-signal').addEventListener('click',()=>{clearTimeout(pulseTimer);engine.pulse();$('.hero-stage').classList.add('burst');$('#engine-state').textContent='信号已注入 / SIGNAL IN MOTION';pulseTimer=setTimeout(()=>{$('.hero-stage').classList.remove('burst');const b=$('[data-shape][aria-pressed="true"]');$('#engine-state').textContent=shapeNames[Number(b.dataset.shape)];},1600);});

const techSteps={
  capture:{kicker:'TWO STREAMS. ONE CONVERSATION.',title:'听得见，也分得清。',description:'系统声音与麦克风分别采集、独立识别，保留发言顺序并过滤回声，为双语字幕和会议记录打好基础。',tags:['双通道采集','实时语音识别','回声可恢复']},
  decode:{kicker:'STREAM FIRST. REFINE SECOND.',title:'先跟上，再听准。',description:'第一遍流式转写，跟上对话节奏；一句话说完，第二遍整句精修。持续反馈与最终文本，各自承担最合适的任务。',tags:['流式粗稿','整句精修','本机语音处理']},
  retrieve:{kicker:'THE RIGHT CONTEXT. AT THE RIGHT TIME.',title:'找到相关的，不堆全部的。',description:'标题树切片保留章节、表格与真实定位。关键词与可选语义检索共享切片；知识问答可引用当前场景的资料来源。',tags:['统一切片','版本化索引','来源可追溯']},
  stream:{kicker:'LESS WAITING. MORE CONVERSATION.',title:'一边听，一边读。',description:'识别到语音后，实时呈现转写与译文；会后可按当前会议整理摘要、决定事项与待办。知识问答也可结合已导入资料。',tags:['实时字幕','结构化纪要','资料问答']}
};
function waveMarkup(){return ['remote','self'].map((side,j)=>`<div class="track track-${side}"><span>${j?'SELF':'REMOTE'}</span><div class="wave-track">${Array.from({length:40},(_,i)=>`<i style="height:${4+Math.round(Math.abs(Math.sin(i*2.17+j))*18)}px;animation-delay:-${(i*.13).toFixed(2)}s"></i>`).join('')}</div><b>${j?'我':'对方'}</b></div>`).join('')+'<div class="trace-merge"><i></i><span>独立识别 / 回声过滤</span><i></i></div><div class="trace-output"><span>TRANSCRIPT_READY</span><strong>双语转写，开始同步。</strong><span class="trace-cursor">▌</span></div>';}
const techVisuals={capture:waveMarkup(),decode:'<div class="refine-line"><b>PASS_01</b> 实时流式草稿</div><div class="refine-line"><s>发布时间定在周四</s></div><div class="trace-merge"><i></i><span>整句结束 → 离线精修</span><i></i></div><div class="refine-line final"><b>PASS_02</b> 发布时间可调整到周四。</div><div class="context-route">示意文本 / TWO-PASS TRANSCRIPTION</div>',retrieve:'<div class="context-map"><span>会议议程</span><span class="matched">发布计划</span><span>项目资料</span><span class="matched">回滚清单</span><span>历史纪要</span><span class="matched">负责人</span></div><div class="context-route">QUERY → KEYWORD + SEMANTIC* → CONTEXT<br>* 语义检索按需开启</div>',stream:'<div class="stream-code"><span>01 <b>SCENE</b> · 当前场景</span><span>02 <b>CONTEXT</b> · 相关资料</span><span>03 <b>STREAM</b> · 译文逐字呈现</span><div class="trace-merge"><i></i><span>CAPTION_STREAM</span><i></i></div><span class="stream-line">周四先向 10% 用户发布…</span><i class="trace-cursor">▌</i></div>'};
function selectTech(name,focus=false){
  const data=techSteps[name];
  $$('[data-tech]').forEach(b=>{const selected=b.dataset.tech===name;b.classList.toggle('active',selected);b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;if(selected&&focus)b.focus();});
  $('#tech-panel').setAttribute('aria-labelledby',`tech-${name}`);$('#tech-kicker').textContent=data.kicker;$('#tech-title').textContent=data.title;$('#tech-description').textContent=data.description;
  $('#tech-tags').replaceChildren(...data.tags.map(text=>Object.assign(document.createElement('span'),{textContent:text})));
  $('.tech-visual').dataset.visual=name;$('.tech-visual').innerHTML=techVisuals[name];
}
let pipelineTimers=[];
function cancelPipeline(){pipelineTimers.forEach(clearTimeout);pipelineTimers=[];$('#run-pipeline').replaceChildren(document.createTextNode('运行链路演示 '),Object.assign(document.createElement('span'),{textContent:'▶',ariaHidden:'true'}));}
$$('[data-tech]').forEach((button,i,buttons)=>{
  button.addEventListener('click',()=>{cancelPipeline();selectTech(button.dataset.tech);});
  button.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%buttons.length;if(e.key==='ArrowLeft')next=(i+buttons.length-1)%buttons.length;if(e.key==='Home')next=0;if(e.key==='End')next=buttons.length-1;if(next!==undefined){e.preventDefault();cancelPipeline();selectTech(buttons[next].dataset.tech,true);}});
});
$('#run-pipeline').addEventListener('click',()=>{cancelPipeline();$('#run-pipeline').textContent='演示运行中 · 点击可重播';Object.keys(techSteps).forEach((name,i)=>{if(i===0)selectTech(name);else pipelineTimers.push(setTimeout(()=>selectTech(name),i*1500));});pipelineTimers.push(setTimeout(cancelPipeline,6200));});
selectTech('capture');
if(matchMedia('(hover: hover)').matches&&!motion.matches)$$('.craft-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--spot-x',`${(e.clientX-r.left)/r.width*100}%`);card.style.setProperty('--spot-y',`${(e.clientY-r.top)/r.height*100}%`);},{passive:true});});

// A scroll-driven chapter with native scrolling and a complete static reading path.
const storyEngine=mountSignalEngine($('#story-field'));
document.documentElement.classList.add('story-enhanced');
const chapters=[
  {heading:'先听见，真实的对话。',description:'双路音频各自进入识别管线，在本机成为可处理的文字。'},
  {heading:'再连接，你准备好的背景。',description:'围绕当前问题，从场景资料中召回相关片段；可选语义检索补充近义表达。'},
  {heading:'最后，让思路进入表达。',description:'将当前问题与相关上下文交给回答服务，让建议逐字进入你的视线。'}
];
let storyFrame=0,storyChapter=-1;
function updateStory(){
  storyFrame=0;const section=$('#signal-story'),rect=section.getBoundingClientRect();
  const distance=Math.max(1,section.offsetHeight-window.innerHeight);
  const progress=Math.max(0,Math.min(1,-rect.top/distance));
  const chapter=Math.min(2,Math.floor(progress*3));
  $('.story-progress span').style.transform=`scaleX(${progress})`;
  if(chapter!==storyChapter){storyChapter=chapter;storyEngine.setShape(chapter);$$('[data-story-word]').forEach((el,i)=>el.classList.toggle('active',i===chapter));$('#story-index').textContent=`0${chapter+1} / 03`;$('#story-heading').textContent=chapters[chapter].heading;$('#story-description').textContent=chapters[chapter].description;}
}
window.addEventListener('scroll',()=>{if(!storyFrame)storyFrame=requestAnimationFrame(updateStory);},{passive:true});
window.addEventListener('resize',()=>{if(!storyFrame)storyFrame=requestAnimationFrame(updateStory);});
updateStory();
// Real controls for pausing non-essential motion, independent of system preference.
const motionControl=document.createElement('button');motionControl.className='motion-control';motionControl.type='button';motionControl.setAttribute('aria-pressed','false');motionControl.setAttribute('aria-label','暂停装饰动效');motionControl.textContent='Ⅱ 动效';
let userPaused=false;
motionControl.addEventListener('click',()=>{userPaused=!userPaused;document.documentElement.classList.toggle('user-paused',userPaused);engine.setPaused(userPaused);storyEngine.setPaused(userPaused);motionControl.setAttribute('aria-pressed',String(userPaused));motionControl.setAttribute('aria-label',userPaused?'恢复装饰动效':'暂停装饰动效');motionControl.textContent=userPaused?'▶ 动效':'Ⅱ 动效';});
document.body.append(motionControl);

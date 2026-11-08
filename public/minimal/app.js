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
  $('#ocr-explanation').textContent = ocr ? '增加 Paddle Q8 与版面检测，面向复杂表格、公式和阅读顺序。模型约 1.23 GB，需要更多磁盘与内存，具体准确度取决于文件。' : '默认系统 OCR，无需下载 OCR 权重。适合常规文字与清晰扫描件；复杂表格、公式可考虑本机增强。';
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

// A projected signal sculpture: small, procedural, and no graphics dependency.
const canvas = $('#signal-field');
const ctx = canvas.getContext('2d');
if (ctx) {
  let width = 0, height = 0, visible = true, frameId = 0, lastFrame = 0;
  let lastTime = 0, phase = 0;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.7);
  function resize() { const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height; canvas.width = width * dpr(); canvas.height = height * dpr(); ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0); draw(0); }
  function project(x, y, z, rotation) {
    const x1 = x * Math.cos(rotation) + z * Math.sin(rotation);
    const z1 = -x * Math.sin(rotation) + z * Math.cos(rotation);
    const tilt = .92;
    const y1 = y * Math.cos(tilt) - z1 * Math.sin(tilt);
    const depth = y * Math.sin(tilt) + z1 * Math.cos(tilt);
    const perspective = 740 / (740 + depth);
    return [width * .51 + x1 * perspective, height * .47 + y1 * perspective, depth];
  }
  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    const radius = width * .42;
    // An orbit of filament strands around the conversation, never behind the text itself.
    for (let ring = 0; ring < 22; ring++) {
      const latitude = (ring / 21 - .5) * 2;
      const rr = Math.sqrt(Math.max(0, 1 - latitude * latitude)) * radius;
      const yy = latitude * radius;
      ctx.beginPath();
      for (let j = 0; j <= 110; j++) {
        const a = j / 110 * Math.PI * 2;
        const ripple = Math.sin(a * 5 + t * .3 + ring * .21) * 2;
        const [x, y] = project(Math.cos(a) * (rr + ripple), yy, Math.sin(a) * rr, .35 + t * .018);
        if (!j) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const alpha = .06 + .08 * (1 - Math.abs(latitude));
      ctx.strokeStyle = `rgba(153,120,209,${alpha})`; ctx.lineWidth = .55; ctx.stroke();
    }
    for (let meridian = 0; meridian < 10; meridian++) {
      const a = meridian / 10 * Math.PI;
      ctx.beginPath();
      for (let j = 0; j <= 96; j++) {
        const b = j / 96 * Math.PI * 2;
        const [x, y] = project(Math.cos(b) * Math.cos(a) * radius, Math.sin(b) * radius, Math.cos(b) * Math.sin(a) * radius, .35 + t * .018);
        if (!j) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(153,120,209,.055)'; ctx.lineWidth = .6; ctx.stroke();
    }
    // Wide diagonal equator and travelling pulses.
    ctx.beginPath();
    for (let i = 0; i <= 150; i++) {
      const a = i / 150 * Math.PI * 2;
      const [x, y] = project(Math.cos(a) * radius * 1.16, Math.sin(a * 2 + t * .12) * 17, Math.sin(a) * radius * 1.16, .35);
      if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#b9a2e93b'; ctx.lineWidth = .8; ctx.stroke();
    for (let i = 0; i < 5; i++) {
      const a = i * 1.26 + t * .13;
      const [x, y] = project(Math.cos(a) * radius * 1.16, Math.sin(a * 2 + t * .12) * 17, Math.sin(a) * radius * 1.16, .35);
      const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
      g.addColorStop(0, '#c1a3f640'); g.addColorStop(1, '#c1a3f600');
      ctx.fillStyle = g; ctx.fillRect(x - 12, y - 12, 24, 24);
      ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fillStyle = i % 2 ? '#b4d2bd' : '#bc9ce9'; ctx.fill();
    }
  }
  function loop(time) {
    frameId = 0;
    if (document.hidden || !visible || motion.matches) { lastTime = 0; return; }
    if (time - lastFrame > 1000 / 25) {
      if (lastTime) phase += Math.min((time - lastTime) / 1000, .1);
      lastTime = time; lastFrame = time; draw(phase);
    }
    frameId = requestAnimationFrame(loop);
  }
  function start() { if (!frameId && visible && !document.hidden && !motion.matches) frameId = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(frameId); frameId = 0; lastTime = 0; }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) start(); else stop(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  motion.addEventListener('change', () => { if (motion.matches) { stop(); draw(0); playScene(currentScene); } else start(); });
  resize(); start();
}

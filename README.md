# NextThought · Design Gallery

同一个产品，不同的表达。这个公开仓库收集 NextThought 网站的不同设计风格，README 本身就是展示画廊。

**一个风格，一个固定入口。** 同一风格的日常优化在原页面继续维护；只有设计语言明显不同的新方案才新增路径，不为每次小修改建立一个对照版本。更新页面时，同步对应首页预览、访问地址和本 README。

## 风格展示

<!-- STYLES:START -->
[打开在线展示画廊](https://nextthought.vercel.app/) · [并排对比风格](https://nextthought.vercel.app/compare/)

[![展示画廊首页](public/previews/gallery-home.png?v=0765b7ae9ae3)](https://nextthought.vercel.app/)

<!-- gallery-source:318bf14527f740e06b99eb446f555d707be7dea037a696945e76e5580e178b3c preview:0765b7ae9ae348e2afbdb35879b908f0c352dec6682f649c51d608cf3de12075 -->

### Minimal · 记录 · 翻译 · 整理

[![Minimal 首页](public/previews/minimal-home.png?v=baabbd81258c)](https://nextthought.vercel.app/minimal/)

以轻盈、易读的方式呈现中英实时字幕、会议记录、纪要和资料整理。

**访问页面：[https://nextthought.vercel.app/minimal/](https://nextthought.vercel.app/minimal/)**

<!-- style:minimal source:b583bfa50e1777f83fd452470ba4e25c6c94b125b6f69ce808d15948916b9579 preview:baabbd81258cf6f52bd3987cd3f57e18a2ec740a9d7b3d513d77fde2d7f71a37 -->

### Technology · 实时 · 清晰 · 有脉络

[![Technology 首页](public/previews/technology-home.png?v=3b3f9202b4fc)](https://nextthought.vercel.app/technology/)

用实时字幕串联同声传译、对话转写和会后纪要，展示从声音到记录的完整流程。

**访问页面：[https://nextthought.vercel.app/technology/](https://nextthought.vercel.app/technology/)**

<!-- style:technology source:cbfa03420b0f0ef104be9f551a24f2e1c11a568a48dee6f0d4e08958c1d2060f preview:3b3f9202b4fc02b8a664dd701674d82cc96eba46a703f31e33cf7deccf388d64 -->

### Story · 产品 · 场景 · 对话

[![Story 首页](public/previews/story-home.png?v=c8e0fec4f1ee)](https://nextthought.vercel.app/story/)

通过产品演示展示中英字幕、会议记录、资料问答和会后纪要如何协同工作。

**访问页面：[https://nextthought.vercel.app/story/](https://nextthought.vercel.app/story/)**

<!-- style:story source:2d2464f7dfebb59831478a53ecf412295dae493b17cef1643884eb60bb3c20f0 preview:c8e0fec4f1ee82bc4969c29c4778ba8c351318452b502dc3d663fd38d9cc9c49 -->

### Classic · 原生 · 专注 · 全流程

[![Classic 首页](public/previews/classic-home.png?v=e83164be9fe3)](https://nextthought.vercel.app/classic/)

以原生桌面应用为主角，完整展现实时转写、资料整理、会议协作和会后复盘。

**访问页面：[https://nextthought.vercel.app/classic/](https://nextthought.vercel.app/classic/)**

<!-- style:classic source:3b2b810d5d4697401668ab42c3454738e0d6c58fc3a2c9b8a16f08126d666f6d preview:e83164be9fe3bed7f9903d966a47f057d2d7b0e11febd680b2afa4caf7afe9fe -->

### Final · 人文 · 对话 · 双语

[![Final 首页](public/previews/final-home.png?v=0af356707c01)](https://nextthought.vercel.app/final/)

以中英会议的一天展开叙事：实时字幕、双语理解、会后记录与资料沉淀，中英双语。

**访问页面：[https://nextthought.vercel.app/final/](https://nextthought.vercel.app/final/)**

<!-- style:final source:6ea8c751f7ed2f7cabb7c11af5f6d14d7eee3b2b5ceeaf13504d16ec052b3d1c preview:0af356707c01e5df093cdc5362d3291c1cf11cb9ce066a668c31459706e2d94f -->

### Turn · 一天 · 对话 · 纪要

[![Turn 首页](public/previews/turn-home.png?v=d980a0e0da94)](https://nextthought.vercel.app/turn/)

跟随一天中的例会、跨语言交流与深夜整理，感受实时理解如何自然沉淀为清晰纪要，中英双语。

**访问页面：[https://nextthought.vercel.app/turn/](https://nextthought.vercel.app/turn/)**

<!-- style:turn source:91d81b769708fe41ae9abcfb19b447d93a49e25e2c1ea719e954a8e555927bf9 preview:d980a0e0da9475b3b0ef0f7233a35e78438c3b990f02e6868d42f73fcacb29e2 -->
<!-- STYLES:END -->

## 本地运行

需要 Node.js 24（与正式构建一致，可用 `nvm use`）；本地预览另需 Python 3。没有 npm 依赖。

```sh
git clone https://github.com/OmnixSI/NextThought-Website.git
cd NextThought-Website
npm run dev
```

打开 http://127.0.0.1:4173/ 为画廊；`/minimal/`、`/technology/`、`/story/`、`/classic/`、`/final/`（英文版 `/final/en/`）和 `/turn/`（英文版 `/turn/en/`）是六种独立风格，`/compare/` 为并排对比工具。对比工具不算一种设计风格，可分别操作两侧页面，并切换桌面版面或自适应视口。

## 修改与新增风格

| 内容 | 位置 |
| --- | --- |
| 风格名称、特点、入口、预览图路径 | `styles.json`（唯一登记来源） |
| 画廊布局与样式 | `public/index.html`、`public/gallery.css` |
| Minimal 全部页面代码和素材 | `public/minimal/` |
| Technology 全部页面代码和素材 | `public/technology/` |
| Story 全部页面代码和素材 | `public/story/` |
| Classic 全部页面代码和素材 | `public/classic/` |
| Final 生成的中英页面、样式、脚本和素材 | `public/final/`（源码在 `scripts/final-i18n/`，见 [Final 维护说明](docs/FINAL-NOTES.md)） |
| Turn 生成的中英页面、样式、脚本和素材 | `public/turn/`（源码在 `scripts/turn-i18n/`，见 [Turn 维护说明](docs/TURN-NOTES.md)） |
| 并排对比工具 | `public/compare/` |
| 每个风格的当前首页截图 | `public/previews/<slug>-home.png` |
| 画廊自身的首页截图 | `public/previews/gallery-home.png` |

每种风格的 HTML、CSS、JavaScript、字体与产品图均独立放在自己的目录，避免修改一套风格时改变另一套。日常迭代直接修改对应目录。**只有全新的设计语言才新增 `public/<new-style>/` 并登记到 `styles.json`。**

完成视觉修改后，更新对应的真实首页截图，再运行：

```sh
npm run docs:sync
npm run check
npm run build
```

`docs:sync` 会把登记信息、截图、页面地址同步到在线画廊和 README。检查会比较当前源码与截图的指纹：README 过期、漏登记页面、入口或截图缺失时不通过。源码指纹写在 Markdown 注释中，不干扰画廊阅读；实际截图仍需维护者在浏览器中更新。

详细协作流程见 [CONTRIBUTING.md](CONTRIBUTING.md)，代理维护约定见 [AGENTS.md](AGENTS.md)。GitHub Actions 自动执行检查与构建。

## 部署

线上地址为 https://nextthought.vercel.app/ 。Vercel 项目为 `nextthought`；本仓库目前尚未连接 Git 自动部署，单独 push 不会自动改变正式站。

根目录 `vercel.json` 用于 Git 导入：Framework Other，Build `npm run check && npm run build`，Output `dist`，无依赖安装命令。沿用现有项目连接仓库，避免创建重复项目影响域名。

`public/vercel.json` 用于纯静态文件发布；两份安全响应头须保持一致。页面只允许被同源画廊嵌入，供 `/compare/` 使用。发布后可执行 `node scripts/verify-live.mjs` 核验线上文件。

## 产品与素材

本仓库只包含网站，不包含桌面应用、安装包、模型权重、用户资料或凭据。演示不采集音频、不调用模型、不发送遥测。桌面应用下载仍指向其私有 GitHub Releases，需要相应访问权。

Minimal 从已发布的第一版恢复；Technology 为 Think in Flow 技术展示风格，Story 来自已合并的 PR #1，以场景摄影与产品流程展开叙事。设计依据见 [COMPETITION-DIRECTION.md](COMPETITION-DIRECTION.md)，既有验证见 [VALIDATION-COMPETITION.md](VALIDATION-COMPETITION.md)，画廊与路径迁移验证见 [VALIDATION-GALLERY.md](VALIDATION-GALLERY.md)，Story 接入验证见 [VALIDATION-STORY.md](VALIDATION-STORY.md)。

Technology 分享图生成工具保留在 `scripts/`：`python3 scripts/make-og.py` 后，可在 macOS 使用 `swift scripts/render-og.swift scripts/og.svg public/technology/og.png` 更新对应分享图（与首页截图分开维护）；字体许可见 [FONT-LICENSE.txt](FONT-LICENSE.txt)；Story 的 HarmonyOS Sans 与 Geist / Geist Mono 字体许可保留在 `public/story/assets/fonts/` 子目录；Story 本地打包的 GSAP 与 Lenis 版本和许可见 `public/story/assets/vendor/README.md`。当前未附加通用开源许可证，产品名称、截图及其他素材保留原有权利。

不要提交 token、私钥、`.vercel/`、`dist/` 或本机 `validation/` 输出。

### Story 部署维护

Story 保留用户提供源码的独立样式、主题、共享动效及页面脚本加载顺序；不要重新合并为不透明的 app.js。`npm run docs:sync` 会为所有 Story CSS / JS 入口计算内容版本，避免已缓存的旧资源混入新页面。字体、图片及视口尺寸变化后会重新测量滚动区间。

Story 使用本地随站分发的 HarmonyOS Sans SC Regular / Medium，保留原始字体文件与许可，页脚展示字体署名。`public/story/` 为当前维护入口，修改后同步首页截图、README 与线上地址。

Story 产品画面由 `scripts/story-screens.mjs` 生成：运行 `npm run screens:build` 更新 12 组浅色 / 深色矢量界面，再检查页面、更新首页截图并 `npm run docs:sync`。画面与文案的对应表、合成来源及维护约定见 [Story 产品展示](docs/STORY-ARTWORK.md)。

Story 动效与手机适配由 `styles/motion-polish.css` 和 `scripts/motion-polish.js` 维护：入场采用缓出曲线，设备位移由滚动进度控制；触屏场景卡片使用原生滑动，支持定位按钮及系统减少动态效果。修改后需复核 320–430 手机竖屏、短横屏、平板和桌面，更新实际首页预览。部署前须完成检查和构建并等 CI 通过；发布后确认正式别名与逐文件校验成功。

首页首图由 `scripts/hero-handoff.js` 维护单一设备的连续交接，禁止在锚点与目标位置同时淡入两台完整设备。文案与设备共享视口进度；原左右场景叙事继续保留。手机窄屏、短横屏及初始减少动态效果访问采用顺序阅读。设备材质、界面与双路识别动线仍在 `scripts/story-screens.mjs` 编辑。

### Classic 维护

Classic 继续维护在 `/classic/`，本次更新沿用原风格入口。六步工作链路直接嵌入首页，由现有滚动器驱动；该栏目及附近区域关闭磁吸，避免与横向演示争抢滚动位置。其他栏目在手势停下并接近栏目起点时平滑吸附，参数集中在 `public/classic/scripts/section-snap.js` 的 `CONFIG`。

Classic 的完整笔记本素材包含顶部刘海，浅色与深色界面分别生成；裁切卡片保留原布局。`npm run screens:build` 可重新生成这些素材，`npm run docs:sync` 会为 Classic 的 CSS、JS、SVG 和主题图片写入内容版本。首页使用局部背景，离屏栏目暂停装饰动画与无效更新。变更和实际验证范围见 [Classic 更新验证](VALIDATION-CLASSIC.md)。

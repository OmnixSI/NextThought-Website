# NextThought 网站验证

日期：2026-11-08。验证范围为网站页面、静态发布文件和托管跳转；未重新验证桌面软件的音频、OCR 或 AI 准确度。

## 本地检查

- `npm run docs:sync`、`npm run check`、`npm run build` 均通过。构建输出 425 个文件，约 51.3 MB。
- 在 1280×844 与 390×844 视口复核六套风格页面及主要演示交互。页面模板、样式规则与交互逻辑保持原样；改动集中在品牌、文案与对应演示素材。
- Story 手机页有一个装饰性元素约 2px 超出视口；不影响内容或控件。这是原有装饰效果，未为改名调整布局。
- 试用邮件流程使用模拟 SMTP 验证，未连接外部邮件服务器，也未发送真实申请。

## 正式站

- 网站：<https://nextthought.vercel.app/>；Vercel 项目 `nextthought`。
- 正式站 Production 部署状态为 READY，部署来源为本仓库 `main`。
- 新站首页与 `/minimal/` 返回 HTTP 200。公开静态文件 424 个逐一与本地 `dist` 比对，SHA-256 完全一致；CSP、Permissions-Policy、X-Content-Type-Options 和 Referrer-Policy 均存在。
- `https://interviewhacker.vercel.app` 配置为 308 永久跳转至新站。实测 `/minimal/?src=legacy&code=42` 保留原路径及两个查询参数。

## 视觉记录

首页与六套页面预览位于 `public/previews/`。本次站点核验不代表对 NextThought 桌面软件功能或识别准确性的测试。

# Personal Academic Homepage

静态零构建的个人学术与开源主页（面向 GitHub Pages：`https://minorfox.github.io`）。

## 特性

- **清爽无框学术排版**：纯白背景 + 学术钴蓝（`#0563bb`）点缀 + 左侧悬浮圆形图标导航栏 + 极简研究方向副标题 + 双栏时间线履历，内置打印友好的 CV 样式。
- **中英双语切换**：右上角一键切换中文 / English，并支持 `?lang=en` 或 `?lang=zh` 链接直达。
- **数据与视图分离**：所有简介、动态、37 篇已核验论文（含 BibTeX）、开源项目、教学课程与获奖信息均集中在 `js/data.js`，后续更新无需改动 HTML/CSS。
- **零构建依赖**：纯静态 HTML + CSS + Vanilla JS，包含 `.nojekyll`，推送至 GitHub 即可直接上线，也支持本地双击 `index.html` 离线打开。

## 目录结构

```text
minorfox.github.io/
├── index.html             # 主页面结构
├── .nojekyll              # 禁用 GitHub Pages 默认 Jekyll 处理
├── assets/
│   ├── hero-bg.jpg        # 顶部横幅背景图
│   ├── portrait.jpg       # 个人形象照
│   ├── foxreader-icon.png # FoxReader 项目图标
│   └── favicon.svg        # 网页图标
├── css/
│   └── styles.css         # 无框学术风响应式样式表
└── js/
    ├── data.js            # 中英双语结构化数据（日常维护仅改此文件）
    └── app.js             # 双语渲染、论文筛选与 BibTeX 弹窗
```

## 本地预览

方式一：直接双击 `index.html` 在浏览器中打开。

方式二：使用本地静态服务器预览：

```powershell
npx --yes serve . -l 4173
# 打开 http://127.0.0.1:4173
```

## 发布至 GitHub Pages (`https://minorfox.github.io`)

1. 在 GitHub（账号 `minorfox`）新建公开仓库，仓库名必须精确为 **`minorfox.github.io`**（保持空仓库，无需勾选 README/License）。
2. 在本目录执行推送：

```powershell
git remote add origin https://github.com/minorfox/minorfox.github.io.git
git push -u origin main
```

3. 推送后 1–2 分钟，GitHub Pages 会自动从 `main` 分支根目录部署，访问 `https://minorfox.github.io` 即可生效。
4. 建议同步在 GitHub 个人资料（Profile → Website）中将个人网站填写为 `https://minorfox.github.io`。

## 日常维护

- **新增论文**：在 `js/data.js` 的 `publications` 数组顶部添加一条记录（含 `bibtex`、`venueShort`、`tier`、`topics`、`role` 与 `selected`）。
- **更新近期动态**：在 `js/data.js` 的 `news` 数组顶部添加条目。
- **补充教育背景**：`timeline` 默认与西南财经大学官网公开页保持一致（仅列电子科技大学博士/硕博连读阶段），如需展示本科学历可直接追加到 `timeline` 数组。

# 如何修改主页文案

以后修改个人简介、研究方向、论文、荣誉、公共传播和联系方式时，主要修改根目录下的 `content.js`，不需要修改 `index.html`、`research.html` 或 CSS 文件。

## 在 GitHub 网页上修改

1. 打开仓库：`SchwindelChen/schwindelchen.github.io`
2. 点击 `content.js`。
3. 点击右上角铅笔图标（Edit this file）。
4. 修改对应的 `zh` 中文字段或 `en` 英文字段。
5. 点击右上角 `Commit changes`。
6. 等待 GitHub Pages 自动重新发布，网页就会更新。

## 文案位置

- `person`：姓名、身份、首页简介
- `about`：个人简介两段文字
- `research`：研究方向和近期关注议题
- `selected`：首页代表性成果卡片
- `honors`：主要个人荣誉
- `publicCommunication`：公共传播
- `contact`：邮箱
- `published`：已发表及录用成果、摘要、关键词和会议汇报
- `working`：工作论文

每一条双语内容都由 `zh` 和 `en` 两个字段组成。只改中文时修改 `zh`，只改英文时修改 `en`。

## 注意

- 保留英文或中文字符串两侧的引号和末尾逗号。
- 正式网站默认使用奶黄色＋照片版。
- 黑白极简版通过 `?theme=minimal` 访问。
- `style.css`、`style-minimal.css` 和 `style-photo-cream.css` 属于排版文件，除非要改设计，否则不要修改。

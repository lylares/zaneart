# 生日纪念册 (Birthday Memory Album)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6.svg)
![Emotion](https://img.shields.io/badge/Emotion-11.14.0-DB7093.svg)

一个精美的响应式生日纪念网站，使用React、TypeScript和Emotion开发，集成了照片墙、里程碑时间线、背景音乐和动画效果，为重要的人创造特别的生日惊喜。

[English](./README_EN.md) | 中文

## ✨ 特性

- 🌟 **精美设计**：现代化UI设计，流畅的动画效果
- 📱 **响应式布局**：适配各种设备尺寸，从手机到桌面
- 🖼️ **照片墙**：展示珍贵回忆的照片墙组件
- 📝 **里程碑时间线**：记录重要时刻的时间线组件
- 🎵 **背景音乐**：集成背景音乐播放器，增强氛围
- 🎨 **丰富动画**：使用Framer Motion实现的丰富动画效果
- 🔒 **图片保护**：支持设置密码保护重要照片

## 🖥️ 演示

[带后端演示](https://zaneart.com)
[不带后端Vercel演示](https://vercel.zaneart.com)

## 🛠️ 技术栈

- **前端框架**: [React 18](https://reactjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **路由**: [React Router v7](https://reactrouter.com/)
- **样式方案**: [Emotion](https://emotion.sh/)
- **动画库**: [Framer Motion](https://www.framer.com/motion/)
- **构建工具**: [Create React App](https://create-react-app.dev/) + [CRACO](https://github.com/gsoft-inc/craco)
- **其他库**:
  - [React Confetti](https://github.com/alampros/react-confetti)
  - [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)
  - [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 快速部署

选择以下任一平台，点击一键部署按钮，即可无服务器快速部署应用：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flylares%2Fzaneart) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lylares/zaneart)

## 本地部署

### 前提条件

- Node.js 16.x 或更高版本
- npm 

### 安装

1. 克隆仓库
```bash
git clone https://github.com/lylares/zaneart.git
cd zaneart
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
```

## 📂 项目结构

```
src/
├── assets/       # 静态资源文件
├── components/   # React组件
│   ├── About.tsx             # 关于页面组件
│   ├── ErrorBoundary.tsx     # 错误边界组件
│   ├── Footer.tsx            # 页脚组件
│   ├── Gallery.tsx           # 照片墙组件
│   ├── Header.tsx            # 头部导航组件
│   ├── Intro.tsx             # 介绍页面组件
│   ├── Milestones.tsx        # 里程碑时间线组件
│   └── Navigation.tsx        # 导航菜单组件
├── config/       # 配置文件
├── styles/       # 全局样式定义
├── App.tsx       # 应用程序主组件
└── index.tsx     # 应用程序入口点
```

## 🔧 自定义

### 修改内容

1. 编辑 `src/components/Intro.tsx` 修改介绍内容
2. 编辑 `src/components/Gallery.tsx` 添加或修改照片
3. 编辑 `src/components/Milestones.tsx` 修改里程碑事件
4. 在 `src/styles/GlobalStyles.tsx` 中自定义主题颜色和样式变量

### 更换背景音乐

在 `App.tsx` 中修改音频URL:

```tsx
const audioUrl = '你的音频文件URL';
```

## 📝 许可证

MIT © [lylares]

## 🙏 致谢

- 感谢所有使用到的开源库的作者

## 🤝 贡献

欢迎任何形式的贡献，包括但不限于:

1. 报告错误
2. 提交改进建议
3. 提交代码贡献
4. 改进文档

请先提交issue讨论您想要改变的内容。

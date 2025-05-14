[English Version](./README_EN.md) | [中文版](./README.md)

# Mind's Islet (心灵小岛)

一个基于React + TypeScript + Vite构建的心理健康与情感交流平台，提供情感宣泄和心灵岛屿发现功能。

## 项目介绍

Mind's Islet (心灵小岛) 是一个专注于情感表达和心理健康的Web应用。在这里，用户可以：

- 通过「情感宣泄洞」匿名或实名发布自己的情感和想法
- 在「岛屿发现」中探索他人分享的公开情感，给予支持和共鸣
- 使用标签系统对情感内容进行分类和筛选
- 通过情感反馈系统（抱抱、理解、共鸣等）与他人互动

## 功能模块

### 情感宣泄洞 (EmotionVentingHole)

情感宣泄洞是用户表达情感的私人空间，具有以下特点：

- 支持匿名/实名发布情感内容
- 可设置私密/公开状态
- 标签系统帮助归类情感
- 情感反馈系统（抱抱、理解、共鸣）

### 岛屿发现 (IsletDiscovery)

岛屿发现让用户探索他人分享的公开情感，特点包括：

- 基于标签的情感内容筛选
- 随机发现模式
- 情感互动与支持系统

## 项目结构

```
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── assets/           # 图片等资源文件
│   ├── components/       # 组件
│   │   ├── EmotionVentingHole/  # 情感宣泄洞组件
│   │   ├── IsletDiscovery/      # 岛屿发现组件
│   │   └── Layout/              # 布局组件
│   ├── App.tsx          # 应用入口组件
│   └── main.tsx         # 应用渲染入口
├── index.html           # HTML模板
├── package.json         # 项目依赖配置
└── vite.config.ts       # Vite配置
```

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式**: CSS

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## ESLint配置

本项目使用ESLint进行代码质量控制。如需启用更严格的类型检查规则，可以更新配置：

```js
export default tseslint.config({
  extends: [
    // 使用推荐的类型检查规则
    ...tseslint.configs.recommendedTypeChecked,
    // 或使用更严格的规则
    ...tseslint.configs.strictTypeChecked,
    // 可选的样式规则
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

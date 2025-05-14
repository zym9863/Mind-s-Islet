[English Version](./README_EN.md) | [中文版](./README.md)

# Mind's Islet

A psychological health and emotional communication platform built with React + TypeScript + Vite, offering emotion venting and islet discovery features.

## Project Introduction

Mind's Islet is a web application focused on emotional expression and mental health. Here, users can:

- Anonymously or publicly share their emotions and thoughts through the "Emotion Venting Hole"
- Explore publicly shared emotions from others in "Islet Discovery" and offer support and resonance
- Use a tag system to categorize and filter emotional content
- Interact with others through an emotional feedback system (hug, understand, resonate, etc.)

## Features

### Emotion Venting Hole

A private space for users to express their emotions, featuring:

- Support for anonymous/public emotional posts
- Option to set content as private or public
- Tag system for emotion categorization
- Emotional feedback system (hug, understand, resonate)

### Islet Discovery

Allows users to explore publicly shared emotions, featuring:

- Tag-based filtering of emotional content
- Random discovery mode
- Emotional interaction and support system

## Project Structure

```
├── public/               # Static resources
├── src/                  # Source code
│   ├── assets/           # Images and other assets
│   ├── components/       # Components
│   │   ├── EmotionVentingHole/  # Emotion Venting Hole component
│   │   ├── IsletDiscovery/      # Islet Discovery component
│   │   └── Layout/              # Layout components
│   ├── App.tsx          # App entry component
│   └── main.tsx         # App rendering entry
├── index.html           # HTML template
├── package.json         # Project dependencies
└── vite.config.ts       # Vite configuration
```

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styles**: CSS

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## ESLint Configuration

This project uses ESLint for code quality control. To enable stricter type checking rules, update the configuration as follows:

```js
export default tseslint.config({
  extends: [
    // Recommended type-checked rules
    ...tseslint.configs.recommendedTypeChecked,
    // Or stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optional stylistic rules
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
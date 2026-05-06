# Quest Dungeon / 任务地下城

> 动作游戏化的高级待办清单 —— 把"打勾"变成"斩击"。

![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Platform](https://img.shields.io/badge/platform-Web%20%E2%86%92%20Android-5c8898?style=flat-square)

---

## 项目简介

Quest Dungeon 是一款受《空洞骑士》《死亡细胞》启发的暗黑风格任务管理工具。核心愿景是将枯燥的任务完成动作转化为极具打击感的"斩杀"体验。

- 每个任务 = 一只游荡的阴影怪物（Normal / Elite / Boss）
- 完成任务 ≠ 点击复选框，而是**挥剑斩击**
- 击杀后怪物破碎，掉落灵魂，收入猎人图鉴

---

## 当前状态：Web 原型

本项目当前为 **Web 技术原型**，使用 React + Vite + TailwindCSS + Motion 构建，用于验证核心交互与视觉设计。

### 已实现功能

| 功能 | 状态 |
|---|---|
| 暗黑美学 UI（深灰 / 幽灵蓝 / 枯骨白） | ✅ |
| 任务难度系统（普通 / 精英 / BOSS） | ✅ |
| 怪物动态呼吸与悬浮动画 | ✅ |
| 点击受击反馈（抖动 + 火花粒子） | ✅ |
| 滑动斩击交互（剑光 + 破碎 + 粒子爆发） | ✅ |
| 猎人图鉴与统计面板 | ✅ |
| 本地数据持久化 | ✅ |
| Widget 概念预览 | ✅ |

### 快速启动

```bash
npm install
npm run dev
```

---

## 路线图：迁移至安卓 App

Web 原型验证完成后，项目将完整迁移至 **Android 原生应用**，以实现 PRD 中定义的系统级体验。

### 第一阶段：Flutter 核心迁移
- [ ] 搭建 Flutter 工程架构
- [ ] 复刻暗黑 UI（Dungeon / Journal / Widget Preview）
- [ ] 接入 Flame 2D 引擎实现粒子系统
- [ ] 任务数据本地存储（SQLite）

### 第二阶段：动作反馈强化
- [ ] 接入 `vibration` 插件，模拟不同难度怪物的震动频率
- [ ] 接入 `audioplayers` 插件，实现斩击音效与氛围音轨
- [ ] 优化 60 帧动画性能

### 第三阶段：桌面小组件
- [ ] 开发原生 Android AppWidgetProvider
- [ ] 实现 2x2 桌面怪物组件（显示最高优先级任务）
- [ ] 支持桌面一键斩杀（PendingIntent 交互）

---

## 技术栈

**当前（Web 原型）**
- React 18 + TypeScript
- Vite + TailwindCSS v4
- Framer Motion（动画与交互）
- Lucide React（图标）

**未来（Android App）**
- Flutter + Dart
- Flame 引擎（2D 粒子与特效）
- `vibration` + `audioplayers` 插件
- Android `RemoteViews`（桌面小组件）

---

## 设计参考

- **视觉风格**：《空洞骑士》《死亡细胞》冷峻暗黑美学
- **交互理念**：动作游戏的即时反馈（Visual / Haptic / Audio）
- **字体**：Julius Sans One + Outfit

---

## 目录结构

```
.
├── src/
│   ├── app/
│   │   ├── components/      # UI 组件（TaskItem / ShadowCreature / Sigil）
│   │   ├── pages/           # 页面（Dungeon / Journal / WidgetView）
│   │   ├── data/            # 初始任务数据
│   │   └── hooks/           # 自定义 Hooks（localStorage）
│   └── styles/              # 全局样式与字体
├── 产品需求文档 (PRD).md    # 完整产品需求
└── README.md                # 本文件
```

---

## License

MIT

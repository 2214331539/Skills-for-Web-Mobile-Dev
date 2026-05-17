# 模块化开发 Skills

一个面向现代 Web / App / 小程序开发的可复用 Coding-Agent Skills 集合。

该仓库的目标是：

将传统软件开发中常见、重复性的工程模块抽象为可复用的 Skill，使 Coding Agent 可以直接调用并生成对应模块。

开发者与 Coding Agent 不再需要反复从零构建相同基础设施，而是可以通过安装 Skill 的方式，快速生成稳定、可配置、面向生产环境的功能模块。

------

# 仓库目标

本仓库专注于抽象固定化的软件开发工作流与基础设施模块，例如：

- 认证系统（Authentication）
- Admin 后台系统
- 文件上传系统
- 支付模块
- 通知系统
- RBAC 权限系统
- CRUD 脚手架
- 部署工作流
- AI 基础设施模块
- 以及其他可复用工程组件

------

# 支持的 Coding Agent

这些 Skills 主要面向以下 Agent 编程环境：

- Codex
- Claude Code
- Cursor Agent
- Roo Code
- Continue
- Cline
- OpenHands
- 以及其他 Agentic Coding 环境

------

# 仓库结构

```text
skills/
├── reusable-auth-module/
│   ├── SKILL.md
│   ├── templates/
│   ├── references/
│   ├── scripts/
│   └── examples/
│
├── another-skill/
│   └── ...
```

`skills/` 目录下的每一个文件夹都是一个独立、可复用的 Skill。

------

# 安装 Skill

你可以通过 `skills` CLI 直接从 GitHub 安装 Skill。

示例：

```bash
npx skills add https://github.com/YOUR_NAME/YOUR_REPO --skill reusable-auth-module
```

或者：

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module
```

------

# 安装到指定 Agent

## Codex

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module --agent codex
```

## Claude Code

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module --agent claude-code
```

## 全局安装

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module --global
```

------

# 如何使用 Skill

安装完成后，只需要在 Prompt 中引用对应 Skill 即可。

示例：

```text
Use the reusable-auth-module skill to implement a reusable login/register module for this project.
```

Coding Agent 会：

1. 读取 Skill 指令
2. 检测当前项目技术栈
3. 使用 Skill 提供的 templates 与 references
4. 自动生成或修改对应代码

------

# 设计理念

本仓库中的所有 Skill 都遵循以下原则：

- 默认可复用（Reusable by default）
- 与业务逻辑解耦（Decoupled from business logic）
- 配置驱动（Config-driven）
- 友好的本地开发体验（Local-development friendly）
- 注重安全性（Security-aware）
- 面向 Agent 设计（Agent-oriented）
- 自适应技术栈（Stack-adaptive）

------

# 贡献指南

欢迎贡献新的可复用开发模块。

推荐每个 Skill 遵循以下目录结构：

```text
your-skill/
├── SKILL.md
├── templates/
├── references/
├── scripts/
└── examples/
```

------

# License

MIT License